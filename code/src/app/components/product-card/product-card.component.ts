import {Component, Input} from '@angular/core';
import {IItem} from "../../models/item";
import {items} from "../../data/items";
import {pharmacies} from "../../data/pharmacies";
import {IPharmacy} from "../../models/pharmacy";
import { Router } from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() item: IItem;
  @Input() myPharmacies: IPharmacy[];
  Chosen: boolean = true;
  showPharmaciesFlag: boolean = false;
  quantity: number = 1;
  cost: number = 0;

  private userId: number = -1;

  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.item = items[0];
    this.myPharmacies = pharmacies;
  }

  showPharmacies() {
    this.showPharmaciesFlag = !this.showPharmaciesFlag;
  }

  addItemToCart() {
    this.router.navigate(['/main']);
    return this.item;
  }

  increaseQuantity() {
    this.quantity++;
    this.Chosen = this.quantity != 0;
  }

  decreaseQuantity() {
    if (this.quantity >= 1) {
      this.quantity--;
    }
    this.Chosen = this.quantity != 0;
  }

  calculateCost() {
    return this.cost = this.item.cost * this.quantity;
  }
}
