import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUnauthorizedComponent } from './header-unauthorized.component';

describe('HeaderUnauthorizedComponent', () => {
  let component: HeaderUnauthorizedComponent;
  let fixture: ComponentFixture<HeaderUnauthorizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderUnauthorizedComponent]
    });
    fixture = TestBed.createComponent(HeaderUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
