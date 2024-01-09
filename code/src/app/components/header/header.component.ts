import {Component, Input} from "@angular/core";
import {IUser} from "../../models/user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @Input() user: IUser
  title = 'Header'
  searchRequest: string = ''
  onFilter: boolean = true

  constructor(private router: Router) {}

  showItems() {
    this.onFilter = true;
    this.router.navigate(['/main']);
    return this.searchRequest;
  }

  onMain() {
    this.router.navigate(['/main']);
  }
}
