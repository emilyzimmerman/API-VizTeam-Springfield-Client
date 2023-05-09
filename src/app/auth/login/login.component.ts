import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  buttonDisabled = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const loginUser = this.loginForm.value;
    this.authService.login(loginUser).subscribe((res: any) => {
      if (res.success) {
        //if true, then set current user
        this.userService.setCurrentUser(res.payload.user);
        this.authService.setToken(res.payload.token);
      }
      console.log(res);
    });
  }
}
