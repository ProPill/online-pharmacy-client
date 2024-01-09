import {Component} from "@angular/core";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  title = 'Filter'
  selectedFilter = '';
  filters = ['Без рецепта', 'По рецепту', 'Специальные'];
  hasAccess: boolean = false

  constructor() {
    this.hasAccess = true
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    this.changeColor()
  }

  changeColor() {
    // Здесь будет код для изменения цвета кнопки по нажатию
  }
}
