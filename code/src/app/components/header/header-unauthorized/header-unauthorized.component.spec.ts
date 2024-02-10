import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUnauthorizedComponent } from './header-unauthorized.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BackendService} from "../../../services/backend.service";

describe('HeaderUnauthorizedComponent', () => {
  let component: HeaderUnauthorizedComponent;
  let fixture: ComponentFixture<HeaderUnauthorizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderUnauthorizedComponent],
      imports: [ HttpClientTestingModule ],
      providers: [ BackendService ]
    });
    fixture = TestBed.createComponent(HeaderUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
