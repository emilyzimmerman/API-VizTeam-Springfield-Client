import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamsService } from '../shared/teams.service';

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrls: ['./delete-team.component.scss'],
})
export class DeleteTeamComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamService: TeamsService
  ) {}

  ngOnInit(): void {}

  onDeleteTeam() {
    this.teamService.deleteTeam(this.data.id).subscribe(
      (res: any) => {
        console.log('Sucessful delete');
      },
      (error: any) => {
        console.log('there was an error');
      }
    );
  }
}
