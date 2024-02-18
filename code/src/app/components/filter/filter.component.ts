import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Router} from "@angular/router";
import {BackendService} from "../../services/backend.service";
import {UserService} from "../../services/user.service";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  private userId: number | null;
  user: IUser | null
  title = 'Filter'
  selectedFilter = '';
  selectedFilterId: number = 0;
  filters = ['noRecipeButton', 'recipeButton', 'specialButton'];
  @Input() hasAccess: boolean = false
  @Output() onReloadList = new EventEmitter<boolean>();


  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentUser.subscribe((value) => this.user = value)
  }

  selectFilter(filter: string) {
    if (this.selectedFilter == filter)
    {
      this.selectedFilter = ''
      this.deactivateFilterButtonColor()
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
      else if  (filter == this.filters[2]) {
        this.selectedFilterId = -3
      }
      if (this.user != null) {
        if (this.user.roleId == -2 && this.user.specialityId != null) {
          this.backendService.getSpecialCategoryItemsList(this.user.specialityId)
        }
      }
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
