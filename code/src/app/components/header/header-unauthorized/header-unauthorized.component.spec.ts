import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderUnauthorizedComponent } from './header-unauthorized.component';
import { BackendService } from '../../../services/backend.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import {routes} from "../../../routes/routes";

describe('HeaderUnauthorizedComponent', () => {
  let component: HeaderUnauthorizedComponent;
  let fixture: ComponentFixture<HeaderUnauthorizedComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const backendServiceMock = {
    currentFilterStatus: of(true),
    hideFilter: jasmine.createSpy('hideFilter'),
  };

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HeaderUnauthorizedComponent],
      providers: [
        { provide: BackendService, useValue: backendServiceMock },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(HeaderUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should hide filter and navigate to /login on onLoginPage()', () => {
    component.onLoginPage();
    expect(backendServiceMock.hideFilter).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should hide filter and navigate to /registration on onRegistrationPage()', () => {
    component.onRegistrationPage();
    expect(backendServiceMock.hideFilter).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/registration']);
  });

  it('should call changeFilterStatus and emit onFilterChange event with false', () => {
    const emitSpy = spyOn(component.onFilterChange, 'emit');
    component.onFilter = false;
    component.changeFilterStatus();
    expect(emitSpy).toHaveBeenCalledWith(false);
  });
});
