import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../services/user.service';
import { BackendService } from '../../../services/backend.service';
import { of } from 'rxjs';
import {users} from "../../../data/users";
import {routes} from "../../../routes/routes";
import {Router} from "@angular/router";
import {items} from "../../../data/items";
import {IItem} from "../../../models/item";
import {ItemComponent} from "./item.component";

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let router: Router;
  let userService: UserService;

  const EMPTY_REQUEST = '';
  const NOT_EMPTY_REQUEST = 'request';


  const userServiceMock = {
    currentUserId: of<number | null>(null),
    changeUserId: jasmine.createSpy('changeItem').and.callThrough(),
  };

  const userWithRoleId2Mock = users[0]
  const userWithRoleId1Mock = users[1]
  const userWithRoleId3Mock = users[2]

  const backendServiceMock = {
    currentUser: of(null),
    currentSearchStatus: of(false),
    currentFilterStatus: of(false),
    addToCartItem: jasmine.createSpy('addToCartItem'),
    defaultItems: of([] as IItem[])
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ItemComponent],
      providers: [
        {provide: UserService, useValue: userServiceMock},
        {provide: BackendService, useValue: backendServiceMock},
      ],
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


})
