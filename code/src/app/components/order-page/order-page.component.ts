import {Component, Input, numberAttribute} from '@angular/core';
import {Router} from "@angular/router";
import {pharmacies} from "../../data/pharmacies";
import {IPharmacy} from "../../models/pharmacy";
import {orders} from "../../data/orders";
import {IOrder} from "../../models/order";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {
  @Input() myPharmacies: IPharmacy[];
  @Input() orders: IOrder[];

  customerName: string;
  customerPhone: string;
  pharmacy: IPharmacy;
  selectedPharmaName: string;
  totalPrice: number = 0.00;
  totalOrder: number = 0.00;
  deliveryPrice: number = 0.00;

  isValidName: boolean = true;
  isValidPhone: boolean = true;
  isChosenPharmacy: boolean = true;
  isListHidden: boolean = false;

  NAME_ERROR_MESSAGE = "Недопустимы все символы, кроме кириллицы, латиницы.";
  PHONE_ERROR_MESSAGE = "Неверный формат номера тел., пример: +79522795509";
  EMPTY_FIELD_ERROR = "Поле не должно быть пустым";
  NOT_CHOSEN_PHARMACY = "Нужно выбрать аптеку для заказа";

  constructor(private router: Router) {
    this.myPharmacies = pharmacies;
    this.orders = orders;
  }

   toggleList() {
    this.isListHidden = !this.isListHidden;
  }

  confirmOrder(){
    if (!this.customerName) {
      this.isValidName = false;
      this.NAME_ERROR_MESSAGE = this.EMPTY_FIELD_ERROR;
    }
    else if (!/^[a-zA-Zа-яА-Я]+$/i.test(this.customerName)) {
      this.isValidName = false;
    }

    const phoneRegex = /^\+\d{11}$/;
    if (!this.customerPhone) {
      this.isValidPhone = false;
      this.PHONE_ERROR_MESSAGE = this.EMPTY_FIELD_ERROR;
    }
    else if (!phoneRegex.test(this.customerPhone)) {
      this.isValidPhone = false;
    }

    if (!this.pharmacy){
      this.isChosenPharmacy = false;
    }

    if (!this.isValidName || !this.isValidPhone || !this.isChosenPharmacy){
      return
    }
    else {
      this.calculatePrice();
    }
  }

  refresh() {
    this.isValidName = true;
    this.isValidPhone = true;
    this.isChosenPharmacy = true;
    this.isListHidden = false;

    this.NAME_ERROR_MESSAGE = "Недопустимы все символы, кроме кириллицы, латиницы.";
    this.PHONE_ERROR_MESSAGE = "Неверный формат номера тел., пример: +79522795509";
  }

  calculatePrice() {
    this.totalOrder = 0.00;
    for (let i = 0; i < orders.length; i++) {
      this.totalOrder += orders[i].price;
    }
    this.totalPrice = this.deliveryPrice + this.totalOrder;
  }

  handleApothekeClick(pharmacyId: number) {
    const foundPharmacy = this.myPharmacies.find(
      (pharmacy) => pharmacy.id === pharmacyId
    );

    if (foundPharmacy) {
      this.pharmacy = foundPharmacy;
      this.selectedPharmaName = foundPharmacy.details.name + " " + foundPharmacy.details.address;
      this.toggleList();
    }

    this.deliveryPrice = 100.00;
  }
}
