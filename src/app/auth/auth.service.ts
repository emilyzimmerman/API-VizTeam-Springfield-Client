import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class AuthService {

  constructor(
    private http: HttpClient
  ){}

  login(user: any){
    return this.http.post('http://localhost:3000/api/v1/users/login', user);
  }

  signupForm(data: any): Observable<any>{
    return this.http.post('http://localhost:3000/api/v1/users/create', data)
  }

}
