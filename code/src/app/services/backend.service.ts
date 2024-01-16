import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {IItem} from "../models/item";
import {IUser} from "../models/user";
import {IOrder} from "../models/order";
import {IItemQuantity} from "../models/item_quantity";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:8080/api';
  items: any;

  constructor(private http: HttpClient) {
    this.items = [];
  }

  logout(userId: number) {
    return this.http.get(this.baseUrl + '/logout', {params: {["user_id"]: userId}});
  }

  getSpecialItemsList() {
    return this.transformList(this.http.get(this.baseUrl + '/item/type'));
  }

  getSpecialCatrgoryItemsList() {
    return this.transformList(this.http.get(this.baseUrl + '/item/type/category'));
  }

  getNoRecipeItemsList() {
    return this.transformList(this.http.get(this.baseUrl + '/item/type'));
  }

  // TODO
  getRecipeItemsList() {
    this.http.get<IItem[]>(this.baseUrl + '/item/type?name=-1').subscribe(
      data => {
        console.log(data);
        this.items = this.transformList(data);
      },
      error => {
        console.error('Error fetching items:', error);
      }
    );
    return this.items;
  }

  getItemsByType(typeId: number) {
    switch (typeId) {
      case -1: return this.getNoRecipeItemsList();
      case -2: return this.getRecipeItemsList();
      case -3: return this.getSpecialItemsList();
      default: return {} as IItem[];
    }
  }

  getAllItemsList() {
    return this.transformList(this.http.get<IItem[]>(this.baseUrl + '/item/all'));
  }

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

  getNormalUserItemsList() {
    this.http.get<IItem[]>(this.baseUrl + '/item/normal/all').subscribe(
      data => {
        console.log(data);
        this.items = this.transformList(data);
      },
      error => {
        console.error('Error fetching items:', error);
      }
    );
    return this.items;
  }

  getDoctorItemsList() {
    return this.transformList(this.http.get(this.baseUrl + '/item/doc/all'));
  }

  searchItem(query: string) {
    return this.transformList(this.http.get(this.baseUrl + '/item/search_result', {params: {["search"]: query}}));
  }

  getItemQuantityData(userId: number, itemId: number) {
    return this.transformOrder(this.http.get(this.baseUrl + 'cart/quantity_info',
      {params: {["item_id"]: itemId, ["user_id"]: userId}}));
  }
  getCartPageData(userId: number) {
    return this.transformOrder(this.http.get(this.baseUrl + '/cart/{user_id}',
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
    return this.getUser(userId, this.http.get(this.baseUrl + '/info/{userId}', {params: {["user_id"]: userId}}));
  }

  getUser(userId: number, data: any) {
    return data.pipe(
      map((user: any) => {
        return {
          id: userId,
          name: user.name,
          phone: user.phone,
          roleId: user.role.id
        };
      })
    ) as IUser
  }
}
