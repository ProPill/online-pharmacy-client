import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {IPharmacy} from "../../models/pharmacy";
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
  pharmacy: IPharmacy | null;
  selectedPharmaName: string;
  deliveryPrice: number = 50.0;

  isChosenPharmacy: boolean = true;
  isListHidden: boolean = false;
  isAdded: boolean = false;

  deliveryDate: string;
  EMPTY_FIELD_ERROR = "Поле не должно быть пустым";
  NOT_CHOSEN_PHARMACY = "Нужно выбрать аптеку для заказа";
  user: IUser
  order: IOrder;
  private userId: number | null;

  constructor(private backendService: BackendService,
              private userService: UserService,
              private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));

    this.backendService.currentOrder.subscribe((value) => this.order = value);
    this.pharmacies = this.backendService.getAllPharmacies();
    this.isAdded = false;

    this.backendService.currentUser.subscribe((value) => {
      if (value != null) {
        this.user = value
        this.customerName = this.user.name;
        this.customerPhone = this.user.phone.toString();
      }
    })
    this.calculatePrice();
  }

  toggleList() {
    this.isListHidden = !this.isListHidden;
  }

  confirmOrder() {
    if (this.pharmacy == null) {
      this.isChosenPharmacy = false;
      return;
    }
    const num = this.backendService.placeOrder(this.user.id, this.getCreateDate(), this.deliveryDate,
      this.calculatePrice(), this.pharmacy.id, this.order);
    this.isAdded = num == 200;
  }

  refresh() {
    this.isChosenPharmacy = true;
    this.isListHidden = false;
  }

  getCreateDate(): string {
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const formattedDay = this.padZero(day);
    const formattedMonth = this.padZero(month);

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  getDeliveryDate(): string {
    const today = new Date();
    today.setDate(today.getDate() + 5); // Добавляем 5 дней

    const day = today.getDate();
    const month = today.getMonth() + 1; // Месяцы начинаются с нуля
    const year = today.getFullYear();

    const formattedDay = this.padZero(day);
    const formattedMonth = this.padZero(month);

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  calculatePrice() {
    return this.deliveryPrice + this.order.price;
  }

  handleApothekeClick(pharmacyId: number) {
    const foundPharmacy = this.pharmacies.find(
      (pharmacy) => pharmacy.id === pharmacyId
    );

    if (foundPharmacy) {
      this.pharmacy = foundPharmacy;
      this.selectedPharmaName = foundPharmacy.details.name + " " + foundPharmacy.details.address;
      this.toggleList();

      this.deliveryDate = this.getDeliveryDate();
    }
  }

  returnHome() {
    this.isAdded = false;
    this.router.navigate(['/main']);
  }
}
