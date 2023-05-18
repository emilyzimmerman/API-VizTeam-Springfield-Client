import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TeamsService } from '../shared/teams.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddTeamComponent } from '../add-team/add-team.component';
import { EditTeamComponent } from '../edit-team/edit-team.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedTeam: any;
  displayTeams: any = [];
  isLoading = true;
  panelOpenState = false;
  teamService: any;

  constructor(
    private teamsService: TeamsService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamsService.fetchTeams().subscribe((res: any) => {
      console.log(res.payload);
      if (res.success) {
        this.displayTeams = res.payload.teams;
        this.isLoading = false;
      }
    });

    //subscribe to get new teams
    this.teamsService.editTeamSubject.subscribe((updatedTeam: any) => {
      const index = this.displayTeams.findIndex(
        (team: any) => team.id === updatedTeam.id
      );
      if (index !== -1) {
        this.displayTeams[index] = updatedTeam;
      }
    });

    // subscribe to update teams
    this.teamService.editTeamSubject.subscribe((updatedTeam: any) => {
      // Handle the updated team, such as updating the displayTeams array or refreshing the team list
      console.log('Team updated:', updatedTeam);
      // Update the displayTeams array or refresh the team list
    });
  }

  onAddTeam() {
    this.matDialog.open(AddTeamComponent, {
      width: '500px',
    });
  }
  onEditTeam(team) {
    this.matDialog.open(EditTeamComponent, {
      width: '500px',
      data: {
        name: team.name,
        description: team.description,
        id: team.id,
      },
    });
  }
}
