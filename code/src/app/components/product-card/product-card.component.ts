import {Component, Input} from '@angular/core';
import {IItem} from "../../models/item";
import {IPharmacy} from "../../models/pharmacy";
import { Router } from '@angular/router';
import {UserService} from "../../services/user.service";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() item: IItem;
  title: string = 'ProPill'
  pharmacies: IPharmacy[];
  Chosen: boolean = true;
  showPharmaciesFlag: boolean = false;
  quantity: number = 1;
  cost: number = 0;
  itemsSafe: Map<number, number>;
  userId: number | null;
  itemId: number;
  items: IItem[] = [];

  constructor(private userService: UserService, public router: Router, private backendService: BackendService) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.userService.itemsObservable.subscribe((itemsSafe) => (this.itemsSafe = itemsSafe));
    this.backendService.currentItems.subscribe((list) => (this.items = list));
    this.userService.itemIdObservable.subscribe((itemId) => (this.itemId = itemId));

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == this.itemId) {
        this.item = this.items[i];
        break;
      }
    }
    this.quantity = <number>this.itemsSafe.get(this.itemId);
    if (this.quantity == null) this.quantity = 1;
    this.pharmacies = this.backendService.getAllPharmaciesById(this.itemId);
  }

  showPharmacies() {
    this.showPharmaciesFlag = !this.showPharmaciesFlag;
  }

  addItemToCart() {
    if (this.quantity > 0 && this.userId != null) {
      this.backendService.addToCartItem(this.userId, this.itemId, this.quantity);
      this.router.navigate(['/main']);
    }
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

  ngOnInit() {
  }
}
