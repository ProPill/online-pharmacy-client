import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemCardComponent } from './cart-item-card.component';

describe('CartItemCardComponent', () => {
  let component: CartItemCardComponent;
  let fixture: ComponentFixture<CartItemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartItemCardComponent]
    });
    fixture = TestBed.createComponent(CartItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return title of the item', () => {
    expect();
  })

  it('should increase quantity of the item', () => {
    let before = component.quantity;
    component.increaseQuantity();
    expect(component.quantity - before).toBe(1);
    expect(component.quantity).toBe(component.itemQuantity.itemQuantity)
  })

  it('should decrease quantity of the item', () => {
    let before = component.quantity;
    component.decreaseQuantity();
    if (before == 1) {
      expect(before).toBe(component.quantity)
    }
    else {
      expect(before - component.quantity).toBe(1);
    }
    expect(component.quantity).toBe(component.itemQuantity.itemQuantity)
  })

  it('should calculate cost', () => {

  })
});
