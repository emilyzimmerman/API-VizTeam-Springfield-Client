import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TeamsService } from '../shared/teams.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddTeamComponent } from '../add-team/add-team.component';
import { EditTeamComponent } from '../edit-team/edit-team.component';
import { DeleteTeamComponent } from '../delete-team/delete-team.component';
import { AddMemberComponent } from '../add-member/add-member.component';

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

  // teamCount: number = this.displayTeams.reduce((count: number, team: any) => count + team.members.length, 0);

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
    this.teamsService.createTeamSubject.subscribe((team: any) => {
      this.displayTeams.push(team);
      this.selectedTeam = null;
    });

    // subscribe to update teams
    this.teamsService.editTeamSubject.subscribe((updatedTeam: any) => {
      const index = this.displayTeams.findIndex(
        (team: any) => team.id === updatedTeam.id
      );
      if (index !== -1) {
        this.displayTeams[index] = updatedTeam;
      }
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

  onDeleteTeam(team) {
    this.matDialog.open(DeleteTeamComponent, {
      width: '500px',
      data: {
        name: team.name,
        description: team.description,
        id: team.id,
      },
    });
  }

  addMemberToTeam(team: any) {
    // add member to the team
    team.members.push({
      name: 'New Member',
      pictureUrl: 'default-picture.png',
    });

    // increment the team count
    // this.teamCount++;
    this.updateTeamCount();
  }

  removeMemberFromTeam(member: any) {
    // remove the member from the team

    // decrement the team count
    this.updateTeamCount();
  }

  updateTeamCount() {
    this.displayTeams.forEach((team: any) => {
      team.teamCount = team.members.length;
    });
  }
}
