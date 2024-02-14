import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BackendService} from "../../../services/backend.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [BackendService]
    });
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

