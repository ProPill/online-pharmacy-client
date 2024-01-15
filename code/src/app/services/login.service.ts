import { Injectable } from '@angular/core';
import {IItem} from "../models/item";
import { HttpClient } from '@angular/common/http';
import {IUser} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {
  }

  // transformList(data: any) {
  //   transformedItems.push({
  //     id: item.itemId,
  //     title: item.name,
  //     manufacturer: item.manufacturer,
  //     recipeOnly: item.type.id == -2,
  //     special: item.speciality != null,
  //     cost: item.price,
  //     image: item.picture_url
  //   } as IItem);
  //   return transformedItems;
  // }

  login(username: string, password: string): Map <number, number> {
    let map = new Map <number, number> ();
    // @ts-ignore
    this.http.post<IUser>(this.baseUrl + '/accounts/login?phone=' + username + '&password=' + password).subscribe(
      data => {
        console.log(data);
        // this.user = this.transformUser(data);
      },
      error => {
        map.set(1,400);
        console.error('Error fetching items:', error);
      }
    );
    map.set(1,200);
    return map;
  }
}
