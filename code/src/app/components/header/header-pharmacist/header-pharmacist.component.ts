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
    this.router.navigate(['/pharmacist']);
    this.onFilter = false
    this.onFilterChange.emit(false);
  }

  onLogOut() {
    this.router.navigate(['/main'])
    this.onFilter = true
    this.onFilterChange.emit(true);  }
}
