import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OrderPageComponent} from './order-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BackendService} from "../../services/backend.service";
import {IUser} from "../../models/user";
import {IOrder} from "../../models/order";
import {IPharmacy} from "../../models/pharmacy";
import {Router} from "@angular/router";
import {IItemQuantity} from "../../models/item_quantity";

describe('OrderPageComponent', () => {
  let component: OrderPageComponent;
  let fixture: ComponentFixture<OrderPageComponent>;
  let backendService: BackendService;
  let router: Router;

  let mockUser: IUser;
  let mockItemQuantity: IItemQuantity;
  let mockOrder: IOrder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPageComponent],
      imports: [HttpClientTestingModule],
      providers: [BackendService, { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }]
    });

    mockUser = {
      id: 1,
      name: 'John Doe',
      phone: 1234567890,
      roleId: 1,
      specialityId: -1
    };
    mockItemQuantity = {
      itemId: 1,
      itemQuantity: 2,
      hasRecipe: false
    };
    mockOrder = {
      id: 1,
      date: '2024-02-17',
      address: '123 Main St',
      deliverDate: '2024-02-20',
      price: 100,
      orderNumber: '123456',
      items: [mockItemQuantity]
    };
    backendService = TestBed.inject(BackendService);
    backendService.changeUser(mockUser)
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(OrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle list visibility', () => {
    expect(component.isListHidden).toBeFalsy();
    component.toggleList();
    expect(component.isListHidden).toBeTruthy();
    component.toggleList();
    expect(component.isListHidden).toBeFalsy();
  });

  it('should confirm order', () => {
    component.pharmacy = null;
    component.confirmOrder();
    expect(component.isChosenPharmacy).toBeFalsy();

    component.pharmacy = {
      id: 1,
      details: {name: 'Pharmacy 1', address: 'Address 1', workingHours: '9AM-5PM', phone: '1234567890'}
    };
    spyOn(backendService, 'placeOrder').and.returnValue(200);

    component.confirmOrder();
    expect(component.isAdded).toBeTruthy();
  });

  it('should set values to default logic values after callin refresh', () => {
    component.refresh();
    expect(component.isChosenPharmacy).toBeTruthy();
    expect(component.isListHidden).toBeFalse();
  });

  it('should return current date in correct format', () => {
    const mockDate = new Date('2024-02-17');
    spyOn(component, 'padZero').and.returnValue('05');

    jasmine.clock().mockDate(mockDate);

    const result = component.getCreateDate();
    expect(component.padZero).toHaveBeenCalledWith(17);
    expect(result).toBe('2024-05-05');
  });

  it('should pad zero for single-digit numbers', () => {
    expect(component.padZero(5)).toBe('05');
    expect(component.padZero(10)).toBe('10');
  });

  it('should reset isAdded flag and navigate to /main route', () => {
    component.isAdded = true;
    component.returnHome();
    expect(component.isAdded).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/main']);
  });

  it('should calculate price correctly', () => {
    component.order = { price: 100 } as IOrder;
    expect(component.calculatePrice()).toBe(150);
  });

  it('should return delivery date 5 days from today in correct format', () => {
    const mockToday = new Date();
    mockToday.setDate(17);
    mockToday.setMonth(1);
    mockToday.setFullYear(2024);

    jasmine.clock().mockDate(mockToday);

    spyOn(component, 'padZero').and.callThrough();

    const deliveryDate = component.getDeliveryDate();

    expect(deliveryDate).toBe('2024-02-22');
    expect(component.padZero).toHaveBeenCalledTimes(2);
    expect(component.padZero).toHaveBeenCalledWith(22);
    expect(component.padZero).toHaveBeenCalledWith(2);
  });

  it('should handle pharmacy click', () => {
    const mockPharmacy: IPharmacy = { id: 1, details: { name: 'Pharmacy 1', address: 'Address 1', workingHours: '9AM-5PM', phone: '1234567890' } };
    spyOn(component, 'getDeliveryDate').and.returnValue('2024-02-20');
    component.pharmacies.push(mockPharmacy);

    component.handleApothekeClick(1);
    expect(component.pharmacy).toEqual(mockPharmacy);
    expect(component.selectedPharmaName).toBe('Pharmacy 1 Address 1');
    expect(component.deliveryDate).toBe('2024-02-20');
  });
});
