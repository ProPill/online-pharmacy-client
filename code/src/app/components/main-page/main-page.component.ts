import {Component, Input, Output} from '@angular/core';
import {items} from "../../data/items";
import {IItemQuantity} from "../../models/item_quantity";
import {IItem} from "../../models/item";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {
  @Input() items: IItem[] = items;
  @Output() itemsToOrder: IItemQuantity[]

  constructor(private router: Router) {
  }

  reloadList(doReload: boolean) {
    return this.items
  }

  listIsEmpty()
  {
    return this.items.length == 0;
  }
}
