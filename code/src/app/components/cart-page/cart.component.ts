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
  isEmpty: boolean = true;

  private userId: number | null;

  constructor(private backendService: BackendService,
              private userService: UserService,
              private router: Router) {
    this.backendService.currentOrder.subscribe((value) => this.order = value)
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentFilterStatus.subscribe((value) => this.onFilter = value)
    this.backendService.currentCart.subscribe((value) => this.items = value)
  }

  ngOnInit() {
    this.isEmpty = this.order.items.length == 0;
  }

  onMain() {
    this.backendService.showFilter()
    this.router.navigate(['/main']);
  }
}
