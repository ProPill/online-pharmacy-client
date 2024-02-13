import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPageComponent } from './order-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BackendService} from "../../services/backend.service";

describe('OrderPageComponent', () => {
  let component: OrderPageComponent;
  let fixture: ComponentFixture<OrderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPageComponent],
      imports: [ HttpClientTestingModule ],
      providers: [ BackendService ]
    });
    fixture = TestBed.createComponent(OrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
