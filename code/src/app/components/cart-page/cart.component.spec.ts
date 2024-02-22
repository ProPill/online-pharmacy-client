import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CartComponent} from './cart.component';
import {UserService} from '../../services/user.service';
import {BackendService} from '../../services/backend.service';
import {of} from 'rxjs';
import {users} from "../../data/users";
import {orders} from "../../data/orders";
import {CartOrderCardComponent} from "./cart-order-card/cart-order-card.component";
import {CartItemCardComponent} from "./cart-item-card/cart-item-card.component";
import {items} from "../../data/items";
import {Router} from "@angular/router";

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  const userServiceMock = {
    currentUserId: of(-1),
  };

  const orderWithRecipeMock = orders[0]
  const orderWithNoRecipeMock = orders[1]
  const itemsMock = [items[0], items[1]]
  const userWithRoleId2Mock = users[0]
  const userWithRoleId1Mock = users[1]

  const backendServiceMock = {
    currentOrder: of(orderWithNoRecipeMock),
    currentCart: of(itemsMock),
    currentFilterStatus: of(false),
    currentUser: of(userWithRoleId2Mock),
    showFilter: jasmine.createSpy('showFilter'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CartComponent, CartOrderCardComponent, CartItemCardComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: BackendService, useValue: backendServiceMock },
      ],
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    component.order = orderWithNoRecipeMock;
    component.items = itemsMock;
    component.user = userWithRoleId2Mock;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get role', () => {
    component.user = userWithRoleId2Mock;

    const result = component.getRole();
    expect(result).toEqual(userWithRoleId2Mock.roleId);
  });

  it('should return 0 for role when user is null', () => {
    component.user = null;
    const result = component.getRole();
    expect(result).toEqual(0);
  });

  it('should navigate to /main and show filter on onMain()', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate').and.stub();

    component.onMain();
    expect(backendServiceMock.showFilter).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/main']);

  });

  it('should return true for isEmpty() when order has no items', () => {
    component.order = orders[2];
    const result = component.isEmpty();
    expect(result).toBeTruthy();
  });

  it('should return false for hasRecipeOnlyItems() when user has role -2', () => {
    component.user = users[0];

    const result = component.hasRecipeOnlyItems();
    expect(result).toBeFalsy();
  });

  it('should return true for hasRecipeOnlyItems() when order has items with hasRecipe and role id -2', () => {
    component.order = orderWithRecipeMock;
    component.items = itemsMock
    component.user = userWithRoleId2Mock
    component.statusChecked = false
    const result = component.hasRecipeOnlyItems();
    expect(result).toBeFalsy();
  });

  it('should return true for hasRecipeOnlyItems() when order has items with hasRecipe and role id is not -2', () => {
    component.order = orderWithRecipeMock;
    component.items = itemsMock
    component.user = userWithRoleId1Mock
    component.statusChecked = false
    const result = component.hasRecipeOnlyItems();
    expect(result).toBeTruthy();
  });

  it('should return false for hasRecipeOnlyItems() when order does not have items with hasRecipe and role id is not -2', () => {
    component.order = orderWithNoRecipeMock;
    component.user = userWithRoleId1Mock
    component.statusChecked = false
    const result = component.hasRecipeOnlyItems();
    expect(result).toBeFalsy();
  });

  it('should return false for hasRecipeOnlyItems() when order does not have items with hasRecipe and role id is -2', () => {
    component.order = orderWithNoRecipeMock;
    component.user = userWithRoleId2Mock
    component.statusChecked = false
    const result = component.hasRecipeOnlyItems();
    expect(result).toBeFalsy();
  });
});
