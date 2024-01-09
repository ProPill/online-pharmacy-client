import {Component, Input} from '@angular/core';
import {IOrder} from "../../../models/order";
import {IItemQuantuty} from "../../../models/item_quantity";
import {items} from "../../../data/items";

@Component({
  selector: 'app-cart-order-card',
  templateUrl: './cart-order-card.component.html',
  styleUrls: ['./cart-order-card.component.css']
})
export class CartOrderCardComponent {
  title: 'cart-order-card'
  @Input() order: IOrder
  data: IItemQuantuty[]
  price: number = 0

  calculatePrice() {
    this.data = this.order.items;
    this.price = 0;
    for (let i = 0; i < this.data.length; i++)
    {
      this.price += items[this.data[i].itemId].cost * this.data[i].itemQuantity
    }
    return this.price.toString();
  }
  createOrder() {
    // предполагается, что данные мы будем генерировать,
    // и их них будет создаваться новый IOrder, который идёт дальше
    // сейчас они берутся из шаблона
    return {id: '', date: '', address: '', deliverDate: '',
      price: this.price, orderNumber: '', items: this.order.items}
  }
}
