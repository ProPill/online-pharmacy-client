import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuthorizedComponent } from './header-authorized.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BackendService} from "../../../services/backend.service";

describe('HeaderAuthorizedComponent', () => {
  let component: HeaderAuthorizedComponent;
  let fixture: ComponentFixture<HeaderAuthorizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderAuthorizedComponent],
      imports: [ HttpClientTestingModule ],
      providers: [ BackendService ]
    });
    fixture = TestBed.createComponent(HeaderAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
