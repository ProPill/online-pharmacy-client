import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  title = 'Filter'
  selectedFilter = '';
  filters = ['recipeButton', 'noRecipeButton', 'specialButton'];
  @Input() hasAccess: boolean = false

  constructor() {
    this.hasAccess = true
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    this.changeColor()
  }

  changeColor() {
    const buttons = document.querySelectorAll('.button-color');
    buttons.forEach(button => {
        button.classList.remove("active")
      if (this.selectedFilter == button.getAttribute('name')) {
        button.classList.add("active")
      }
    });
  }

}
