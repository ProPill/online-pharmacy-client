import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CartOrderCardComponent } from './cart-order-card.component';
import { UserService } from '../../../services/user.service';
import { BackendService } from '../../../services/backend.service';
import { of } from 'rxjs';
import { orders } from '../../../data/orders';
import { IOrder } from '../../../models/order';
import { IItem } from '../../../models/item';
import { IItemQuantity } from '../../../models/item_quantity';
import { users } from '../../../data/users';
import { items } from '../../../data/items';
import { routes } from '../../../routes/routes';

describe('CartOrderCardComponent', () => {
  let component: CartOrderCardComponent;
  let fixture: ComponentFixture<CartOrderCardComponent>;
  let router: Router;

  const userServiceMock = {
    currentUserId: of(-1),
  };

  let backendServiceMock: {
    currentUser: any;
    updateOrder: jasmine.Spy;
  };

  const orderMock: IOrder = orders[0];

  const itemsMock: IItem[] = [items[0], items[1]];
  const userMock = users[0];

  beforeEach(() => {

    backendServiceMock = {
      currentUser: of(users[0]),
      updateOrder: jasmine.createSpy('updateOrder'),
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
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

  it('should create order and navigate on createOrder() when checkboxChecked is true', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate').and.stub();
    spyOn(component, 'calculatePrice');

    component.checkboxChecked = true;
    fixture.detectChanges();
    component.createOrder();

    expect(component.calculatePrice).toHaveBeenCalled();
    const result = parseInt(component.calculatePrice());
    expect(component.order.price).toEqual(result);
    expect(backendServiceMock.updateOrder).toHaveBeenCalledWith(orderMock);
    expect(navigateSpy).toHaveBeenCalledWith(['/order-page']);
  });

  it('should not create order on createOrder() when checkboxChecked is false', fakeAsync(() => {
    backendServiceMock.updateOrder.and.returnValue(of({}));
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate').and.stub();
    component.hasRecipeItems = true;
    component.checkboxChecked = false;

    spyOn(component, 'calculatePrice').and.callThrough();
    component.createOrder();
    tick();

    expect(component.calculatePrice).not.toHaveBeenCalled();
    expect(backendServiceMock.updateOrder).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalledWith();
  }));

  it('should return user role when user is not null', () => {
    const roleId = userMock.roleId;
    component.user = userMock;

    const result = component.getRole();
    expect(result).toEqual(roleId);
  });

  it('should return 0 when user is null', () => {
    component.user = null;
    const result = component.getRole();
    expect(result).toEqual(0);
  });
  it('should remove "inactive" class from button if hasRecipeItems and checkboxChecked is false', () => {
    component.checkOrderButtonColor();

    const button = fixture.nativeElement.querySelector('.card-order .button-color');
    expect(button.classList.contains('inactive')).toBeFalsy();
  });

  it('should add "inactive" class to button if hasRecipeItems and checkboxChecked is true', () => {
    component.hasRecipeItems = true;
    component.checkboxChecked = true;
    component.checkOrderButtonColor();

    const button = fixture.nativeElement.querySelector('.card-order .button-color');
    expect(button.classList.contains('inactive')).toBeTruthy();
  });

  it('should not modify checkboxChecked if !hasRecipeItems', () => {
    component.hasRecipeItems = false;
    const initialCheckboxChecked = component.checkboxChecked;
    component.checkOrderButtonColor();

    expect(component.checkboxChecked).toEqual(initialCheckboxChecked);
  });
});
