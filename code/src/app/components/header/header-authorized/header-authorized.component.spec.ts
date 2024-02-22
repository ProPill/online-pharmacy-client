import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderAuthorizedComponent } from './header-authorized.component';
import { UserService } from '../../../services/user.service';
import { BackendService } from '../../../services/backend.service';
import { of } from 'rxjs';
import {routes} from "../../../routes/routes";
import {Router} from "@angular/router";
import {users} from "../../../data/users";

describe('HeaderAuthorizedComponent', () => {
  let component: HeaderAuthorizedComponent;
  let fixture: ComponentFixture<HeaderAuthorizedComponent>;

  const userServiceMock = {
    currentUserId: of(0), // Provide a sample user ID
  };

  const backendServiceMock = {
    currentFilterStatus: of(true), // Provide a sample filter status
    showFilter: jasmine.createSpy('showFilter'),
    hideFilter: jasmine.createSpy('hideFilter'),
    logout: jasmine.createSpy('logout'),
    getCartPageData: jasmine.createSpy('getCartPageData'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HeaderAuthorizedComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: BackendService, useValue: backendServiceMock },
      ],
    });

    fixture = TestBed.createComponent(HeaderAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLogOut() and navigate to /main', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.onLogOut();
    expect(backendServiceMock.showFilter).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/main']);
    expect(backendServiceMock.logout).toHaveBeenCalled();
  });

  it('should hide filter, get cart page data, and navigate to /cart on onCartPage()', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.onCartPage();
    expect(backendServiceMock.hideFilter).toHaveBeenCalled();
    expect(backendServiceMock.getCartPageData).toHaveBeenCalledWith(0); // Check if the correct user ID is passed
    expect(routerSpy).toHaveBeenCalledWith(['/cart']);
  });

  it('should hide filter and navigate to /user on onUserPage()', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.onUserPage();
    expect(backendServiceMock.hideFilter).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/user']);
  });
});
