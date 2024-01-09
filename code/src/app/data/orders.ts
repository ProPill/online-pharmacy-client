import {IOrder} from "../models/order";

export const orders: IOrder[] = [
  {
    id: 0,
    date: '13.10.23',
    address: 'Аптека Вита, ул. Ленинская 310',
    deliverDate: '15.10.23',
    price: '1000',
    orderNumber: '00000001',
    items: [{itemId: 0, itemQuantity: 1, hasRecipe: true}, {itemId: 1, itemQuantity: 2, hasRecipe: true}]
  },
  {
    id: 1,
    date: '10.09.23',
    address: 'Аптека Вита, ул. Комсомольская 30',
    deliverDate: '15.10.23',
    price: '1000.50',
    orderNumber: '00000002',
    items: [{itemId: 1, itemQuantity: 2, hasRecipe: false}]
  }
]
