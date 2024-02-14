import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductCardComponent} from './product-card.component';
import {UserService} from '../../services/user.service';
import {BackendService} from '../../services/backend.service';
import {IPharmacy} from "../../models/pharmacy";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let userService: UserService;
  let backendService: BackendService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      imports: [RouterTestingModule, HttpClientTestingModule
      ],
      providers: [UserService, BackendService],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    backendService = TestBed.inject(BackendService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('decrease (>1)', () => {
    component.quantity = 3;
    component.decreaseQuantity();
    expect(component.quantity).toBe(2);
  });

  it('decrease (=1)', () => {
    component.quantity = 1;
    component.decreaseQuantity();
    expect(component.quantity).toBe(0);
  });

  it('increase', () => {
    component.quantity = 2;
    component.increaseQuantity();
    expect(component.quantity).toBe(3);
  });

  it('should call service method on addItemToCart', () => {
    spyOn(backendService, 'addToCartItem').and.stub();
    spyOn(component.router, 'navigate').and.stub();

    component.userId = 1;
    component.itemId = 123;
    component.quantity = 2;
    component.addItemToCart();
    expect(backendService.addToCartItem).toHaveBeenCalledWith(1, 123, 2);
    expect(component.router.navigate).toHaveBeenCalledWith(['/main']);
  });

  it('calculateCost - should calculate cost correctly', () => {
    component.item = {
      id: 1,
      title: 'Test title',
      manufacturer: 'Test manufacturer',
      recipeOnly: false,
      special: false,
      cost: 10,
      image: 'http test'
    };
    component.quantity = 3;
    expect(component.calculateCost()).toBe(30);
  });

  it('showPharmacies - should toggle showPharmaciesFlag', () => {
    component.showPharmaciesFlag = false;
    component.showPharmacies();
    expect(component.showPharmaciesFlag).toBeTruthy();
    component.showPharmacies();
    expect(component.showPharmaciesFlag).toBeFalsy();
  });

  it('should set Chosen correctly based on quantity', () => {
    component.quantity = 0;
    component.Chosen = true;
    component.decreaseQuantity();
    expect(component.Chosen).toBeFalsy();
    component.increaseQuantity();
    expect(component.Chosen).toBeTruthy();
  });

  it('userId should be received properly', () => {
    userService.changeUserId(123);
    expect(component.userId).toEqual(123);
  });

  it('should default quantity to 1 if not in itemsSafe', () => {
    component.itemId = 3;
    component.itemsSafe = new Map<number, number>();
    component.ngOnInit();
    expect(component.quantity).toEqual(1);
  });

  it('should default quantity to 1 if not in itemsSafe', () => {
    component.itemId = 3;
    component.itemsSafe = new Map<number, number>();
    component.ngOnInit();
    expect(component.quantity).toEqual(1);
  });

  it('should set pharmacies correctly from backendService', () => {
    const testPharmacies: IPharmacy[] = [
      {id: 1, details: {name: 'Pharmacy 1', address: 'Address 1', workingHours: '9am - 5pm', phone: '123-456-7890'}},
      {id: 2, details: {name: 'Pharmacy 2', address: 'Address 2', workingHours: '10am - 6pm', phone: '098-765-4321'}}
    ];
    spyOn(backendService, 'getAllPharmaciesById').and.returnValue(testPharmacies);
    component.itemId = 1;
    component.ngOnInit();
    expect(component.pharmacies).toEqual(testPharmacies);
  });

});
