import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  memberFormgroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
  });

  constructor() { }



  ngOnInit(): void {
  }

  OnSubmit(){}

}
