import {Component, Input} from '@angular/core';
import {IOrder} from "../../../models/order";

@Component({
  selector: 'app-account-order-card',
  templateUrl: './account-order-card.component.html',
  styleUrls: ['./account-order-card.component.css']
})
export class AccountOrderCardComponent {
  @Input() order: IOrder
  title = 'account order card'
}
