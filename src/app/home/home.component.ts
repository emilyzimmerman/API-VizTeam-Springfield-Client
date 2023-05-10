import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TeamsService } from '../shared/teams.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayTeams: any = [];
  isLoading = true;
  panelOpenState = false;
  constructor(private teamsService: TeamsService) {}
  ngOnInit(): void {
    this.teamsService.fetchTeams().subscribe((res: any) => {
      console.log(res.payload);
      if (res.success) {
        this.displayTeams = res.payload.teams;
        this.isLoading = false;
      }
    });
  }
}
