import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  token = this.authService.getToken();

  baseApi = environment.backendUrl


  fetchJobs() {
    return this.http.get(this.baseApi + '/api/v1/jobs', {
      headers: {
        Authorization: `Bearer ${this.token.value}`,
      },
    });
  }
}

