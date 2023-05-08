import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/auth/user.service';
import { User } from '../models/user.model';
import { SignupComponent } from 'src/app/signup/signup.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: User = null;
  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.currentUserSubject.subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  openForm() {
    this.matDialog.open(LoginComponent, {
      width: '350px',
    });
  }

  openSignupDialog() {
    const dialogRef = this.matDialog.open(SignupComponent, {
      width: '350px',
      data: {}
    });

    // subscribe to afterClosed method of the dialog reference to get the results when dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }


  onLogout() {
    this.authService.logout();
  }
}
