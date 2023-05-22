import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  error: boolean = false;
  employeeFormgroup;
  jobs: any = [];
  teams: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditEmployeeComponent>
  ) {}

  ngOnInit(): void {
    this.employeeFormgroup = new FormGroup({
      first_name: new FormControl(this.data.first_name),
      last_name: new FormControl(this.data.last_name),
      job: new FormControl(this.data.job),
    });

    //this.teamService.editTeamSubject.subscribe((updatedTeam: any) => {
    // Handle the updated team, such as updating the displayTeams array or refreshing the team list
    //console.log('Team updated:', updatedTeam);
    // });
  }

  onSubmit() {}
}
