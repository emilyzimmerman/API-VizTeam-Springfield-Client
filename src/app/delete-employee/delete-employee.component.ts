import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberService } from '../shared/member.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss'],
})
export class DeleteEmployeeComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberService: MemberService,
    private dialogRef: MatDialogRef<DeleteEmployeeComponent>
  ) {}

  ngOnInit(): void {}

  onDeleteEmployee() {
    this.memberService.deleteMember(this.data.id).subscribe(
      (res: any) => {
        console.log('Successful delete');
        this.dialogRef.close('deleted');
      },
      (error: any) => {
        console.log('There was an error');
      }
    );
  }
}
