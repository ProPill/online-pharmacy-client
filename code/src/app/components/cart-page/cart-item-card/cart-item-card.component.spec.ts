import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemCardComponent } from './cart-item-card.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BackendService} from "../../../services/backend.service";
import {UserService} from "../../../services/user.service";
import {items} from "../../../data/items";
import {IItemQuantity} from "../../../models/item_quantity";
import {IItem} from "../../../models/item";
import {of} from "rxjs";

describe('CartItemCardComponent', () => {
  let component: CartItemCardComponent;
  let fixture: ComponentFixture<CartItemCardComponent>;

// мокируем сервисы
  const userServiceMock = {
    currentUserId: of(-1),
  };

  const backendServiceMock = {
    addToCartItem: jasmine.createSpy('addToCartItem'),
    deleteItemFromOrder: jasmine.createSpy('deleteItemFromOrder'),
    getCartPageData: jasmine.createSpy('getCartPageData'),
  };

  const itemQuantityMock: IItemQuantity = {
    itemId: items[0].id,
    itemQuantity: 2,
    hasRecipe: items[0].recipeOnly
  };

  const itemMock: IItem = {
    id: 0,
    title: 'Аквалор софт duo 150 мл душ/струя',
    manufacturer: 'Швеция',
    recipeOnly: true,
    special: false,
    cost: 850.00,
    image: 'assets/pictures/order-success-img.png'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartItemCardComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: BackendService, useValue: backendServiceMock },
      ],
    });

    fixture = TestBed.createComponent(CartItemCardComponent);
    component = fixture.componentInstance;
    component.itemQuantity = itemQuantityMock;
    component.item = itemMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return title of the item', () => {
    const title = component.getTitle();
    expect(title).toEqual(itemMock.title);
  })

  it('should increase quantity and call addToCartItem on increaseQuantity()', () => {
    const initialQuantity = component.quantity;
    component.increaseQuantity();
    const expectedQuantity = initialQuantity + 1;
    expect(component.quantity).toEqual(expectedQuantity);
    expect(backendServiceMock.addToCartItem)
        .toHaveBeenCalledWith(-1, itemMock.id, 1);
  });

  it('should decrease quantity, call addToCartItem, if quantity more than 1 on decreaseQuantity()', () => {
    component.quantity = 2;
    const initialQuantity = component.quantity;
    component.decreaseQuantity();
    const expectedQuantity = initialQuantity - 1;
    expect(component.quantity).toEqual(expectedQuantity);
    expect(backendServiceMock.addToCartItem)
        .toHaveBeenCalledWith(-1, itemMock.id, -1);
  });

  it('should not decrease quantity and call addToCartItem, if quantity equals 1 on decreaseQuantity()', () => {
    // try to decrease below 1
    while (component.quantity > 1)
    {
      component.decreaseQuantity();
    }
    component.decreaseQuantity();
    expect(component.quantity).toEqual(1);
    expect(backendServiceMock.addToCartItem)
        .toHaveBeenCalledWith(-1, itemMock.id, -1);
  });

  it('should calculate cost correctly on calculateCost()', () => {
    component.quantity = itemQuantityMock.itemQuantity;
    const expectedCost = itemMock.cost * component.quantity;
    const calculatedCost = component.calculateCost();

    expect(calculatedCost).toEqual(expectedCost);
    expect(component.cost).toEqual(expectedCost);
  })

  it('should call deleteItemFromOrder and getCartPageData on deleteItem()', () => {
    component.deleteItem();

    expect(backendServiceMock.deleteItemFromOrder).toHaveBeenCalledWith(itemMock.id);
    expect(backendServiceMock.getCartPageData).toHaveBeenCalledWith(-1);
  });
});
