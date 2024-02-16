import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { UserService } from '../../services/user.service';
import { BackendService } from '../../services/backend.service';
import { of } from 'rxjs';
import {users} from "../../data/users";
import {routes} from "../../routes/routes";
import {Router} from "@angular/router";
import {items} from "../../data/items";
import {IItem} from "../../models/item";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let userService: UserService;

  const EMPTY_REQUEST = '';
  const NOT_EMPTY_REQUEST = 'request';


  const userServiceMock = {
    currentUserId: of<number | null>(null),
    changeUserId: jasmine.createSpy('changeUserId').and.callThrough(),
    clearUserId: jasmine.createSpy('clearUserId').and.callThrough(),
  };

  const userWithRoleId2Mock = users[0]
  const userWithRoleId1Mock = users[1]
  const userWithRoleId3Mock = users[2]

  const backendServiceMock = {
    currentUser: of(null),
    currentSearchStatus: of(false),
    currentFilterStatus: of(false),
    showFilter: jasmine.createSpy('showFilter'),
    hideFilter: jasmine.createSpy('hideFilter'),
    changeItems: jasmine.createSpy('changeItems'),
    searchItem: jasmine.createSpy('searchItem'),
    getUserInfo: jasmine.createSpy('getUserInfo'),
    defaultItems: of([] as IItem[])
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HeaderComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: BackendService, useValue: backendServiceMock },
      ],
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call showFilter when searchItems is called with null request', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate').and.stub();
    component.searchRequest = EMPTY_REQUEST;
    component.searchItems();
    expect(backendServiceMock.showFilter).toHaveBeenCalled();
    expect(backendServiceMock.searchItem).toHaveBeenCalledWith(EMPTY_REQUEST);
    expect(navigateSpy).toHaveBeenCalledWith(['/main']);
  });

  it('should call showFilter when searchItems is called with not null request', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate').and.stub();
    component.searchRequest = NOT_EMPTY_REQUEST;
    component.searchItems();
    expect(backendServiceMock.showFilter).toHaveBeenCalled();
    expect(backendServiceMock.searchItem).toHaveBeenCalledWith(NOT_EMPTY_REQUEST);
    expect(navigateSpy).toHaveBeenCalledWith(['/main']);
  });

  it('should call showFilter when onMain is called', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate').and.stub();
    spyOn(component, 'reloadList');
    component.onMain();
    expect(backendServiceMock.showFilter).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/main']);
    expect(component.reloadList).toHaveBeenCalledWith(true);
  });

  it('should call showFilter and searchItem when changeFilterStatus is called with true', () => {
    component.changeFilterStatus(true);
    expect(backendServiceMock.showFilter).toHaveBeenCalled();
  });

  it('should call hideFilter when changeFilterStatus is called with false', () => {
    component.changeFilterStatus(false);
    expect(backendServiceMock.hideFilter).toHaveBeenCalled();
  });

  it('should return true for isAdmin when user role is -3', () => {
    component.user = userWithRoleId3Mock;
    const result = component.isAdmin();
    expect(result).toEqual(true);
  });

  it('should return false for isAdmin when user is null', () => {
    component.user = null;
    const result = component.isAdmin();
    expect(result).toEqual(false);
  });

  it('should return false for isAdmin when user role is not -3', () => {
    component.user = userWithRoleId1Mock;
    const result = component.isAdmin();
    expect(result).toEqual(false);
  });

  it('should return true for isDoctor when user role is -2', () => {
    component.user = userWithRoleId2Mock;
    const result = component.isDoctor();
    expect(result).toEqual(true);
  });

  it('should return false for isDoctor when user is null', () => {
    component.user = null;
    const result = component.isDoctor();
    expect(result).toEqual(false);
  });

  it('should return false for isDoctor when user role is not -2', () => {
    component.user = userWithRoleId1Mock;
    const result = component.isDoctor();
    expect(result).toEqual(false);
  });

  it('should return true for isNormal when user role is -1', () => {
    component.user = userWithRoleId1Mock;
    const result = component.isNormal();
    expect(result).toEqual(true);
  });

  it('should return false for isNormal when user is null', () => {
    component.user = null;
    const result = component.isNormal();
    expect(result).toEqual(false);
  });

  it('should return false for isNormal when user role is not -1', () => {
    component.user = userWithRoleId2Mock;
    const result = component.isNormal();
    expect(result).toEqual(false);
  });

  it('should return true for userNotNull when userId is not null and user is not null', () => {
    userServiceMock.currentUserId = of(userWithRoleId2Mock.id);
    component.ngOnInit();
    component.user = userWithRoleId2Mock;
    const result = component.userNotNull();
    expect(result).toBeTruthy();
  });

  it('should return false for userNotNull when userId is null', () => {
    userServiceMock.currentUserId = of(null)
    component.ngOnInit();
    component.user = userWithRoleId2Mock;
    const result = component.userNotNull();
    expect(result).toBeFalse();
  });

  it('should return false for userNotNull when user is null', () => {
    userServiceMock.currentUserId = of(userWithRoleId2Mock.id)
    component.ngOnInit();
    component.user = null;
    const result = component.userNotNull();
    expect(result).toEqual(false);
  });

  it('should call reloadList when onSearchInput is called', () => {
    spyOn(component, 'reloadList');
    component.searchRequest = 'non-empty';
    component.onSearchInput({} as Event);
    expect(component.reloadList).toHaveBeenCalledWith(true);
  });

  it('should call changeItems when reloadList id called'), () => {
    const list = [items[0], items[1]]
    backendServiceMock.defaultItems = of(list)
    component.reloadList(true);
    expect(backendServiceMock.changeItems).toHaveBeenCalledWith(list)
  }
});
