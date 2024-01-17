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
  hasRecipeItems: boolean
  statusChecked: boolean = false

  private userId: number | null;

  constructor(private backendService: BackendService,
              private userService: UserService,
              private router: Router) {
    this.backendService.currentOrder.subscribe((value) => this.order = value);
    this.backendService.currentCart.subscribe((list) => (this.items = list))
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentFilterStatus.subscribe((value) => this.onFilter = value);
    this.hasRecipeOnlyItems()
  }

  ngOnInit() {
    this.hasRecipeOnlyItems()
  }

  onMain() {
    this.backendService.showFilter()
    this.router.navigate(['/main']);
  }

  isEmpty() {
    return this.order.items.length == 0;
  }

  hasRecipeOnlyItems() {
    this.hasRecipeItems = false
    this.order.items.forEach(item => {
      if (item.hasRecipe) {
        this.hasRecipeItems = true;
        return
      }
    })
    document.querySelectorAll(".card-order")
        .forEach(orderCard => {
          orderCard.querySelectorAll(".button-color")
              .forEach(button => {
                if (!this.hasRecipeItems) {
                  button.classList.remove('inactive')
                }
                else if (this.hasRecipeItems && !this.statusChecked) {
                  button.classList.add('inactive')
                  this.statusChecked = true
                }
              })
        })
    return this.hasRecipeItems
  }
}
