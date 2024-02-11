import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CartOrderCardComponent } from './cart-order-card.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BackendService} from "../../../services/backend.service";
import {of} from "rxjs";
import {IUser} from "../../../models/user";
import {IOrder} from "../../../models/order";
import {IItem} from "../../../models/item";
import {users} from "../../../data/users";
import {items} from "../../../data/items";
import {orders} from "../../../data/orders";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {IItemQuantity} from "../../../models/item_quantity";
import {RouterTestingModule} from "@angular/router/testing";

describe('CartOrderCardComponent', () => {
  let component: CartOrderCardComponent;
  let fixture: ComponentFixture<CartOrderCardComponent>;
  let router: Router;

  const userServiceMock = {
    currentUserId: of(0),
  };

  const backendServiceMock = {
    currentUser: of(users[0]),
    updateOrder: jasmine.createSpy('updateOrder'),
  };

  const orderMock: IOrder = orders[0];

  const itemsMock: IItem[] = [items[0], items[1]];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CartOrderCardComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: BackendService, useValue: backendServiceMock },
      ],
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CartOrderCardComponent);
    component = fixture.componentInstance;
    component.order = orderMock;
    component.items = itemsMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize checkboxChecked in ngOnInit', () => {
    expect(component.checkboxChecked).toEqual(!component.hasRecipeItems);
  });

  it('should calculate price correctly in calculatePrice()', () => {
    component.calculatePrice();
    const expectedPrice = orderMock.items.reduce(
        (total, obj: IItemQuantity) => {
          return total + itemsMock[obj.itemId].cost * obj.itemQuantity;
          },
        0) + 50;

    expect(component.price).toEqual(expectedPrice);
  });

  it('should create order and navigate on createOrder() when checkboxChecked is true', fakeAsync(() => {
    component.checkboxChecked = true;
    component.createOrder();
    tick();
    expect(backendServiceMock.updateOrder).toHaveBeenCalledWith(orderMock);
    expect(router.navigate).toHaveBeenCalledWith(['/order-page']);
  }));

  it('should not create order on createOrder() when checkboxChecked is false', () => {
    component.checkboxChecked = false;
    component.createOrder();
    expect(backendServiceMock.updateOrder).not.toHaveBeenCalled();
  });

  it('should return user role when user is not null', () => {
    const roleId = users[0].roleId;
    component.user = users[0];

    const result = component.getRole();
    expect(result).toEqual(roleId);
  });

  it('should return 0 when user is null', () => {
    component.user = null;
    const result = component.getRole();
    expect(result).toEqual(0);
  });
});
