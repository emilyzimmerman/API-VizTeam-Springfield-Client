import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  token = this.authService.getToken();

  fetchJobs() {
    return this.http.get('http://localhost:3000/api/v1/jobs/', {
      headers: {
        Authorization: `Bearer ${this.token.value}`,
      },
    });
  }
}
