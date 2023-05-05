import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user.model';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  showHome = false;

  constructor(private http: HttpClient, private userService: UserService) {}

  login(user: any) {
    return this.http.post('http://localhost:3000/api/v1/users/login', user);
  }

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
          console.log(res.payload.user);
          this.userService.setCurrentUser(res.payload.user);
          //set showHome to true so it shows home component
          this.showHome = true;
        }
      });
    //send request to get user info
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
}
