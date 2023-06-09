import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn = false;
  constructor(private authService: AuthService) {
    this.authService.loggedInSubject.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });
  }

  ngOnInit(): void {
    this.authService.autoSignIn();
  }
}
