import {Component, Input} from '@angular/core';
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
  deliveryPrice: number = 50.0;

  isChosenPharmacy: boolean = true;
  isListHidden: boolean = false;
  userId: number;

  timeExpire: string;
  dataReadyOrder: string;

  EMPTY_FIELD_ERROR = "Поле не должно быть пустым";
  NOT_CHOSEN_PHARMACY = "Нужно выбрать аптеку для заказа";

  constructor(private router: Router) {
    this.myPharmacies = pharmacies;
    this.orders = orders;

    // get Fio and Phone by userId
    this.userId = 0;
    this.customerName = "Смирнов Евгений Александрович";
    this.customerPhone = "+79522795509";

    this.calculatePrice();
  }

   toggleList() {
    this.isListHidden = !this.isListHidden;
  }

  confirmOrder(){
    if (!this.pharmacy){
      this.isChosenPharmacy = false;
      return;
    }
  }

  refresh() {
    this.isChosenPharmacy = true;
    this.isListHidden = false;
  }

  getFormattedDate(): string {
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based
    const year = today.getFullYear();

    const formattedDay = this.padZero(day);
    const formattedMonth = this.padZero(month);

    return `${formattedDay}.${formattedMonth}.${year}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
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

    // get time from endpoint
    let days = 0;
    this.timeExpire = days + " " +  "дней";
    this.dataReadyOrder = this.getFormattedDate();
  }
}
