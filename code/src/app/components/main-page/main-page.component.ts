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
  private userId: number = -1;
  user: IUser
  private searchRequest: string | null;
  private typeId: number | null

  constructor(private backendService: BackendService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    console.log("constructor")
    this.searchRequest = this.activatedRoute.snapshot.paramMap.get('searchRequest');
    let tmp = this.activatedRoute.snapshot.paramMap.get('typeId')
    if (tmp != null) {
      this.typeId = parseInt(tmp)
    }
    this.loadList(this.searchRequest, this.typeId)
  }

  ngOnInit(): void {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentItems.subscribe((list) => (this.items = list))
    this.backendService.currentUser.subscribe((value) => this.user = value)
  }

  listIsEmpty() {
    return this.items.length == 0;
  }

  isAdmin() {
    return this.user.roleId == -3;
  }

  isDoctor() {
    return this.user.roleId == -2;
  }

  isNormal() {
    return this.user.roleId == -1;
  }

  notNull() {
    return (this.user != undefined) && this.user.id != 0
  }

  loadList(searchRequest: string | null, typeId: number | null) {
    if (searchRequest != null) {
      this.backendService.searchItem(searchRequest)
    }
    else if (typeId != null) {
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
