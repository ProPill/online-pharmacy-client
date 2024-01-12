import {Component, EventEmitter, Input, Output} from "@angular/core";
import {IItem} from "../../../models/item";
import {IItemQuantity} from "../../../models/item_quantity";
import { Router } from '@angular/router';
import {UserService} from "../../../services/user.service";

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
  private userId: number = -1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(){
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
  }

  increaseQuantity() {
    this.quantity++;
    this.quantityIsZero = false;
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

  addToCart() {
    this.quantityIsZero = false;
    this.itemQuantity = {itemId: this.item.id, itemQuantity: this.quantity, hasRecipe: this.item.recipeOnly}
  }

  onProductCardPage() {
    this.router.navigate(["/product-page"]);
  }
}
