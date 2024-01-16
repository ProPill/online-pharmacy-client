import {Component, Input} from '@angular/core';
import {IItem} from "../../../models/item";
import {IItemQuantity} from "../../../models/item_quantity";
import {items} from "../../../data/items";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {BackendService} from "../../../services/backend.service";

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css']
})

export class CartItemCardComponent {
  title: 'cart-item-card';
  @Input() itemQuantuty: IItemQuantity;
  item: IItem;
  quantity: number = 1;
  cost: number = 0;

  private userId: number | null;

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    // this.item = this.backendService.getItemData(this.item.id); ждет своего часа
    this.quantity = this.itemQuantuty.itemQuantity;
  }

  getTitle() {
    this.quantity = this.itemQuantuty.itemQuantity;
    this.item = items[this.itemQuantuty.itemId];
    return this.item.title;
  }

  increaseQuantity() {
    this.quantity++;
    this.itemQuantuty.itemQuantity = this.quantity;
  }

  decreaseQuantity() {
    if (this.quantity != 1) {
      this.quantity--;
      this.itemQuantuty.itemQuantity = this.quantity;
    }
  }

  calculateCost() {
    return this.cost = this.item.cost * this.quantity;
  }
}
