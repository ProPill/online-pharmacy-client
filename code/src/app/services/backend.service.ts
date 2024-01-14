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

  constructor(private http: HttpClient) { }

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

  getRecipeItemsList() {
    return this.transformList(this.http.get(this.baseUrl + '/item/type'));
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
    return data.pipe(
      map((itemList: any[]) => {
        return itemList.map( item => {
          return {
            id: item.itemId,
            title: item.name,
            manufacturer: item.manufacturer,
            recipeOnly: item.type.id == -2,
            special: item.speciality != null,
            cost: item.price,
            image: item.picture_url
          } as IItem
        });
      })
    ) as IItem[]

  }

  getNormalUserItemsList() {
    return this.transformList(this.http.get(this.baseUrl + '/item/normal/all'));
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
