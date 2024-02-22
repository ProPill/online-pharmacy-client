import {CanActivate, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {IUser} from "../models/user";
import {UserService} from "../services/user.service";
import {BackendService} from "../services/backend.service";

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  private userId :number|null ;
  private user: IUser;
  constructor(private userService: UserService, private backendService: BackendService ,private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentUser.subscribe((value) => {
      if (value != null) {
        this.user = value
      }})
  }

  canActivate(): boolean {
    if (this.userId == null) {
      this.router.navigate(['/main']);
      return false;
    } else return true;
  }
}
