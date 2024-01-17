import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, take} from 'rxjs/operators';
import {IItem} from "../models/item";
import {IUser} from "../models/user";
import {IOrder} from "../models/order";
import {IItemQuantity} from "../models/item_quantity";
import {BehaviorSubject, Observable} from "rxjs";
import {items} from "../data/items";
import {IPharmacy} from "../models/pharmacy";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:8080/api';
  private itemsSource = new BehaviorSubject<IItem[]>([]);
  private defaultItemsSource = new BehaviorSubject<IItem[]>([]);
  currentItems = this.itemsSource.asObservable()
  defaultItems = this.defaultItemsSource

  private userSource = new BehaviorSubject<IUser | null>(null);
  currentUser = this.userSource.asObservable()
  currentUserId: number | null

  private searchStatusSource = new BehaviorSubject<boolean>(false);
  currentSearchStatus = this.searchStatusSource.asObservable()

  private filterSource = new BehaviorSubject<boolean>(true);
  currentFilterStatus = this.filterSource.asObservable()

  private ordersListSource = new BehaviorSubject<IOrder[]>([]);
  currentOrdersList = this.ordersListSource.asObservable()

  items: any;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.currentUserId.subscribe((userId) => (this.currentUserId = userId));

  }

  updateOrders(list: IOrder[]) {
    this.ordersListSource.next(list)
  }

  showFilter() {
    this.filterSource.next(true)
    const buttons = document.querySelectorAll('.button-color');
    buttons.forEach(button => {
      button.classList.remove("active")
    });
  }

  hideFilter() {
    this.filterSource.next(false)
  }

  setSearchStatus(status: boolean) {
    this.searchStatusSource.next(status)
  }

  setDefaultList(list: IItem[]) {
    this.defaultItemsSource.next(list)
  }

  changeItems(list: IItem[]) {
    this.itemsSource.next(list);
  }

  changeUser(user: IUser | null) {
    this.userSource.next(user);
  }

  logout() {
    if (this.currentUserId != null) {
      this.http.get(this.baseUrl + '/logout', {params: {["user_id"]: this.currentUserId}})
    }
    this.changeUser(null)
    this.userService.clearUserId()
    this.getNormalUserItemsList()
    return true;
  }

  getSpecialItemsList() {
    return this.http.get<IItem[]>(this.baseUrl + '/item/type', {params: {["type_id"]: -3}})
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => this.changeItems(value))
  }

  getSpecialCategoryItemsList(specialityId: number) {
    return this.http.get<IItem[]>(this.baseUrl + '/item/type/category', {params: {["speciality_id"]: specialityId}})
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => this.changeItems(value))
  }

  getNoRecipeItemsList() {
    return this.http.get<IItem[]>(this.baseUrl + '/item/type?name=', {params: {["type_id"]: -1}})
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => this.changeItems(value))
  }

  getRecipeItemsList() {
    return this.http.get<IItem[]>(this.baseUrl + '/item/type', {params: {["type_id"]: -2}})
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => this.changeItems(value))
  }

  getItemsByType(typeId: number) {
    switch (typeId) {
      case -1:
        return this.getNoRecipeItemsList();
      case -2:
        return this.getRecipeItemsList();
      case -3:
        return this.getSpecialItemsList();
      default:
        return new Observable<IItem[]>()
          .subscribe((value) => this.changeItems(value));
    }
  }

  getAllItemsList(isDefault: boolean = false) {
    return this.http.get<IItem[]>(this.baseUrl + '/item/all')
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => {
        this.changeItems(value);
        if (isDefault) {
          this.setDefaultList(value)
        }
      })
  }

  transformList(data: any) {
    const transformedItems: IItem[] = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      transformedItems.push({
        id: item.id,
        title: item.name,
        manufacturer: item.manufacturer,
        recipeOnly: item.type.id == -2,
        special: item.speciality_id != null,
        cost: item.price,
        image: item.picture_url
      } as IItem);
    }
    return transformedItems;
  }

  getNormalUserItemsList(isDefault: boolean = false) {
    return this.http.get<IItem[]>(this.baseUrl + '/item/normal/all')
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => {
        this.changeItems(value);
        if (isDefault) {
          this.setDefaultList(value)
        }
      })
  }

  getDoctorItemsList(isDefault: boolean = false) {
    return this.http.get<IItem[]>(this.baseUrl + '/item/doc/all')
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => {
        this.changeItems(value);
        if (isDefault) {
          this.setDefaultList(value)
        }
      })
  }

  searchItem(query: string) {
    this.http.get<IItem[]>(this.baseUrl + '/item/search_result', {params: {["search"]: query}})
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => {
        this.changeItems(value);
        this.searchStatusSource.next(value.length != 0);
        console.log("val", value)
      })
    return this.searchStatusSource.getValue()
  }

  getItemQuantityData(userId: number, itemId: number) {
    return this.transformOrder(this.http.get(this.baseUrl + 'cart/quantity_info',
      {params: {["item_id"]: itemId, ["user_id"]: userId}}));
  }

  getCartPageData(userId: number) {
    return this.transformOrder(this.http.get(this.baseUrl + '/cart/',
      {params: {["user_id"]: userId}}));
  }

  transformOrder(data: any) {
    return data.pipe(
      map((orderList: any) => {
        const items: IItemQuantity[] = orderList.items.map((item: any) => {
          return {
            itemId: item.item.itemId,
            itemQuantity: item.quantity,
            hasRecipe: item.item.type.id == -2
          } as IItemQuantity
        });
        return {
          id: orderList.id,
          date: "",
          address: "",
          deliverDate: "",
          price: 0,
          orderNumber: "",
          items: items
        }
      })
    ) as IOrder
  }

  getUserInfo(userId: number) {
    return this.http.get<IUser>(this.baseUrl + '/info/' + userId, {params: {["user_id"]: userId}})
      .pipe(map((value) => (this.getUser(value))))
      .subscribe((value) => this.changeUser(value))
  }

  getUser(data: any) {
    return {
      id: data.id,
      name: data.full_name,
      phone: data.phone,
      roleId: data.role.id,
      specialityId: data.speciality_id
        } as IUser
  }

  getUserRole(userId: number) {
    this.getUserInfo(userId);
    return this.currentUser
  }

  getAllPharmaciesById(itemId: number): IPharmacy[] {
    let pharmacies: IPharmacy[] = []
    this.http.get<any[]>(this.baseUrl + '/pharmacy/item?item_id=' + itemId.toString()).subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          let pharmacy = data[i];
          pharmacies.push({
            id: pharmacy.id,
            details: {
              name: pharmacy.name,
              address: pharmacy.address,
              workingHours: pharmacy.work_time,
              phone: pharmacy.phone
            }
          } as IPharmacy);
        }
      });

    return pharmacies;
  }

  addToCartItem(userId: number, itemId: number, quantity: number) {
    let url = this.baseUrl + '/cart/add?user_id=' + userId.toString() +
      '&item_id=' + itemId.toString() + '&count=' + quantity.toString();
    this.http.post<any>(url, {}).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUserOrders(userId: number) {
    return this.http.get<IOrder[]>(this.baseUrl + '/orders', {params: {["user_id"]: userId}})
        .pipe(map((value) => (this.transformOrdersList(value))))
        .subscribe((value) => this.updateOrders(value))
  }

  transformOrdersList(data: any) {
    const transformedOrders: IOrder[] = [];

    for (let i = 0; i < data.length; i++) {
      let order = data[i]
      transformedOrders.push(this.transformOrder(order))
    }
    return transformedOrders
  }
}

