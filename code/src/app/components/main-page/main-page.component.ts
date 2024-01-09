import {Component, Output} from '@angular/core';
import {items} from "../../data/items";
import {IItemQuantuty} from "../../models/item_quantity";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})

export class MainPageComponent {
    protected readonly items = items;
    @Output() itemsToOrder: IItemQuantuty[]
}
