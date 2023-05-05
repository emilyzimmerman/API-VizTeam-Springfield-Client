import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';
  // email: string = '';
  // password: string = '';

  // inject MatDialog to open dialog
  // inject SnackBar to show a message when the form is submitted successfully
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // openSignupDialog method creates a new instance of SignupModalComponent & opens it using MatDialog
  openSignupDialog() {
    const dialogRef = this.dialog.open(SignupModalComponent, {
      width: '350px',
      data: {}
    });

    // subscribe to afterClosed method of the dialog reference to get the results when dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }

  // onSubmit handles form submission & displays a snackBar message when the form is valid
  onSubmit(form: NgForm) {
    if (form.valid) {
      // handle form submission
      this.snackBar.open('Thanks for signing up!', '', { duration: 3000});
    }
  }


}
