import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrderCardComponent } from './cart-order-card.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BackendService} from "../../../services/backend.service";

describe('CartOrderCardComponent', () => {
  let component: CartOrderCardComponent;
  let fixture: ComponentFixture<CartOrderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartOrderCardComponent],
      imports: [ HttpClientTestingModule ],
      providers: [ BackendService ]
    });
    fixture = TestBed.createComponent(CartOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
