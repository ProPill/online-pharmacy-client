import {Component, EventEmitter, Input, Output} from "@angular/core";
import {IItem} from "../../../models/item";
import {IItemQuantity} from "../../../models/item_quantity";
import { Router } from '@angular/router';
import {UserService} from "../../../services/user.service";
import {BackendService} from "../../../services/backend.service";
import {IOrder} from "../../../models/order";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item: IItem;
  title = 'ItemComponent';
  quantityIsZero = true;
  quantity = 0;
  @Output() itemQuantity: IItemQuantity;
  private userId: number | null;
  private itemId: number = -1;
  itemsSafe: Map<number, number>;
  order: IOrder

  constructor(private userService: UserService, private router: Router, private backendService: BackendService) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.userService.itemsObservable.subscribe((itemsSafe) => (this.itemsSafe = itemsSafe));
    this.userService.itemIdObservable.subscribe((itemId) => (this.itemId = itemId));
    this.backendService.currentOrder.subscribe((val) => this.order = val)
  }

  ngOnInit() {
  }

  increaseQuantity() {
    this.quantity++;
    this.quantityIsZero = false;
    this.userService.changeItem(this.item.id, this.quantity);
    if (this.userId != null) {
      this.backendService.addToCartItem(this.userId, this.item.id, 1);
    }
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
      if (this.userId != null) {
        this.backendService.addToCartItem(this.userId, this.item.id, -1);
      }
    }
    if (this.quantity == 0)
    {
      this.quantityIsZero = true;
      if (this.userId != null) {
        this.backendService.deleteItemFromOrder(this.itemId)
      }
    }
    this.userService.changeItem(this.item.id, this.quantity);
    if (this.userId != null)
    {
      this.backendService.getCartPageData(<number>this.userId)
    }
  }

  addToCart() {
    this.quantityIsZero = false;
    this.itemQuantity = {itemId: this.item.id, itemQuantity: this.quantity, hasRecipe: this.item.recipeOnly};
    if (this.quantity > 0 && this.userId != null) {
      this.backendService.addToCartItem(this.userId, this.item.id, this.quantity);
    }
  }

  onProductCardPage() {
    this.itemId = this.item.id;
    this.userService.changeItemId(this.itemId);
    this.router.navigate(["/product-page"]);
  }

  getQuantity() {
    if (this.userId != null)
    {
      this.backendService.getCartPageData(this.userId)
      this.order.items.forEach((val) => {
        if (val.itemId == this.item.id) {
          this.quantity = val.itemQuantity
        }
      })
    }
    return this.quantity
  }
}
