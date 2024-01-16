import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userIdSource = new BehaviorSubject<number | null>(null);
  currentUserId = this.userIdSource.asObservable();

  constructor() {}

  changeUserId(userId: number) {
    this.userIdSource.next(userId);
  }

  clearUserId() {
    this.userIdSource.next(null)
  }
}
