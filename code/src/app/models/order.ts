import {IItemQuantity} from "./item_quantity";

export interface IOrder{
  id: number
  date: string
  address: string
  deliverDate: string
  price: string
  orderNumber: string
  items: IItemQuantity[] //массива id:количество товаров в заказе

}
