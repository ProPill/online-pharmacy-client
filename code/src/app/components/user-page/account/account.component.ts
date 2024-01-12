import { Component } from '@angular/core';
import {IOrder} from "../../../models/order";
import {orders as ordersdata} from "../../../data/orders";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  title = 'Account';
  orders: IOrder[] = ordersdata;

  private userId: number = -1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
  }
}
