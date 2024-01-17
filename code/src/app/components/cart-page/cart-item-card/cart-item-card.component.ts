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
  @Input() itemQuantity: IItemQuantity;
  @Input() item: IItem;
  quantity: number;
  cost: number;

  private userId: number | null;

  constructor(private backendService: BackendService,
              private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
  }

  ngOnInit() {
    this.quantity = this.itemQuantity.itemQuantity;
  }

  getTitle() {
    return this.item.title;
  }

  increaseQuantity() {
    this.quantity++;
    this.itemQuantity.itemQuantity = this.quantity;
  }

  decreaseQuantity() {
    if (this.quantity != 1) {
      this.quantity--;
      this.itemQuantity.itemQuantity = this.quantity;
    }
  }

  calculateCost() {
    return this.cost = this.item.cost * this.quantity;
  }
}
