import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { BackendService } from './backend.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {items} from "../data/items";
import {IItem} from "../models/item";
import {orders} from "../data/orders";
import {users} from "../data/users";
import {UserService} from "./user.service";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IPharmacy} from "../models/pharmacy";

describe('BackendService', () => {
  let backendService: BackendService;
  let userService: UserService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const orderMock = orders[0]
  const ordersMock = [orders[0], orders[1]]
  const itemsMock = [items[0], items[1]]
  const specialItemsMock = [items[2], items[3]]
  const itemMock = items[0]
  const userMock = users[0]
  const userInputMock = {
    id: userMock.id,
    full_name: userMock.name,
    phone: userMock.phone,
    role: {id: userMock.roleId},
    speciality_id: userMock.specialityId,
  }

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [BackendService, UserService]
    });
    backendService = TestBed.inject(BackendService);
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(backendService).toBeTruthy();
  });

  it('should update order', () => {
    const order = orderMock

    backendService.updateOrder(order);

    backendService.currentOrder.subscribe((updatedOrder) => {
      expect(updatedOrder).toEqual(order);
    });
  });


  it('should update cart', () => {
    const cartItems = itemsMock;

    backendService.updateCart(cartItems);

    backendService.currentCart.subscribe((updatedCart) => {
      expect(updatedCart).toEqual(cartItems);
    });
  });

  it('should update orders list', () => {
    const ordersList = ordersMock;

    backendService.updateOrders(ordersList);

    backendService.currentOrdersList.subscribe((updatedOrdersList) => {
      expect(updatedOrdersList).toEqual(ordersList);
    });
  });

  it('should show filter and reset button colors', () => {
    spyOn(document, 'querySelectorAll').and.returnValue([{ classList: { remove: () => {} } }] as any);

    backendService.showFilter();

    backendService.currentFilterStatus.subscribe((filterStatus) => {
      expect(filterStatus).toBe(true);
    });

    expect(document.querySelectorAll).toHaveBeenCalledWith('.button-color');
  });

  it('should hide filter', () => {
    backendService.hideFilter();

    backendService.currentFilterStatus.subscribe((filterStatus) => {
      expect(filterStatus).toBe(false);
    });
  });

  it('should set search status', () => {
    const searchStatus = true;

    backendService.setSearchStatus(searchStatus);

    backendService.currentSearchStatus.subscribe((currentSearchStatus) => {
      expect(currentSearchStatus).toBe(searchStatus);
    });
  });

  it('should set default list', () => {
  const defaultItems = itemsMock;

  backendService.setDefaultList(defaultItems);

  backendService.defaultItems.subscribe((items) => {
    expect(items).toEqual(defaultItems);
  });
});

  it('should change items list', () => {
    const items: IItem[] = itemsMock;

    backendService.changeItems(items);

    backendService.currentItems.subscribe((currentItems) => {
      expect(currentItems).toEqual(items);
    });
  });

  it('should change user', () => {
    const user = userMock

    backendService.changeUser(user);

    backendService.currentUser.subscribe((currentUser) => {
      expect(currentUser).toEqual(user);
    });
  });

  it('should logout successfully and clear user data', () => {
    spyOn(backendService, 'changeUser');
    spyOn(backendService, 'getNormalUserItemsList');

    const userId = 1;
    userService.changeUserId(userId);

    backendService.logout();

    userService.currentUserId.subscribe((value) => {
      expect(value).toBeNull();
    });

    expect(backendService.changeUser).toHaveBeenCalledWith(null);
    expect(backendService.getNormalUserItemsList).toHaveBeenCalled();
  });

  it('should logout without making a request if currentUserId is null', () => {
    spyOn(backendService, 'getNormalUserItemsList');
    spyOn(backendService, 'changeUser');

    backendService.logout();

    userService.currentUserId.subscribe((value) => {
      expect(value).toBeNull();
    });

    expect(backendService.changeUser).toHaveBeenCalledWith(null);
    expect(backendService.getNormalUserItemsList).toHaveBeenCalled();
  });

  it('should return false for an empty search result', () => {
    spyOn(backendService, 'changeItems')
    const query = 'nonexistent';
    const emptyItems = [] as IItem[];

    backendService.searchItem(query);

    const req = httpTestingController.expectOne(`http://localhost:8080/api/item/search_result?search=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(emptyItems);

    expect(backendService.changeItems).toHaveBeenCalledWith(emptyItems);
    expect(backendService['searchStatusSource'].getValue()).toBe(false);
  });



  it('should transform user data into IUser object', () => {
    const inputData = userInputMock

    const expectedUser = userMock
    const result = backendService.getUser(inputData);

    expect(result).toEqual(expectedUser);
  });

  it('should get pharmacies by item ID', () => {
    const itemId = 1;
    const expectedPharmacies: IPharmacy[] = [
      {
        id: 1,
        details: {
          name: 'Pharmacy 1',
          address: 'Address 1',
          workingHours: '9-5',
          phone: '123-456-7890'
        }
      },
    ];

    const result = backendService.getAllPharmaciesById(itemId)
    // expect(result).toEqual(expectedPharmacies)

    const req = httpTestingController.expectOne('http://localhost:8080/api/pharmacy/item?item_id=1');
    expect(req.request.method).toBe('GET');
    req.flush(expectedPharmacies);
  });

  it('should parse positive number to formatted string', () => {
    const inputId = 123;
    const result = backendService.parseIdToNumber(inputId);
    const expected = '00000123';

    expect(result).toEqual(expected);
  });

  it('should parse negative number to formatted string', () => {
    const inputId = -456;
    const result = backendService.parseIdToNumber(inputId);
    const expected = '00000456';

    expect(result).toEqual(expected);
  });

  it('should parse zero to formatted string', () => {
    const inputId = 0;
    const result = backendService.parseIdToNumber(inputId);
    const expected = '00000000';

    expect(result).toEqual(expected);
  });

  it('should get cart page data and update order', () => {
        const userId = 1;
        const mockOrder = orderMock

        backendService.getCartPageData(userId);

    const req = httpTestingController.expectOne('http://localhost:8080/api/cart/1');
    expect(req.request.method).toBe('GET');
    // req.flush(mockOrder);

        // expect(backendService.currentOrder.subscribe( value =>
        //     expect(value).toEqual(orderMock)))
      }
  );
});

