import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  token = this.authService.getToken();

  fetchTeams() {
    return this.http.get('http://localhost:3000/api/v1/teams/', {
      headers: {
        Authorization: `Bearer ${this.token.value}`,
      },
    });
  }
}
