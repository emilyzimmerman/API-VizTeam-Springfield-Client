import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TeamsService } from '../shared/teams.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {
  error: boolean = false;

  teamFormgroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(
    private teamService: TeamsService,
    private dialogRef: MatDialogRef<AddTeamComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const newTeam = this.teamFormgroup.value;

    this.teamService.createTeam(newTeam).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dialogRef.close();
      },
      error: (errorRes) => {
        console.error('An error occurred', errorRes);
        this.error = true;
      },
    });
  }
}
