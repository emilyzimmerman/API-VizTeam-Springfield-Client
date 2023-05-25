import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  createEmployeeSubject = new Subject<any>();
  editEmployeeSubject = new Subject<any>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  token = this.authService.getToken();

  fetchEmployees() {
    return this.http.get('http://localhost:3000/api/v1/employees/', {
      headers: {
        Authorization: `Bearer ${this.token.value}`,
      },
    });
  }

  fetchJobs() {
    return this.http.get('http://localhost:3000/api/v1/jobs/', {
      headers: {
        Authorization: `Bearer ${this.token.value}`,
      },
    });
  }

  onUpdateMember(updatedMember, id) {
    const token = this.authService.getToken();
    return this.http
      .put(`http://localhost:3000/api/v1/employees/${id}`, updatedMember, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .pipe(
        tap((res: any) => {
          if (res.success) {
            this.editEmployeeSubject.next(res.payload.employee);
          }
        })
      );
  }

  deleteMember(id) {
    const token = this.authService.getToken();
    return this.http.delete(`http://localhost:3000/api/v1/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
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

  createEmployee(employee) {
    const token = this.authService.getToken();

    return this.http
      .post('http://localhost:3000/api/v1/employees/', employee, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .pipe(
        tap((res: any) => {
          if (res.success) {
            this.createEmployeeSubject.next(res.payload.employee);
          }
        })
      );
  }
}
