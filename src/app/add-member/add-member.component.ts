import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild, } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MemberService } from '../shared/member.service';
import { TeamsService } from '../shared/teams.service';
import { JobsService } from '../shared/jobs.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ImageData } from '../shared/models/image_data.interface';



@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  error: boolean = false;

  jobs: any = [];
  teams: any = [];
  employees: any = [];
  imgArray: ImageData[] = [];
  pageImages: ImageData[] = [];
  selectedImageIndex: number | null = null;
  selectedImageUrl: string | null = '/src/assets/images/default-picture.png';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  employeeFormgroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    job_id: new FormControl(''),
    team_id: new FormControl(''),
    pictureUrl: new FormControl(''),
  });


  constructor(private memberService: MemberService, private dialogRef: MatDialogRef<AddMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private teamsService: TeamsService, private jobsService: JobsService, private http:HttpClient) { }


  ngOnInit(): void {

    // this.http.get<ImageData[]>('https://picsum.photos/v2/list?limit=100').subscribe((res: ImageData[]) =>
    // {
    //   // console.log(res);
    //   this.imgArray = res;
    //   console.log(this.imgArray);
    // })

    this.jobsService.fetchJobs().subscribe({
      next:(res:any)=>{
        console.log("Jobs Works", res)
        this.jobs = res.payload.job
      }
    })

    this.teamsService.fetchTeams().subscribe({
      next:(res:any)=>{
        console.log("Teams Works", res)
        this.teams = res.payload.teams
      }
    })


  }

  fetchImages(): void{
    this.http.get<ImageData[]>('https://picsum.photos/v2/list?limit=100').subscribe((res:ImageData[])=>{
      this.imgArray = res;
      console.log(this.imgArray);
      this.updatePageImages();
    });
  }

  updatePageImages(): void{
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    this.pageImages = this.imgArray.slice(startIndex, endIndex);
  }

  ngAfterViewInit(): void{
    this.fetchImages();
  }

  handlePageEvent(event: PageEvent): void{
    this.selectedImageIndex = null;
    this.updatePageImages();
  }

  selectImage(index: number): void{
    this.selectedImageIndex = index;
    this.selectedImageUrl = this.pageImages[index].download_url;
  }


  onSubmit(){

    const newEmployee = this.employeeFormgroup.value;
    newEmployee.pictureUrl = this.selectedImageUrl;

    this.memberService.createEmployee(newEmployee).subscribe({
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



