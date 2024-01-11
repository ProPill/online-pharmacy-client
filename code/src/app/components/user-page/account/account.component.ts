import { Component } from '@angular/core';
import {IOrder} from "../../../models/order";
import {orders as ordersdata} from "../../../data/orders";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  title = 'Account'
  orders: IOrder[] = ordersdata
}
