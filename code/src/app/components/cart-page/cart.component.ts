import { Component, Input } from '@angular/core';
import { IOrder } from "../../models/order";
import { Router } from '@angular/router';
import {orders} from "../../data/orders";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() order: IOrder = orders[0]
  isEmpty: boolean

  constructor(private router: Router) {
    window.addEventListener("load", () => {
      this.isEmpty = this.checkCart() })
    }

  checkCart()
  {
    return this.order.items.length == 0;
  }

  onMain() {
    this.router.navigate(['/main']);
  }
}
