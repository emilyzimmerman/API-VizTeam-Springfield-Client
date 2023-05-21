import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamsService } from '../shared/teams.service';

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrls: ['./delete-team.component.scss'],
})
export class DeleteTeamComponent implements OnInit {
  @Output() teamDeleted = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamService: TeamsService,
    private dialogRef: MatDialogRef<DeleteTeamComponent>
  ) {}

  ngOnInit(): void {}

  onDeleteTeam() {
    this.teamService.deleteTeam(this.data.id).subscribe(
      (res: any) => {
        console.log('Sucessful delete');
        this.dialogRef.close('deleted');
      },
      (error: any) => {
        console.log('there was an error');
      }
    );
  }
}
