import {Component, Input} from '@angular/core';
import {IOrder} from "../../../models/order";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {BackendService} from "../../../services/backend.service";
import {IItem} from "../../../models/item";
import {IUser} from "../../../models/user";

@Component({
  selector: 'app-cart-order-card',
  templateUrl: './cart-order-card.component.html',
  styleUrls: ['./cart-order-card.component.css']
})
export class CartOrderCardComponent {
  @Input() order: IOrder;
  @Input() items: IItem[];
  price: number = 50;
  @Input() hasRecipeItems: boolean;
  checkboxChecked: boolean;
  @Input() checkboxRequired: boolean = true;
  private userId: number | null;
  user: IUser | null

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentUser.subscribe((value) => this.user = value);
  }

  ngOnInit() {
    this.checkboxChecked = !this.hasRecipeItems
  }

  calculatePrice() {
    let data = this.order.items;
    this.price = 50;
    for (let i = 0; i < data.length; i++) {
      this.price += this.items[i].cost * data[i].itemQuantity;
    }
    return this.price.toString();
  }

  createOrder() {
    console.log("checbox in create", this.checkboxChecked)
    if (this.checkboxChecked) {
      this.order.price = parseInt(this.calculatePrice())
      this.backendService.updateOrder(this.order)
      this.router.navigate(['/order-page']);
    }
  }

  checkOrderButtonColor() {
    document.querySelectorAll(".card-order")
        .forEach(orderCard => {
          orderCard.querySelectorAll(".button-color")
              .forEach(button => {
                if (this.hasRecipeItems && !this.checkboxChecked)                {
                  this.checkboxChecked = true
                  button.classList.remove('inactive')
                }
                else if (this.hasRecipeItems && this.checkboxChecked) {                  this.checkboxChecked = false
                  button.classList.add('inactive')
                }
              })
        })
  }

  getRole()
  {
    if (this.user != null)
    {
      return this.user.roleId
    }
    else return 0
  }
}
