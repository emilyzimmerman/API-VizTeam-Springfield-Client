import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/auth/user.service';
import { User } from '../models/user.model';
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

  onLogout() {
    this.authService.logout();
  }
}
