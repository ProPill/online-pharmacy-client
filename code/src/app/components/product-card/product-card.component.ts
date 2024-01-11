import {Component, Input} from '@angular/core';
import {IItem} from "../../models/item";
import {items} from "../../data/items";
import {pharmacies} from "../../data/pharmacies";
import {IPharmacy} from "../../models/pharmacy";
import { Router } from '@angular/router';

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
  quantity: number = 1
  cost: number = 0

  constructor(private router: Router) {
    this.item = items[0];
    this.myPharmacies = pharmacies;
  }

  showPharmacies() {
    this.showPharmaciesFlag = !this.showPharmaciesFlag;
  }

  addItemToCart() {
    this.router.navigate(['/main']);
    return this.item
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
