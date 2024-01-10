import {Component, Output} from '@angular/core';
import {items} from "../../data/items";
import {IItemQuantity} from "../../models/item_quantity";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})

export class MainPageComponent {
    protected readonly items = items;
    @Output() itemsToOrder: IItemQuantity[]
}
