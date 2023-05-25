import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobsService } from '../shared/jobs.service';
import { TeamsService } from '../shared/teams.service';
import { MemberService } from '../shared/member.service';

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
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
    private jobService: JobsService,
    private teamService: TeamsService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.employeeFormgroup = new FormGroup({
      first_name: new FormControl(this.data.first_name),
      last_name: new FormControl(this.data.last_name),
      job_id: new FormControl(this.data.job_id),
      team_id: new FormControl(this.data.team_id),
      pictureUrl: new FormControl(this.data.pictureUrl),
    });

    this.jobService.fetchJobs().subscribe({
      next: (res: any) => {
        console.log('JOBS', res);
        this.jobs = res.payload.job;
      },
      error: (error: any) => {
        this.error = true;
        // Handle error, such as displaying an error message
      },
    });

    this.teamService.fetchTeams().subscribe({
      next: (res: any) => {
        console.log('TEAMS EDIT', res);
        this.teams = res.payload.teams;
      },
      error: (error: any) => {
        this.error = true;
        // Handle error, such as displaying an error message
      },
    });

    this.memberService.editEmployeeSubject.subscribe((updatedMember: any) => {
      // Handle the updated team, such as updating the displayTeams array or refreshing the team list
      console.log('Member updated:', updatedMember);
    });
  }

  onSubmit() {
    const editedEmployee = this.employeeFormgroup.value;
    console.log(this.data.id);
    this.memberService.onUpdateMember(editedEmployee, this.data.id).subscribe({
      next: (res: any) => {
        this.memberService.editEmployeeSubject.next(res.payload.employee);
        this.dialogRef.close();
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
