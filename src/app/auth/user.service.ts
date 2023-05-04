import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserSubject = new BehaviorSubject<User>(null);

  constructor() {}

  setCurrentUser(user: User) {
    //Fire off subject (or make the user class)
    this.currentUserSubject.next(user);
  }

  //get user value of the BehaviorSubject
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
