import {Component, Input} from '@angular/core';
import {IOrder} from "../../../models/order";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {items} from "../../../data/items";
import {pharmacies} from "../../../data/pharmacies";

@Component({
  selector: 'app-account-order-card',
  templateUrl: './account-order-card.component.html',
  styleUrls: ['./account-order-card.component.css']
})
export class AccountOrderCardComponent {
  @Input() order: IOrder;
  title = 'account order card';

  private userId: number = -1;

  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
  }
}
