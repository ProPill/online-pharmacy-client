import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart.component';
import { UserService } from '../../services/user.service';
import { BackendService } from '../../services/backend.service';
import { of } from 'rxjs';
import { IOrder } from '../../models/order';
import { IUser } from '../../models/user';
import { IItem } from '../../models/item';
import {users} from "../../data/users";
import {orders} from "../../data/orders";

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  const userServiceMock = {
    currentUserId: of(-1),
  };

  const orderMock = orders[0]

  const backendServiceMock = {
    currentOrder: of(orders[0]),
    currentCart: of([] as IItem[]),
    currentFilterStatus: of(false),
    currentUser: of(users[0]),
    showFilter: jasmine.createSpy('showFilter'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CartComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: BackendService, useValue: backendServiceMock },
      ],
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    component.order = orderMock;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get role', () => {
    const userMock: IUser = users[0];
    component.user = userMock;

    const result = component.getRole();
    expect(result).toEqual(userMock.roleId);
  });

  it('should return 0 for role when user is null', () => {
    component.user = null;
    const result = component.getRole();
    expect(result).toEqual(0);
  });

  it('should navigate to /main and show filter on onMain()', () => {
    component.onMain();
    expect(backendServiceMock.showFilter).toHaveBeenCalled();
  });

  it('should return true for isEmpty() when order has no items', () => {
    component.order = orders[2];
    const result = component.isEmpty();
    expect(result).toBeTruthy();
  });

  it('should return false for hasRecipeOnlyItems() when user has role -2', () => {
    const userMock = users[0];
    component.user = userMock;

    const result = component.hasRecipeOnlyItems();
    expect(result).toBeFalsy();
  });

  it('should return true for hasRecipeOnlyItems() when order has items with hasRecipe', () => {
    component.order = orders[0];
    const result = component.hasRecipeOnlyItems();
    expect(result).toBeTruthy();
  });

  it('should return false for hasRecipeOnlyItems() when order does not have items with hasRecipe', () => {
    component.order = orders[1];
    const result = component.hasRecipeOnlyItems();
    expect(result).toBeTruthy();
  });
});
