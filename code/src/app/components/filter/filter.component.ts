import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  title = 'Filter'
  selectedFilter = '';
  selectedFilterId: number;
  filters = ['noRecipeButton', 'recipeButton', 'specialButton'];
  @Input() hasAccess: boolean = false

  constructor(private router: Router) {
    this.hasAccess = true
    this.selectedFilterId = 0
    this.selectedFilter = ''
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    if (filter == this.filters[0])
    {
      this.selectedFilterId = -1;
    }
    if (filter == this.filters[1]) {
      this.selectedFilterId = -2;
    }
    else { this.selectedFilterId = -3 }
    this.changeColor()
    this.router.navigate(['/main'], {state: { typeId: this.selectedFilterId } })
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
