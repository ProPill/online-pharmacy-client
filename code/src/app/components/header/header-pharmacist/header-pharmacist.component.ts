import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-pharmacist',
  templateUrl: './header-pharmacist.component.html',
  styleUrls: ['./header-pharmacist.component.css']
})
export class HeaderPharmacistComponent {
  @Input() onFilter: boolean
  @Output() onFilterChange = new EventEmitter<boolean>()
  constructor(private router: Router) {}
  onOpenPharmacistPage() {
    this.onFilter = false
    this.changeFilterStatus()
    this.router.navigate(['/pharmacist']);
  }

  onLogOut() {
    this.onFilter = true
    this.changeFilterStatus()
    this.router.navigate(['/main'])
  }

  changeFilterStatus() {
    this.onFilterChange.emit(this.onFilter);
  }
}
