import { Component, OnInit } from '@angular/core';
// service to allow open and close dialog
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent implements OnInit {
  email: string = '';
  password: string = '';

  // injecting MatDialogRef to use to close dialog
  constructor(private dialogRef: MatDialogRef<SignupModalComponent>) { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.email, this.password)
  }

  //
  closeDialog() {
    this.dialogRef.close();
  }

}
