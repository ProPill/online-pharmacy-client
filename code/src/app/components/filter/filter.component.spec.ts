import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import {users} from "../../data/users";
import {IItem} from "../../models/item";
import {routes} from "../../routes/routes";
import {RouterTestingModule} from "@angular/router/testing";

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let router: Router;
  let userService: UserService;
  let backendService: BackendService;

  const userWithRoleId2Mock = users[0]
  const userWithRoleId1Mock = users[1]
  const userWithRoleId3Mock = users[2]

  const SOME_FILTER = 'someFilter'
  const NEW_FILTER = 'newFilter'
  const RECIPE_FILTER = 'recipeButton'

  const userServiceMock = {
    currentUserId: of<number | null>(null),
    changeUserId: jasmine.createSpy('changeUserId').and.callThrough(),
    clearUserId: jasmine.createSpy('clearUserId').and.callThrough(),
  };

  const backendServiceMock = {
    currentUser: of(null),
    currentSearchStatus: of(false),
    currentFilterStatus: of(false),
    getSpecialCategoryItemsList: jasmine.createSpy('getSpecialCategoryItemsList'),
    getItemsByType: jasmine.createSpy('getItemsByType'),
    defaultItems: of([] as IItem[])
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [FilterComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: BackendService, useValue: backendServiceMock },
      ],
    });

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);
    backendService = TestBed.inject(BackendService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set userId and user properties on ngOnInit', () => {
    component.ngOnInit();

    expect(component['userId']).toBeNull();
    expect(component.user).toBeNull()
  });

  it('should clear filter and call deactivateFilterButtonColor() when selectFilter() is called with same filter', () => {
    spyOn(component, 'deactivateFilterButtonColor');
    component.selectedFilter = SOME_FILTER;
    component.selectFilter(SOME_FILTER);
    fixture.detectChanges();

    expect(component.selectedFilter).toEqual('');
    expect(component.deactivateFilterButtonColor).toHaveBeenCalled()
  });

  it('should set filter but not filterId and call activateMethod and backendService when selectFilter() is called with a different filter and no user', () => {
    component.selectedFilter = SOME_FILTER;
    component.user = null
    spyOn(component, 'activateFilterButtonColor');

    component.selectFilter(NEW_FILTER);
    fixture.detectChanges()

    expect(component.selectedFilter).toEqual(NEW_FILTER);
    expect(component.selectedFilterId).toEqual(0);
    expect(component.activateFilterButtonColor).toHaveBeenCalled();
    expect(backendService.getItemsByType).toHaveBeenCalledWith(0);
  });

  it('should set filter and filterId and call activateMethod and backendService when selectFilter() is called with a different filter and no user', () => {
    component.selectedFilter = SOME_FILTER;
    component.user = null
    spyOn(component, 'activateFilterButtonColor');

    component.selectFilter(RECIPE_FILTER);
    fixture.detectChanges();

    expect(component.selectedFilter).toEqual(RECIPE_FILTER);
    expect(component.selectedFilterId).toEqual(-2);
    expect(component.activateFilterButtonColor).toHaveBeenCalled();
    expect(backendService.getItemsByType).toHaveBeenCalledWith(-2);
  });

  it('should set filter and do not call getSpecialty when selectFilter() is called with normal user', () => {
    component.selectedFilter = SOME_FILTER;
    component.user = userWithRoleId1Mock
    spyOn(component, 'activateFilterButtonColor');

    component.selectFilter(RECIPE_FILTER);
    fixture.detectChanges();

    expect(component.selectedFilter).toEqual(RECIPE_FILTER);
    expect(component.selectedFilterId).toEqual(-2);
    expect(backendService.getSpecialCategoryItemsList).not.toHaveBeenCalled()
    expect(component.activateFilterButtonColor).toHaveBeenCalled();
    expect(backendService.getItemsByType).toHaveBeenCalledWith(-2);
  });

  it('should set filter and call getSpecialty when selectFilter() is called with special user', () => {
    component.selectedFilter = SOME_FILTER;
    component.user = userWithRoleId2Mock
    spyOn(component, 'activateFilterButtonColor');

    component.selectFilter(RECIPE_FILTER);

    expect(component.selectedFilter).toEqual(RECIPE_FILTER);
    expect(component.selectedFilterId).toEqual(-2);
    expect(backendService.getSpecialCategoryItemsList).toHaveBeenCalledWith(component.user.specialityId as number);
    expect(component.activateFilterButtonColor).toHaveBeenCalled();
    expect(backendService.getItemsByType).toHaveBeenCalledWith(-2);
  });

  it('should activate filter button color for the selected filter', () => {
    const button1 = document.createElement('button');
    button1.setAttribute('name', 'noRecipeButton');
    button1.classList.add('button-color');

    const button2 = document.createElement('button');
    button2.setAttribute('name', 'recipeButton');
    button2.classList.add('button-color');

    document.body.appendChild(button1);
    document.body.appendChild(button2);

    component.selectedFilter = 'noRecipeButton';

    component.activateFilterButtonColor();

    expect(button1.classList.contains('active')).toBeTruthy();
    expect(button2.classList.contains('active')).toBeFalsy();

    document.body.removeChild(button1);
    document.body.removeChild(button2);
  });

  it('should deactivate filter button color for the selected filter', () => {
    spyOn(component.onReloadList, 'emit');

    const button1 = document.createElement('button');
    button1.setAttribute('name', 'noRecipeButton');
    button1.classList.add('button-color', 'active');
    document.body.appendChild(button1);

    component.selectedFilter = 'noRecipeButton';

    component.deactivateFilterButtonColor();

    expect(button1.classList.contains('active')).toBeFalsy();
    expect(component.onReloadList.emit).toHaveBeenCalledWith(true)

    document.body.removeChild(button1);
  });
});

