import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Router} from "@angular/router";
import {BackendService} from "../../services/backend.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  private userId: number = -1;
  title = 'Filter'
  selectedFilter = '';
  selectedFilterId: number = 0;
  filters = ['noRecipeButton', 'recipeButton', 'specialButton'];
  @Input() hasAccess: boolean = false
  @Output() onReloadList = new EventEmitter<boolean>();


  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
  }

  selectFilter(filter: string) {
    if (this.selectedFilter == filter)
    {
      this.selectedFilter = ''
      this.deactivateFilterButtonColor()
      console.log(this.userId)
    }
    else {
      this.selectedFilter = filter;
      if (filter == this.filters[0])
      {
        this.selectedFilterId = -1;
      }
      else if (filter == this.filters[1]) {
        this.selectedFilterId = -2;
      }
      else { this.selectedFilterId = -3 }
      this.activateFilterButtonColor()
      this.backendService.getItemsByType(this.selectedFilterId)
    }
  }

  activateFilterButtonColor() {
    const buttons = document.querySelectorAll('.button-color');
    buttons.forEach(button => {
        button.classList.remove("active")
      if (this.selectedFilter == button.getAttribute('name')) {
        button.classList.add("active")
      }
    });
  }

  deactivateFilterButtonColor() {
    const buttons = document.querySelectorAll('.button-color');
    buttons.forEach(button => {
      button.classList.remove("active")
    });
    this.onReloadList.emit(true)
  }

}
