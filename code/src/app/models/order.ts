import {IItemQuantity} from "./item_quantity";

export interface IOrder {
  id: number
  date: string
  address: string
  deliverDate: string
  price: number
  orderNumber: string
  items: IItemQuantity[] //массива id:количество товаров в заказе
}
