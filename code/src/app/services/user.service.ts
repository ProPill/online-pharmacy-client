import {Injectable, numberAttribute} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ItemComponent} from "../components/main-page/item/item.component";
import {IItem} from "../models/item";
import {LoginService} from "./login.service";
import {PharmacistService} from "./pharmacist.service";
import {RegistrationService} from "./registration.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userIdSource = new BehaviorSubject<number | null>(null);
  private itemsSource = new BehaviorSubject<Map<number, number>>(new Map<number, number>());
  private itemIdSource = new BehaviorSubject<number>(-1);
  items: Map<number, number> = new Map<number, number>();
  currentUserId = this.userIdSource.asObservable();
  itemsObservable = this.itemsSource.asObservable();
  itemIdObservable = this.itemIdSource.asObservable();

  constructor() {}

  changeItemId(itemId: number) {
    this.itemIdSource.next(itemId);
  }

  changeUserId(userId: number) {
    this.userIdSource.next(userId);
  }

  changeItem(id: number, quantity: number) {
    this.items.set(id, quantity);
    this.itemsSource.next(this.items);
  }
    clearUserId() {
      this.userIdSource.next(null)
    }
}
