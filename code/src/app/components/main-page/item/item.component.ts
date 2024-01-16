import {Component, EventEmitter, Input, Output} from "@angular/core";
import {IItem} from "../../../models/item";
import {IItemQuantity} from "../../../models/item_quantity";
import { Router } from '@angular/router';
import {UserService} from "../../../services/user.service";
import {BackendService} from "../../../services/backend.service";

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

  constructor(private userService: UserService, private router: Router, private backendService: BackendService) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.userService.itemsObservable.subscribe((itemsSafe) => (this.itemsSafe = itemsSafe));
    this.userService.itemIdObservable.subscribe((itemId) => (this.itemId = itemId));
  }

  increaseQuantity() {
    this.quantity++;
    this.quantityIsZero = false;
    this.userService.changeItem(this.item.id, this.quantity);
  }

  decreaseQuantity() {
    if (this.quantity != 0) {
      this.quantity--;
    }
    if (this.quantity == 0)
    {
      this.quantityIsZero = true;
    }
    this.userService.changeItem(this.item.id, this.quantity);
  }

  addToCart() {
    this.quantityIsZero = false;
    this.itemQuantity = {itemId: this.item.id, itemQuantity: this.quantity, hasRecipe: this.item.recipeOnly};
    if (this.quantity > 0 && this.userId != null) {
      this.backendService.addToCartItem(this.userId, this.itemId, this.quantity);
    }
  }

  onProductCardPage() {
    this.itemId = this.item.id;
    this.userService.changeItemId(this.itemId);
    this.router.navigate(["/product-page"]);
  }
}
