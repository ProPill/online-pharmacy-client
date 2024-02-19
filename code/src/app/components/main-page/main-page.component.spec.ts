import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import {BackendService} from "../../services/backend.service";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../routes/routes";
import {items} from "../../data/items";
import {BehaviorSubject, Observable, of} from "rxjs";
import {IItem} from "../../models/item";
import {IUser} from "../../models/user";
import {users} from "../../data/users";
import {ItemComponent} from "./item/item.component";
import {ActivatedRoute} from "@angular/router";

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let activatedRoute: ActivatedRoute;

  const userIdNullMock = null;
  const itemsMock = [items[0], items[1]];
  const userWithRoleId1Mock = users[1]
  const SEARCH_REQUEST = 'searchRequest'

  let backendServiceMock: {
    showFilter: jasmine.Spy,
    currentItems: Observable<IItem[]>,
    currentUser: Observable<IUser>,
    getItemsByType: jasmine.Spy,
    getAllItemsList: jasmine.Spy,
    getDoctorItemsList:jasmine.Spy,
    getNormalUserItemsList: jasmine.Spy,
  };

  const userServiceMock = {
    currentUserId: new BehaviorSubject<number | null>(null),
  };

  const paramMapMock = {
    get: jasmine.createSpy('get')
  };

  paramMapMock.get.withArgs('searchRequest').and.returnValue(null);
  paramMapMock.get.withArgs('typeId').and.returnValue(null);

  const activatedRouteMock = {
    snapshot: {
      paramMap: paramMapMock,
    },
  };

  beforeEach(() => {
    backendServiceMock = {
      showFilter: jasmine.createSpy('showFilter'),
      currentItems: of(itemsMock),
      currentUser: of(userWithRoleId1Mock),
      getItemsByType: jasmine.createSpy('getItemsByType'),
      getAllItemsList: jasmine.createSpy('getAllItemsList'),
      getDoctorItemsList: jasmine.createSpy('getDoctorItemsList'),
      getNormalUserItemsList: jasmine.createSpy('getNormalUserItemsList'),
    }
    TestBed.configureTestingModule({
      declarations: [MainPageComponent, ItemComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
          {provide: BackendService, useValue: backendServiceMock},
        {provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    });
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct data on construction', () => {
    fixture = TestBed.createComponent(MainPageComponent);

    expect(paramMapMock.get).toHaveBeenCalledWith('searchRequest');
    expect(paramMapMock.get).toHaveBeenCalledWith('typeId');
    expect(component['searchRequest']).toBeNull();
    expect(component['typeId']).toBeNull();
    expect(backendServiceMock.showFilter).toHaveBeenCalled();
  });

  it('should initialize with user ID from UserService', () => {
    expect(component['userId']).toBeNull();
  });

  it('should call backendService.getItemsByType when typeId is provided', () => {
    component.loadList(null, 2);
    expect(backendServiceMock.getItemsByType).toHaveBeenCalledWith(2);
  });


  it('should call backendService.getAllItemsList for admin user', () => {
    spyOn(component, 'isAdmin').and.returnValue(true);
    component.loadList(null, null);
    expect(backendServiceMock.getAllItemsList).toHaveBeenCalledWith(true);
  });

  it('should call backendService.getDoctorItemsList for doctor user', () => {
    spyOn(component, 'isDoctor').and.returnValue(true);
    component.loadList(null, null);
    expect(backendServiceMock.getDoctorItemsList).toHaveBeenCalledWith(true);
  });

  it('should call backendService.getNormalUserItemsList for normal user', () => {
    spyOn(component, 'isNormal').and.returnValue(true);
    component.loadList(null, null);
    expect(backendServiceMock.getNormalUserItemsList).toHaveBeenCalledWith(true);
  });

  it('should return true when items array is empty on listIsEmpty', () => {
    component.firstLoad = false;
    component.items = [];

    const result = component.listIsEmpty();

    expect(result).toBeTrue();
  });

  it('should return false when items array is not empty on listIsEmpty', () => {
    component.firstLoad = false;
    component.items = itemsMock;

    const result = component.listIsEmpty();

    expect(result).toBeFalse();
  });

  it('should return false when user is null on isAdmin', () => {
    component.user = null;

    const result = component.isAdmin();

    expect(result).toBeFalse();
  });

  it('should return true when user has roleId -3 on isAdmin', () => {
    component.user = { roleId: -3 } as IUser;

    const result = component.isAdmin();

    expect(result).toBeTrue();
  });

  it('should return false when user has roleId other than -3 on isAdmin', () => {
    component.user = { roleId: -1 } as IUser;

    const result = component.isAdmin();

    expect(result).toBeFalse();
  });

  it('should return false when user is null on isDoctor', () => {
    component.user = null;

    const result = component.isDoctor();

    expect(result).toBeFalse();
  });

  it('should return true when user has roleId -2 on isDoctor', () => {
    component.user = { roleId: -2 } as IUser;

    const result = component.isDoctor();

    expect(result).toBeTrue();
  });

  it('should return false when user has roleId other than -2 on isDoctor', () => {
    component.user = { roleId: -1 } as IUser;

    const result = component.isDoctor();

    expect(result).toBeFalse();
  });

  it('should return false when user is null on isNormal', () => {
    component.user = null;

    const result = component.isNormal();

    expect(result).toBeFalse();
  });

  it('should return true when user has roleId -1 on isNormal', () => {
    component.user = { roleId: -1 } as IUser;
    const result = component.isNormal();

    expect(result).toBeTrue();
  });

  it('should return false when user has roleId other than -1 on isNormal', () => {
    component.user = { roleId: -2 } as IUser;

    const result = component.isNormal();

    expect(result).toBeFalse();
  });

  it('should return true when user is not null on notNull()', () => {
    component.user = { roleId: 1 } as IUser;

    const result = component.notNull();

    expect(result).toBe(true);
  });

  it('should return false when user is null on notNull()', () => {
    component.user = null;

    const result = component.notNull();

    expect(result).toBe(false);
  });

  it('should call getItemsByType when typeId is not null on loadList', () => {
    const typeId = 1;

    component.loadList(null, typeId);

    expect(backendServiceMock.getItemsByType).toHaveBeenCalledWith(typeId);
  });

  it('should call getAllItemsList when isAdmin is true on loadList', () => {
    spyOn(component, 'isAdmin').and.returnValue(true);

    component.loadList(null, null);

    expect(backendServiceMock.getAllItemsList).toHaveBeenCalledWith(true);
  });

  it('should call getDoctorItemsList when isDoctor is true on loadList', () => {
    spyOn(component, 'isDoctor').and.returnValue(true);

    component.loadList(null, null);

    expect(backendServiceMock.getDoctorItemsList).toHaveBeenCalledWith(true);
  });

  it('should call getNormalUserItemsList when notNull, isAdmin, and isDoctor are false on loadList', () => {
    spyOn(component, 'notNull').and.returnValue(true);
    spyOn(component, 'isAdmin').and.returnValue(false);
    spyOn(component, 'isDoctor').and.returnValue(false);

    component.loadList(null, null);

    expect(backendServiceMock.getNormalUserItemsList).toHaveBeenCalledWith(true);
  });

  it('should call getNormalUserItemsList when notNull is false on loadList', () => {
    spyOn(component, 'notNull').and.returnValue(false);

    component.loadList(null, null);

    expect(backendServiceMock.getNormalUserItemsList).toHaveBeenCalledWith(true);
  });
});
