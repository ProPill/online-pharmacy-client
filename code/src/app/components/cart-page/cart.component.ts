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
  hasRecipeItems: boolean = true
  checkboxRequired: boolean = true
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
    // this.hasRecipeOnlyItems()
    // this.shouldHaveCheckbox()
  }

  ngOnInit() {
    this.getRole()
    this.hasRecipeOnlyItems()
    // this.shouldHaveCheckbox()
    this.checkColor()
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
    console.log(this.hasRecipeItems)
    document.querySelectorAll(".card-order")
      .forEach(orderCard => {
        orderCard.querySelectorAll(".button-color")
          .forEach(button => {
            if (!this.hasRecipeItems) {
              button.classList.remove('inactive')
            }
            else if (this.hasRecipeItems && !this.statusChecked) {
              console.log("adding inactive")
              button.classList.add('inactive')
              this.statusChecked = true
            }
          })
      })
    return this.hasRecipeItems
  }

  shouldHaveCheckbox() {
    this.checkboxRequired = this.hasRecipeItems && this.getRole() != -2
    return this.checkboxRequired
  }

  checkColor() {

  }
}
