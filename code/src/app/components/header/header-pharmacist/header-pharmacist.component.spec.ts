import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPharmacistComponent } from './header-pharmacist.component';

describe('HeaderPharmacistComponent', () => {
  let component: HeaderPharmacistComponent;
  let fixture: ComponentFixture<HeaderPharmacistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderPharmacistComponent]
    });
    fixture = TestBed.createComponent(HeaderPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
