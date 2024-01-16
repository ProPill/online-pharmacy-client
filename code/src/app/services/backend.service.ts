import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, take} from 'rxjs/operators';
import {IItem} from "../models/item";
import {IUser} from "../models/user";
import {IOrder} from "../models/order";
import {IItemQuantity} from "../models/item_quantity";
import {BehaviorSubject, Observable} from "rxjs";
import {items} from "../data/items";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:8080/api';
  private itemsSource = new BehaviorSubject<IItem[]>([]);
  private defaultItemsSource = new BehaviorSubject<IItem[]>([]);
  currentItems = this.itemsSource.asObservable()
  defaultItems = this.defaultItemsSource

  private userSource = new BehaviorSubject<IUser>({id: 0, name: "", phone: 0, roleId: 0});
  currentUser = this.userSource.asObservable()

  private searchStatusSource = new BehaviorSubject<boolean>(false);
  currentSearchStatus = this.searchStatusSource.asObservable()

  items: any;

  constructor(private http: HttpClient) {
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

  changeUser(user: IUser) {
    this.userSource.next(user);
  }

  logout(userId: number) {
    return this.http.get(this.baseUrl + '/logout', {params: {["user_id"]: userId}});
  }

  getSpecialItemsList() {
    return this.http.get<IItem[]>(this.baseUrl + '/item/type', {params: {["type_id"]: -3}})
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => this.changeItems(value))
  }

  getSpecialCategoryItemsList() {
    return this.http.get<IItem[]>(this.baseUrl + '/item/type/category')
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
      case -1: return this.getNoRecipeItemsList();
      case -2: return this.getRecipeItemsList();
      case -3: return this.getSpecialItemsList();
      default: return new Observable<IItem[]>()
        .subscribe((value) => this.changeItems(value));
    }
  }

  getAllItemsList(isDefault: boolean = false) {
    return this.http.get<IItem[]>(this.baseUrl + '/item/all')
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => {
        this.changeItems(value);
        if (isDefault) { this.setDefaultList(value) }
      })  }

  transformList(data: any) {
    const transformedItems: IItem[] = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      transformedItems.push({
        id: item.itemId,
        title: item.name,
        manufacturer: item.manufacturer,
        recipeOnly: item.type.id == -2,
        special: item.speciality != null,
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
        if (isDefault) { this.setDefaultList(value) }
      })
  }

  getDoctorItemsList(isDefault: boolean = false) {
    return this.http.get<IItem[]>(this.baseUrl + '/item/doc/all')
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => {
        this.changeItems(value);
        if (isDefault) { this.setDefaultList(value) }
      })  }

  searchItem(query: string) {
    this.http.get<IItem[]>(this.baseUrl + '/item/search_result', {params: {["search"]: query}})
      .pipe(map((value) => (this.transformList(value))))
      .subscribe((value) => {
        this.changeItems(value);
        this.searchStatusSource.next(value.length != 0);
        console.log("val", value)
      })
    console.log(this.searchStatusSource.getValue())
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
        const items: IItemQuantity[] = orderList.items.map( (item: any) => {
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
          roleId: data.role.id
        } as IUser
  }

  getUserRole(userId: number) {
    this.getUserInfo(userId);
    return this.currentUser
  }
}
