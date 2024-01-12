import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userIdSource = new BehaviorSubject<number>(-1);
  currentUserId = this.userIdSource.asObservable();

  constructor() {}

  changeUserId(userId: number) {
    this.userIdSource.next(userId);
  }
}
