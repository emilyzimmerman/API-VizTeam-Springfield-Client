import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TeamsService } from '../shared/teams.service';


@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  teams: any = []

  memberFormgroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    job: new FormControl(''),
    team: new FormControl('')
  });

  constructor(private teamsService: TeamsService) { }



  ngOnInit(): void {

    this.teamsService.fetchTeams().subscribe({
      next: (res:any)=>{
        console.log("TeamsResponse", res)
        this.teams = res.payload.categories
      }
    })


  }
  

  OnSubmit(){

  }

}
