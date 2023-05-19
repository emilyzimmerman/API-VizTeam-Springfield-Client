import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient, private authService: AuthService, private teamsService: TeamsService) { }

  token = this.authService.getToken();

  baseApi = environment.backendUrl


  


}
