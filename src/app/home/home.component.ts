import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TeamsService } from '../shared/teams.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { AddTeamComponent } from '../add-team/add-team.component';
import { AddMemberComponent } from '../add-member/add-member.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayTeams: any = [];
  isLoading = true;
  panelOpenState = false;

  // teamCount: number = this.displayTeams.reduce((count: number, team: any) => count + team.members.length, 0);

  constructor(
    private teamsService: TeamsService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamsService.fetchTeams().subscribe((res: any) => {
      console.log(res.payload);
      if (res.success) {
        // this.displayTeams = res.payload.teams;
        this.isLoading = false;
      }
    });

    //subscribe to get new teams
    this.teamsService.createTeamSubject.subscribe((team: any) => {
      this.displayTeams.push(team);
    });

    // fake data for teams
    this.displayTeams = [
      {
        name: 'Team 1',
        members: [
          {
          name: 'John Doe',
          pictureUrl: 'assets/images/default-picture.png' },
          {
            name: 'Jane Smith',
            pictureUrl: 'assets/images/default-picture.png',
          },
          {
            name: 'Mike Johnson',
            pictureUrl: 'assets/images/default-picture.png',
          },
          {
            name: 'Mac Paul',
            pictureUrl: 'assets/images/default-picture.png' },
          {
            name: 'Silly Sally',
            pictureUrl: 'assets/images/default-picture.png',
          },
          {
            name: 'Dill Bill',
            pictureUrl: 'assets/images/default-picture.png',
          },
          { name: 'Jo Blow', pictureUrl: 'assets/images/default-picture.png' },
          // { name: 'Jo Blow', pictureUrl: 'assets/images/default-picture.png' },
          // { name: 'Jo Blow', pictureUrl: 'assets/images/default-picture.png' },
          // { name: 'Jo Blow', pictureUrl: 'assets/images/default-picture.png' },
          // { name: 'Jo Blow', pictureUrl: 'assets/images/default-picture.png' },
          // { name: 'Jo Blow', pictureUrl: 'assets/images/default-picture.png' },
        ],
        description: 'This is Team 1 description',
      },

      {
        name: 'Team 2',
        members: [
          { name: 'Jim Bob', pictureUrl: 'assets/images/default-picture.png' },
          {
            name: 'Bob Wilson',
            pictureUrl: 'assets/images/default-picture.pn',
          },
          {
            name: 'Mike Jones',
            pictureUrl: 'assets/images/default-picture.png',
          },
        ],
        description: 'This is Team 2 description',
      },

      {
        name: 'Team 3',
        members: [],
      },

      {
        name: 'Team 4',
        members: [],
      },
    ];
  }

  onAddTeam() {
    this.matDialog.open(AddTeamComponent, {
      width: '500px',
    });
  }


 
  onAddMember(){
    this.matDialog.open(AddMemberComponent, {
      width: '500px',
    });
  }


  // addMemberToTeam(team: any) {
  //   // add member to the team
  //   team.members.push({ name: 'New Member', pictureUrl: 'default-picture.png'});

  //   // increment the team count
  //   // this.teamCount++;
  //   this.updateTeamCount();
  // }

  removeMemberFromTeam(member: any) {
    // remove the member from the team

    // decrement the team count
    this.updateTeamCount();
  }

  updateTeamCount() {
    this.displayTeams.forEach((team: any) => {
      team.teamCount = team.members.length
    });
  }

}
