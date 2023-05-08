import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';

  signupForm = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    password: new FormControl(''),
    username: new FormControl(''),
    password_confirmation: new FormControl('')
  })


  // email: string = '';
  // password: string = '';

  // inject MatDialog to open dialog
  // inject SnackBar to show a message when the form is submitted successfully
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private dialogRef: MatDialogRef<SignupComponent>
    ) { }

  ngOnInit(): void {
  }

  // openSignupDialog method creates a new instance of SignupModalComponent & opens it using MatDialog
  openSignupDialog() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '350px',
      data: {}
    });

    // subscribe to afterClosed method of the dialog reference to get the results when dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }

  // onSubmit handles form submission & displays a snackBar message when the form is valid
  onSubmit() {
    const user = this.signupForm.value;

    this.authService.signupForm(user).subscribe((res:any)=>{
      console.log(res)

      // show a success message
      this.snackBar.open('Thanks for signing up!', '', { duration: 3000});

      // close the dialog
      this.dialogRef.close();
    })

    // if (this.signupForm.valid) {
    //   // handle form submission
    //   console.log(this.signupForm.value)
    //   this.snackBar.open('Thanks for signing up!', '', { duration: 3000});
    // }
  }

}
