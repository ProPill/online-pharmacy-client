import { TestBed } from '@angular/core/testing';

import { PharmacistService } from './pharmacist.service';
import {CartItemCardComponent} from "../components/cart-page/cart-item-card/cart-item-card.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BackendService} from "./backend.service";

describe('PharmacistService', () => {
  let service: PharmacistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PharmacistService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
