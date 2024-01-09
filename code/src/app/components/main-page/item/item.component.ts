import {Component, Input, Output} from "@angular/core";
import {IItem} from "../../../models/item";
import {IItemQuantuty} from "../../../models/item_quantity";
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {
  @Input() item: IItem
  title = 'ItemComponent'
  quantityIsZero = true
  quantity = 0
  @Output() itemQuantity: IItemQuantuty

  constructor(private router: Router) {
  }

  increaseQuantity() {
    this.quantity++;
    this.quantityIsZero = false
  }

  decreaseQuantity() {
    if (this.quantity != 0) {
      this.quantity--;
    }
    if (this.quantity == 0)
    {
      this.quantityIsZero = true;
    }
  }

  addToCart()
  {
    this.quantityIsZero = false;
    this.itemQuantity = {itemId: this.item.id, itemQuantity: this.quantity}
  }

  onProductCardPage() {
    this.router.navigate(["./product-page"])
  }
}
