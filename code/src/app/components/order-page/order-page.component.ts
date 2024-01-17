import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {IPharmacy} from "../../models/pharmacy";
import {orders} from "../../data/orders";
import {IOrder} from "../../models/order";
import {UserService} from "../../services/user.service";
import {BackendService} from "../../services/backend.service";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {
  pharmacies: IPharmacy[];
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
  isAdded: boolean = false;

  timeExpire: string;
  dataReadyOrder: string;

  EMPTY_FIELD_ERROR = "Поле не должно быть пустым";
  NOT_CHOSEN_PHARMACY = "Нужно выбрать аптеку для заказа";
  user: IUser
  private userId: number | null;

  constructor(private backendService: BackendService,
              private userService: UserService,
              private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));

    this.pharmacies = this.backendService.getAllPharmacies();
    this.orders = orders;
    this.isAdded = false;

    this.backendService.currentUser.subscribe((value) => {
      if (value != null) {
        this.user = value
      }})
    this.customerName = this.user.name;
    this.customerPhone = this.user.phone.toString();

    this.calculatePrice();
  }

  toggleList() {
    this.isListHidden = !this.isListHidden;
  }

  confirmOrder() {
    if (!this.pharmacy) {
      this.isChosenPharmacy = false;
      return;
    }

    this.isAdded = true;
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
    const foundPharmacy = this.pharmacies.find(
      (pharmacy) => pharmacy.id === pharmacyId
    );

    if (foundPharmacy) {
      this.pharmacy = foundPharmacy;
      this.selectedPharmaName = foundPharmacy.details.name + " " + foundPharmacy.details.address;
      this.toggleList();
    }

    // get time from endpoint
    this.dataReadyOrder = this.getFormattedDate();
  }

  returnHome() {
    this.isAdded = false;
    this.router.navigate(['/main']);
  }
}
