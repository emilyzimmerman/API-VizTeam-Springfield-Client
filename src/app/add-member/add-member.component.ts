import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MemberService } from '../shared/member.service';
import { TeamsService } from '../shared/teams.service';
import { JobsService } from '../shared/jobs.service';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  jobs: any = [];
  teams: any = [];
  employees: any = [];
  picSum: any = [];


  employeeFormgroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    job: new FormControl(''),
    team: new FormControl('')
  });







  constructor(private memberService: MemberService, private dialogRef: MatDialogRef<AddMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private teamsService: TeamsService, private jobsService: JobsService, private http:HttpClient) { }

  ngOnInit(): void {

    this.http.get('https://picsum.photos/v2/list?page=2&limit=100').subscribe((res:any) =>
    {
      console.log(res);
    })

    this.jobsService.fetchJobs().subscribe({
      next:(res:any)=>{
        console.log("Jobs Works", res)
        this.jobs = res.payload.jobs
      }
    })

    this.teamsService.fetchTeams().subscribe({
      next:(res:any)=>{
        console.log("Teams Works", res)
        this.teams = res.payload.teams
      }
    })


  }


  OnSubmit(){

  }



}
