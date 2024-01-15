import { Component, Input } from '@angular/core';
import { IOrder } from "../../models/order";
import { Router } from '@angular/router';
import {orders} from "../../data/orders";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() order: IOrder = orders[0];
  isEmpty: boolean;

  private userId: number = -1;

  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    window.addEventListener("load", () => {
      this.isEmpty = this.checkCart() })
  }

  checkCart() {
    return this.order.items.length == 0;
  }

  onMain() {
    this.router.navigate(['/main']);
  }
}
