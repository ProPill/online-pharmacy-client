import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPharmacistComponent } from './header-pharmacist.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BackendService} from "../../../services/backend.service";

describe('HeaderPharmacistComponent', () => {
  let component: HeaderPharmacistComponent;
  let fixture: ComponentFixture<HeaderPharmacistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderPharmacistComponent],
      imports: [ HttpClientTestingModule ]
    });
    fixture = TestBed.createComponent(HeaderPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
