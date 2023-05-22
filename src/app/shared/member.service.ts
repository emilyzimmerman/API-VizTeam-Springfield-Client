import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  createEmployeeSubject = new Subject<any>();





  constructor(private http:HttpClient, private authService: AuthService) { }

  token = this.authService.getToken();

  baseApi = environment.backendUrl

  fetchEmployees() {
    return this.http.get(this.baseApi + '/api/v1/employees', {
      headers: {
        Authorization: `Bearer ${this.token.value}`,
      },
    });
  }

  fetchJobs() {
    return this.http.get(this.baseApi + '/api/v1/jobs', {
      headers: {
        Authorization: `Bearer ${this.token.value}`,
      },
    });
  }


  // createEmployee(employee) {
  //   const token = this.authService.getToken();

  //   return this.http
  //     .post(this.baseApi + '/api/v1/employees', employee, {
  //       headers: {
  //         Authorization: `Bearer ${token.value}`,
  //       },
  //     })
  //     .pipe(
  //       tap((res: any) => {
  //         if (res.success) {
  //           // emit the newly created team to the subscribers of createTeamSubject
  //           this.createEmployeeSubject.next(res.payload.team);
  //         }
  //       })
  //     );
  // }


}
