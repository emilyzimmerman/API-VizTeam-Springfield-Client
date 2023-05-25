import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TeamsService } from '../shared/teams.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddTeamComponent } from '../add-team/add-team.component';
import { EditTeamComponent } from '../edit-team/edit-team.component';
import { DeleteTeamComponent } from '../delete-team/delete-team.component';
import { AddMemberComponent } from '../add-member/add-member.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { HttpClient } from '@angular/common/http';
import { MemberService } from '../shared/member.service';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedTeam: any;
  selectedEmployee: any;
  displayTeams: any = [];
  isLoading = true;
  panelOpenState = false;
  teamService: any;

  // teamCount: number = this.displayTeams.reduce((count: number, team: any) => count + team.members.length, 0);

  constructor(
    private teamsService: TeamsService,
    private matDialog: MatDialog,
    private http: HttpClient,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.teamsService.fetchTeams().subscribe((res: any) => {
      console.log('RES:', res.payload);
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

    // ...

    // subscribe to update members
    this.memberService.editEmployeeSubject.subscribe((updatedMember: any) => {
      for (const team of this.displayTeams) {
        const index = team.employees.findIndex(
          (employee: any) => employee.id === updatedMember.id
        );
        if (index !== -1) {
          team.employees[index] = updatedMember;
          break; // Exit the loop since we found and updated the member
        }
      }
    });

    // ...
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
    this.matDialog
      .open(DeleteTeamComponent, {
        width: '500px',
        data: {
          name: team.name,
          description: team.description,
          id: team.id,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res === 'deleted') {
          this.displayTeams = this.displayTeams.filter(
            (teamItem) => teamItem.id !== team.id
          );
          this.selectedTeam = null;
        }
      });
  }

  handleTeamDeleted() {
    this.displayTeams = this.displayTeams.filter(
      (t) => t.id !== this.selectedTeam.id
    );
    this.selectedTeam = null; // Reset the selected team if it was deleted
  }

  onAddMember() {
    this.matDialog.open(AddMemberComponent, {
      width: '500px',
    });
    this.http
      .get('https://picsum.photos/v2/list?page=2&limit=100')
      .subscribe((res: any) => {
        console.log(res);
      });
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

  onEditMember(employee) {
    this.matDialog.open(EditEmployeeComponent, {
      width: '500px',
      data: {
        first_name: employee.first_name,
        last_name: employee.last_name,
        job: employee.job.job_titles,
        team: employee.team.name,
        pictureUrl: employee.pictureUrl,
        id: employee.id,
      },
    });
  }

  onDeleteEmployee(employee) {
    this.matDialog
      .open(DeleteEmployeeComponent, {
        width: '500px',
        data: {
          first_name: employee.first_name,
          last_name: employee.last_name,
          job: employee.job.job_titles,
          team: employee.team.name,
          pictureUrl: employee.pictureUrl,
          id: employee.id,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res === 'deleted') {
          // Update the displayTeams array instead of selectedTeam.employees
          this.displayTeams.forEach((team) => {
            team.employees = team.employees.filter(
              (emp) => emp.id !== employee.id
            );
          });

          console.log('Updated displayTeams:', this.displayTeams);
          this.selectedEmployee = null;
        }
      });
  }

  handleEmployeeDeleted() {
    console.log('Employee deleted event received');
    // No need to update selectedTeam.employees here

    // Reset the selected employee if it was deleted
    this.selectedEmployee = null;
  }

  //Drag the image code
  onDragStart(event: DragEvent, employee: any) {
    // Set the data payload of the drag event
    event.dataTransfer?.setData('text/plain', employee.id);
  }

  onDragEnd(event: DragEvent) {
    // Perform any cleanup or additional logic after the drag operation ends
  }
}
