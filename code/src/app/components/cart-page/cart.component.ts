import { Component, Input } from '@angular/core';
import { IOrder } from "../../models/order";
import { Router } from '@angular/router';
import {orders} from "../../data/orders";
import {UserService} from "../../services/user.service";
import {BackendService} from "../../services/backend.service";
import {IItem} from "../../models/item";
import {isEmpty} from "rxjs";
import {IItemQuantity} from "../../models/item_quantity";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  order: IOrder;
  items: IItem[]
  onFilter: boolean;
  // isEmpty: boolean = true;

  private userId: number | null;

  constructor(private backendService: BackendService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
      this.backendService.currentOrder.subscribe((value) => this.order = value);
      this.backendService.currentCart.subscribe((list) => (this.items = list))
      this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
      this.backendService.currentFilterStatus.subscribe((value) => this.onFilter = value);
  }

  onMain() {
    this.backendService.showFilter()
    this.router.navigate(['/main']);
  }

  isEmpty() {
    return this.order.items.length == 0;
  }
}
