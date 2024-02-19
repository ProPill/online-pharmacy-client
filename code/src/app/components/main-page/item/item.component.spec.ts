import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../services/user.service';
import { BackendService } from '../../../services/backend.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {users} from "../../../data/users";
import {routes} from "../../../routes/routes";
import {Router} from "@angular/router";
import {items} from "../../../data/items";
import {IItem} from "../../../models/item";
import {ItemComponent} from "./item.component";

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let router: Router;

  const userWithRoleId1Mock = users[1]

  const userIdNullMock = null;
  const itemIdMock = 1;
  const itemsObservableMock =   new Map<number, number>();
  const itemMock =  items[0]

  const userServiceMock = {
    currentUserId: new BehaviorSubject<number | null>(null),
    itemsObservable: of(itemsObservableMock),
    itemIdObservable: of(itemIdMock),
    changeItem: jasmine.createSpy('changeItem'),
    changeItemId: jasmine.createSpy('changeItemId'),
  };

  let backendServiceMock: {
    currentUser: Observable<number | null>,
    currentSearchStatus: Observable<boolean>,
    currentFilterStatus:  Observable<boolean>,
    addToCartItem: jasmine.Spy,
    defaultItems: Observable<IItem[]>
  };


  beforeEach(() => {
    userServiceMock.currentUserId.next(null)
    backendServiceMock = {
      currentUser: of(userIdNullMock),
      currentSearchStatus: of(false),
      currentFilterStatus: of(false),
      addToCartItem: jasmine.createSpy('addToCartItem'),
      defaultItems: of([] as IItem[])
    }
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ItemComponent],
      providers: [
        {provide: UserService, useValue: userServiceMock},
        {provide: BackendService, useValue: backendServiceMock},
      ],
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = itemMock
    component.quantity = 3
    component.quantityIsZero = component.quantity == 0;
    fixture.detectChanges()
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties in the constructor', () => {
    expect(component['userId']).toEqual(userIdNullMock);
    expect(component.itemsSafe).toEqual(itemsObservableMock);
    expect(component['itemId']).toEqual(itemIdMock);
  });

  it('should increase quantity and call changeItem on increaseQuantity()', () => {
    const initialQuantity = component.quantity;
    component.increaseQuantity();
    const expectedQuantity = initialQuantity + 1;
    expect(component.quantityIsZero).toBeFalsy()
    expect(component.quantity).toEqual(expectedQuantity);
    expect(userServiceMock.changeItem)
        .toHaveBeenCalledWith(itemMock.id, expectedQuantity);
  });

  it('should decrease quantity, call changeItem, if quantity more than 1 on decreaseQuantity()', () => {
    const initialQuantity = component.quantity;
    component.decreaseQuantity();
    fixture.detectChanges();
    const expectedQuantity = initialQuantity - 1;

    expect(component.quantityIsZero).toBeFalsy();
    expect(component.quantity).toEqual(expectedQuantity);
    expect(userServiceMock.changeItem)
        .toHaveBeenCalledWith(itemMock.id, expectedQuantity);
  });

  it('should set quantityIsZero true call changeItem, if quantity equals 1 on decreaseQuantity()', () => {
    while (component.quantity >= 1)
    {
      component.decreaseQuantity();
    }

    expect(component.quantityIsZero).toBeTruthy()
    expect(component.quantity).toEqual(0);
    expect(userServiceMock.changeItem)
        .toHaveBeenCalledWith(itemMock.id, 0);
  });

  it('should call addToCartItem when quantity is greater than 0 and userId is not null', () => {
    userServiceMock.currentUserId.next(userWithRoleId1Mock.id)
    fixture.detectChanges()

    component.addToCart();
    expect(component['userId']).toEqual(1)

    expect(component.quantityIsZero).toBeFalsy();
    expect(component.itemQuantity).toEqual({
      itemId: itemMock.id,
      itemQuantity: component.quantity,
      hasRecipe: itemMock.recipeOnly
    });
    expect(backendServiceMock.addToCartItem).toHaveBeenCalledWith(userWithRoleId1Mock.id, itemMock.id, component.quantity);
  });

  it('should not call addToCartItem when quantity is 0', () => {
    component.quantity = 0;

    component.addToCart();

    expect(component.quantityIsZero).toBeFalsy();
    expect(component.itemQuantity).toEqual({
      itemId: itemMock.id,
      itemQuantity: component.quantity,
      hasRecipe: itemMock.recipeOnly
    });
    expect(backendServiceMock.addToCartItem).not.toHaveBeenCalled();

  });

  it('should not call addToCartItem when userId is null', () => {
    userServiceMock.currentUserId.next(null);

    component.addToCart();

    expect(component.quantityIsZero).toBeFalsy();
    expect(component.itemQuantity).toEqual({
      itemId: itemMock.id,
      itemQuantity: component.quantity,
      hasRecipe: itemMock.recipeOnly
    });
    expect(backendServiceMock.addToCartItem).not.toHaveBeenCalled();
  });

  it('shoud set iteId, all changeItemId and navigate to prosuct page on onProductPage()', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate').and.stub()
    component.onProductCardPage();

    expect(userServiceMock.changeItemId).toHaveBeenCalledWith(itemMock.id);
    expect(navigateSpy).toHaveBeenCalledWith(['/product-page'])
  })
})
