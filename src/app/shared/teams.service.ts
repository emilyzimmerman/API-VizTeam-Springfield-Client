import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  createTeamSubject = new Subject<any>();
  editTeamSubject = new Subject<any>();
  constructor(private http: HttpClient, private authService: AuthService) {}

  token = this.authService.getToken();

  baseApi = environment.backendUrl

  fetchTeams() {
    return this.http.get(this.baseApi + '/api/v1/teams', {
      headers: {
        Authorization: `Bearer ${this.token.value}`,
      },
    });
  }

  createTeam(team) {
    const token = this.authService.getToken();

    return this.http
      .post(this.baseApi + '/api/v1/teams', team, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .pipe(
        tap((res: any) => {
          if (res.success) {
            // emit the newly created team to the subscribers of createTeamSubject
            this.createTeamSubject.next(res.payload.team);
          }
        })
      );
  }

  onUpdatedTeam(updatedteam, id) {
    const token = this.authService.getToken();

    return this.http
      .put(`http://localhost:3000/api/v1/teams/${id}`, updatedteam, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .pipe(
        tap((res: any) => {
          if (res.success) {
            this.editTeamSubject.next(res.payload.team);
          }
        })
      );
  }

  deleteTeam(id) {
    const token = this.authService.getToken();
    return this.http.delete(`http://localhost:3000/api/v1/teams/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  }
}
