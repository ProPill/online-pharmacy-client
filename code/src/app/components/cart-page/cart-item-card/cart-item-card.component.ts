import {Component, Input} from '@angular/core';
import {IItem} from "../../../models/item";
import {IItemQuantuty} from "../../../models/item_quantity";
import {items} from "../../../data/items";

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css']
})

export class CartItemCardComponent {
  title: 'cart-item-card'
  @Input() itemQuantuty: IItemQuantuty
  item: IItem
  quantity: number = 1
  cost: number = 0

  // constructor() {
  //   // представим, что в items все по-порядку
  //   this.item = items[this.itemQuantuty.itemId]
  // }
  getTitle() {
    this.quantity = this.itemQuantuty.itemQuantity
    this.item = items[this.itemQuantuty.itemId];
    return this.item.title
  }

  increaseQuantity() {
    this.quantity++;
    this.itemQuantuty.itemQuantity = this.quantity
  }

  decreaseQuantity() {
    if (this.quantity != 1) {
      this.quantity--;
      this.itemQuantuty.itemQuantity = this.quantity
    }
  }

  calculateCost() {
    return this.cost = this.item.cost * this.quantity;
  }
}
