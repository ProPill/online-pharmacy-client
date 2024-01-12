import {Component, Input, Output} from '@angular/core';
import {items} from "../../data/items";
import {IItemQuantity} from "../../models/item_quantity";
import {IItem} from "../../models/item";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  @Input() items: IItem[] = items;
  @Output() itemsToOrder: IItemQuantity[];
  private userId: number = -1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(){
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
  }

  reloadList(doReload: boolean) {
    return this.items;
  }

  listIsEmpty() {
    return this.items.length == 0;
  }
}
