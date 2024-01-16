import {Component, Input, Output} from '@angular/core';
import {IItemQuantity} from "../../models/item_quantity";
import {IItem} from "../../models/item";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  items: IItem[];
  @Output() itemsToOrder: IItemQuantity[];
  private userId: number = -1;
  private searchRequest: string | null;
  private typeId: number | null

  constructor(private backendService: BackendService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.items = [];
    this.items = this.backendService.getNormalUserItemsList();
    let tmp = this.activatedRoute.snapshot.paramMap.get('typeId')
    if (tmp != null) {
      this.typeId = parseInt(tmp);
      this.items = this.backendService.getItemsByType(this.typeId);
    }

    window.addEventListener('load', () => {
      this.searchRequest = this.activatedRoute.snapshot.paramMap.get('searchRequest');
      let tmp = this.activatedRoute.snapshot.paramMap.get('typeId')
      if (tmp != null) {
        this.typeId = parseInt(tmp)
      }
      this.loadList(this.searchRequest, this.typeId)
    });
  }

  ngOnInit(): void {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
  }

  listIsEmpty() {
    return this.items.length == 0;
  }

  isAdmin() {
    return this.backendService.getUserInfo(this.userId).roleId == -3;
  }

  isDoctor() {
    return this.backendService.getUserInfo(this.userId).roleId == -2;
  }

  isNormal() {
    return this.backendService.getUserInfo(this.userId).roleId == -1;
  }

  loadList(searchRequest: string | null, typeId: number | null) {
    if (searchRequest != null) {
      this.items = this.backendService.searchItem(searchRequest);
    }
    else if (typeId != null) {
      this.items = this.backendService.getItemsByType(typeId);
    }
    else {
      if (this.isAdmin()) {
        this.items = this.backendService.getAllItemsList()
      }
      else if (this.isDoctor()) {
        this.items = this.backendService.getDoctorItemsList()
      }
      else {
        this.items = this.backendService.getNormalUserItemsList()
      }
      }
    }
}
