import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Subject, tap } from 'rxjs';

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


  createEmployee(employee) {
    const token = this.authService.getToken();

    return this.http
      .post(this.baseApi + '/api/v1/employees', employee, {
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
