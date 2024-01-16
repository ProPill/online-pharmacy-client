import { Component } from '@angular/core';
import {IOrder} from "../../../models/order";
import {orders as ordersdata} from "../../../data/orders";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {BackendService} from "../../../services/backend.service";
import {IUser} from "../../../models/user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  title = 'Account';
  orders: IOrder[] = ordersdata;
  user: IUser

  private userId: number | null;

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
    // эндпоинт по выдаче всех заказов юзера
  }

  ngOnInit(): void {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentUser.subscribe((value) => {
      if (value != null) {
        this.user = value
      }})
  }
}
