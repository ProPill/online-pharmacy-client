import {Component, Input, Output} from '@angular/core';
import {IItemQuantity} from "../../models/item_quantity";
import {IItem} from "../../models/item";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {BackendService} from "../../services/backend.service";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  items: IItem[];
  @Output() itemsToOrder: IItemQuantity[];
  private userId: number | null;
  user: IUser | null
  private searchRequest: string | null;
  private typeId: number | null
  firstLoad: boolean = true

  constructor(private backendService: BackendService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentItems.subscribe((list) => (this.items = list))
    this.backendService.currentUser.subscribe((value) => this.user = value)
    this.searchRequest = this.activatedRoute.snapshot.paramMap.get('searchRequest');
    let tmp = this.activatedRoute.snapshot.paramMap.get('typeId')
    if (tmp != null) {
      this.typeId = parseInt(tmp)
    }
    this.backendService.showFilter()
    this.loadList(this.searchRequest, this.typeId)
  }

  ngOnInit(): void {
    if (this.userId != null)
    {
      this.backendService.getCartPageData(<number>this.userId)
    }
  }

  listIsEmpty() {
    if (this.firstLoad) {
      this.firstLoad = !this.firstLoad
      return false;
    }
    else {
      return this.items.length == 0
    }
  }

  isAdmin() {
    if (this.user != null) {
      return this.user.roleId == -3;
    }
    else return false
  }

  isDoctor() {
    if (this.user != null) {
      return this.user.roleId == -2;
    }
    else return false
  }

  isNormal() {
    if (this.user != null) {
      return this.user.roleId == -1;
    }
    else return false
  }

  notNull() {
    return (this.user != null)
  }

  loadList(searchRequest: string | null, typeId: number | null) {
    if (typeId != null) {
      this.backendService.getItemsByType(typeId)
    }
    else {
      if (this.notNull()) {
        if (this.isAdmin()) {
          this.backendService.getAllItemsList(true)
        }
        else if (this.isDoctor()) {
          this.backendService.getDoctorItemsList(true)
        }
        else {
          this.backendService.getNormalUserItemsList(true)
        }
      }
      else {
        this.backendService.getNormalUserItemsList(true)
      }
    }
  }
}
