import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamsService } from '../shared/teams.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss'],
})
export class EditTeamComponent implements OnInit {
  error: boolean = false;
  teamFormgroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamService: TeamsService
  ) {}

  ngOnInit(): void {
    this.teamFormgroup = new FormGroup({
      name: new FormControl(this.data.name),
      description: new FormControl(this.data.description),
    });

    this.teamService.editTeamSubject.subscribe((updatedTeam: any) => {
      // Handle the updated team, such as updating the displayTeams array or refreshing the team list
      console.log('Team updated:', updatedTeam);
    });
  }

  onSubmit() {
    const editedTeam = this.teamFormgroup.value;
    console.log(this.data.id);
    this.teamService.onUpdatedTeam(editedTeam, this.data.id).subscribe({
      next: (res: any) => {
        this.teamService.editTeamSubject.next(res.payload.team);
      },
    });
  }
}
