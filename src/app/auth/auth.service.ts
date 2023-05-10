import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user.model';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})


export class AuthService {
  public loggedInSubject = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private userService: UserService) {}

  autoSignIn() {
    //get token from browser (already declared by getToken())
    const token = this.getToken();
    if (!token) {
      //go through normal flow (see sign in / login)
      return;
    }

    this.http
      .get('http://localhost:3000/api/v1/users/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.loggedInSubject.next(true);
          console.log(res.payload.user);
          this.userService.setCurrentUser(res.payload.user);
          //set showHome to true so it shows home component
        }
      });
    //send request to get user info
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  login(user: any) {
    return this.http.post('http://localhost:3000/api/v1/users/login', user);
  }

  logout() {
    const token = this.getToken();

    //send request to get rid of token to logout
    this.http
      .delete('http://localhost:3000/api/v1/users/logout', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.removeToken();
          this.userService.setCurrentUser(null);
        }
      });
    this.loggedInSubject.next(false);
  }

  //get token --> have to parse from JSON to typescript
  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

  setToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  signupForm(data: any): Observable<any>{
    return this.http.post('http://localhost:3000/api/v1/users/create', data)
  }

}
