import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import {BackendService} from "../../../services/backend.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {IUser} from "../../../models/user";
import {users} from "../../../data/users";
import {UserService} from "../../../services/user.service";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../../routes/routes";
import {orders} from "../../../data/orders";
import {IOrder} from "../../../models/order";
import {AccountOrderCardComponent} from "../account-order-card/account-order-card.component";
import {MainPageComponent} from "../../main-page/main-page.component";

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  const ordersMock = [orders[0], orders[1]];
  const userWithRoleId1Mock = users[1]

  let backendServiceMock: {
    currentUser: Observable<IUser>,
    currentOrdersList: Observable<IOrder[]>
    getUserOrders: jasmine.Spy,
  };

  const userServiceMock = {
    currentUserId: of(userWithRoleId1Mock.id),
  };

  beforeEach(() => {
    backendServiceMock = {
      currentUser: of(userWithRoleId1Mock),
      currentOrdersList: of(ordersMock),
      getUserOrders: jasmine.createSpy('getUserOrders'),
    }

    TestBed.configureTestingModule({
      declarations: [AccountComponent, AccountOrderCardComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: BackendService, useValue: backendServiceMock }
      ],
    });

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on initialization', () => {
    spyOn(component, 'loadOrders')
    fixture = TestBed.createComponent(AccountComponent);
    fixture.detectChanges()

    expect(backendServiceMock.getUserOrders).toHaveBeenCalledWith(userWithRoleId1Mock.id);
    expect(component.orders).toEqual(ordersMock);
  });

  it('should load orders', () => {
    component.loadOrders();
    expect(backendServiceMock.getUserOrders).toHaveBeenCalledWith(userWithRoleId1Mock.id);
  });
});
