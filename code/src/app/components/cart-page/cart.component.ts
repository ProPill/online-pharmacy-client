import { Component, Input } from '@angular/core';
import { IOrder } from "../../models/order";
import { Router } from '@angular/router';
import {orders} from "../../data/orders";
import {UserService} from "../../services/user.service";
import {BackendService} from "../../services/backend.service";
import {IItem} from "../../models/item";
import {isEmpty} from "rxjs";
import {IItemQuantity} from "../../models/item_quantity";
import {IUser} from "../../models/user";

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
  user: IUser | null

  private userId: number | null;

  constructor(private backendService: BackendService,
              private userService: UserService,
              private router: Router) {
    this.backendService.currentOrder.subscribe((value) => this.order = value);
    this.backendService.currentCart.subscribe((list) => (this.items = list))
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentFilterStatus.subscribe((value) => this.onFilter = value);
    this.backendService.currentUser.subscribe((value) => this.user = value);
    this.hasRecipeOnlyItems()
  }

  ngOnInit() {
    this.hasRecipeOnlyItems()
    this.getRole()
  }

  getRole()
  {
    if (this.user != null)
    {
      return this.user.roleId
    }
    else return 0
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
                if (!this.shouldHaveCheckbox()) {
                  button.classList.remove('inactive')
                }
                else if (this.shouldHaveCheckbox() && !this.statusChecked) {
                  button.classList.add('inactive')
                  this.statusChecked = true
                }
              })
        })
    return this.hasRecipeItems
  }

  shouldHaveCheckbox() {
    return (this.hasRecipeOnlyItems() && this.getRole() != -2)
  }
}
