import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPharmacistComponent } from './header-pharmacist.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BackendService} from "../../../services/backend.service";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../../routes/routes";
import {of} from "rxjs";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

describe('HeaderPharmacistComponent', () => {
  let component: HeaderPharmacistComponent;
  let fixture: ComponentFixture<HeaderPharmacistComponent>;

  const userServiceMock = {
    currentUserId: of(-1),
    changeUserId: jasmine.createSpy('changeUserId'),
  };

  const backendServiceMock = {
    currentFilterStatus: of(true), // Mock the currentFilterStatus observable with a value
    hideFilter: jasmine.createSpy('hideFilter'),
    showFilter: jasmine.createSpy('showFilter'),
    logout: jasmine.createSpy('logout'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderPharmacistComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: BackendService, useValue: backendServiceMock },
      ],

    });
    fixture = TestBed.createComponent(HeaderPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onOpenPharmacistPage and navigate to /pharmacist', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.onOpenPharmacistPage();
    expect(backendServiceMock.hideFilter).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/pharmacist']);
  });

  it('should call onLogOut and navigate to /main', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.onLogOut();
    expect(backendServiceMock.showFilter).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/main']);
    expect(backendServiceMock.logout).toHaveBeenCalled();
  });

  it('should call changeFilterStatus and emit onFilterChange event with true', () => {
    const emitSpy = spyOn(component.onFilterChange, 'emit');
    component.onFilter = true;
    component.changeFilterStatus();
    expect(emitSpy).toHaveBeenCalledWith(true); // Change this argument based on your expected behavior
  });

  it('should call changeFilterStatus and emit onFilterChange event with false', () => {
    const emitSpy = spyOn(component.onFilterChange, 'emit');
    component.onFilter = false;
    component.changeFilterStatus();
    expect(emitSpy).toHaveBeenCalledWith(false); // Change this argument based on your expected behavior
  });
});
