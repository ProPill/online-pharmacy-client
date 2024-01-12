import {Component, Input} from '@angular/core';
import {IOrder} from "../../../models/order";
import {IItemQuantity} from "../../../models/item_quantity";
import {items} from "../../../data/items";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-cart-order-card',
  templateUrl: './cart-order-card.component.html',
  styleUrls: ['./cart-order-card.component.css']
})
export class CartOrderCardComponent {
  title: 'cart-order-card';
  @Input() order: IOrder;
  data: IItemQuantity[];
  price: number = 0;
  checkboxChecked: boolean = true;
  hasRecipeItems: boolean = false;
  private userId: number = -1;

  constructor(private userService: UserService, private router: Router) {
    window.addEventListener('load', () => {
      this.hasRecipeOnlyItems();
    })
  }

  ngOnInit() {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
  }

  calculatePrice() {
    this.data = this.order.items;
    this.price = 0;
    for (let i = 0; i < this.data.length; i++) {
      this.price += items[this.data[i].itemId].cost * this.data[i].itemQuantity;
    }
    return this.price.toString();
  }

  createOrder() {
    if (this.checkboxChecked) {
      this.router.navigate(['/order-page']);
      return {
        id: '', date: '', address: '', deliverDate: '',
        price: this.price, orderNumber: '', items: this.order.items
      }
    } else return null;
  }

  hasRecipeOnlyItems() {
    this.order.items.forEach(item => {
      if (item.hasRecipe) {
        this.hasRecipeItems = true;
        this.checkboxChecked = false;
        document.querySelectorAll(".card-order")
          .forEach(orderCard => {
            orderCard.querySelectorAll(".button-color")
              .forEach(button => {
                button.classList.add('inactive')
              })
          })
        return
      }
    })
  }

  changeOrderButtonColor() {
    this.checkboxChecked = !this.checkboxChecked;
    if (this.checkboxChecked) {
      document.querySelectorAll(".card-order")
        .forEach(orderCard => {
          orderCard.querySelectorAll(".button-color")
            .forEach(button => {
              button.classList.remove('inactive')
            })
        })
    } else {
      document.querySelectorAll(".card-order")
        .forEach(orderCard => {
          orderCard.querySelectorAll(".button-color")
            .forEach(button => {
              button.classList.add('inactive')
            })
        })
    }
  }
}
