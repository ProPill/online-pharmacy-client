import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrderCardComponent } from './cart-order-card.component';

describe('CartOrderCardComponent', () => {
  let component: CartOrderCardComponent;
  let fixture: ComponentFixture<CartOrderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartOrderCardComponent]
    });
    fixture = TestBed.createComponent(CartOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
