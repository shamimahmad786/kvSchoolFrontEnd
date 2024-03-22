import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OutsideServicesService } from '../service/outside-services.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherAppPdfService } from '../kvs/makePdf/teacher-app-pdf.service';
import { DatePipe } from '@angular/common';
import { FormDataService } from '../teacherEntryForm/service/internalService/form-data.service';
import { DateAdapter } from '@angular/material/core';
import { DataService } from '../service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-searchemployee',
  templateUrl: './searchemployee.component.html',
  styleUrls: ['./searchemployee.component.css']
})


export class SearchemployeeComponent implements OnInit {
  teacherPreviewConfirmForm: FormGroup;
  searchEmployeeForm: FormGroup;
  showFirstButtonColor: boolean = true;
  showsecondButtonColor: boolean = false;
  activePaneOne: boolean = true;
  activePaneTwo: boolean = false;
  dropBoxArray: any = [];
  searchDropData: any = [];
  dropBoxReasion:any;
  searchData: any;
  manualEmpCodeSearch: any = [];
  totalLength: any;
  tagInput: string = '';
  tags: string[] = [];
  
  verifyTchTeacherProfileData: any;
  applicationId: any;
  loginUserNameForChild: any;
  kvicons: any;
  kvCode: any;
  responseData: any;
  tempTeacherId: any;
  kvSchoolDetails: any;
  flagUpdatedList: any;
  verifyTchTeacherWorkExp: any;
  teschrLeaveDetails:any;
  teacherStationChioce: any;
  schoolDetails:any;
  verifyTchTeacherTraining: any;
  profileTeacherName: any;
  kvNameCode:any;
  stationNameCode:any;
  profileFinalStatus: boolean = false;
  token: any;
  exportProfileUrl: any;
  socialCat: string;
  socialSubCat: string;
  profileFinalStatusName:any;
  showEmployeeData: boolean = false
  emplyeeData: any;
  employeeCode: any;
 // displayedColumnsOut = ['sno','name','postName', 'subjectName','transferGround','relivingdate','To','action'];
 DropSource : MatTableDataSource<any>;
 dataSource : MatTableDataSource<any>;
 @ViewChild('dropPaginator') dropPaginator: MatPaginator;
 @ViewChild('paginator') paginator: MatPaginator;
 @ViewChild('dropSort') dropSort: MatSort;
  
 @ViewChild('dropSearchSort') dropSearchSort: MatSort;


  constructor(private outSideService: OutsideServicesService,
    private pdfServive: TeacherAppPdfService,private router: Router, private date: DatePipe, private dataService: DataService,
    private modalService: NgbModal, 
    private route: ActivatedRoute, private fb: FormBuilder, private formData: FormDataService, private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this.searchEmployeeForm = new FormGroup({
      'employeeCode': new FormControl(''),
    });

    this.teacherPreviewConfirmForm = this.fb.group({
      "teacherName": new FormControl('', Validators.required),
      "teacherGender": new FormControl('', Validators.required),
      "teacherDob": new FormControl('', Validators.required),
      "teacherEmplCode": new FormControl('', Validators.required),
      "teacherDisability": new FormControl('', Validators.required),
      "ExperienceStartDatePresentKv": new FormControl('', Validators.required),
      "workExperienceAppointedForSubject": new FormControl('', Validators.required),
      "lastPromotionPositionType": new FormControl('', Validators.required),
      "workExperiencePositionTypePresentStationStartDate": new FormControl('', Validators.required),
      "undertaking1": new FormControl('', Validators.required),
      "undertaking2": new FormControl('', Validators.required),
    });

  
    this.exportProfileUrl=environment.BASE_URL_DATA_REPORT
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
 
    this.profileTeacherName=sessionStorage.getItem('profileTeacherName');
   

    this.token =JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token;

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    } 
        
    
  }

  getFormStatusV2(){
    var data ={
      "teacherId": this.tempTeacherId
    }
   
    this.outSideService.getFormStatusV2(data).subscribe((res)=>{
      if(res.response['profileFinalStatus']=='SP' || res.response['profileFinalStatus']=='' ||res.response['profileFinalStatus']==null){
        this.profileFinalStatus=true;
        this.profileFinalStatusName='Not Verified';
       }
       else{
        this.profileFinalStatus=false;
        this.profileFinalStatusName='Verified';
       }
  },
  error => {
    Swal.fire({
      'icon':'error',
      'text':error.error
    }
    )
  })
  }


  getTeacherConfirmationV2(){
    var data={
      "teacherId":this.tempTeacherId}
    this.outSideService.getTeacherConfirmationV2(data).subscribe((res)=>{
      if(res){
        this.teacherPreviewConfirmForm.patchValue({
          teacherName:  res.response['teacherName'],
          teacherGender:  res.response['teacherGender'],
          teacherDob:  res.response['teacherDob'],
          teacherEmplCode:  res.response['teacherEmployeeCode'],
          teacherDisability:  res.response['teacherDisabilityYn'],
          ExperienceStartDatePresentKv:  res.response['workExperienceWorkStartDatePresentKv'],
          workExperienceAppointedForSubject:  res.response['workExperienceAppointedForSubject'],
          lastPromotionPositionType:  res.response['lastPromotionPositionType'],
          workExperiencePositionTypePresentStationStartDate:  res.response['workExperiencePositionTypePresentStationStartDate']
      });
      }
  },
  error => {
    Swal.fire({
      'icon':'error',
      'text':error.error
    }
    )
  })
  }

  previousPage(){
    this.router.navigate(['/teacher/searchEmployee']);
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === ',' && this.tagInput.trim() !== '') { 
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      var format1 = /[0-9]/;
      if( this.tagInput.match(format1) ){
        event.preventDefault(); // Prevent adding comma to the input
        const newTags = this.tagInput.split(',').map(tag => tag.trim());
        this.tags = [...this.tags, ...newTags];
        console.log(this.tags)
        this.tagInput = ''; // Clear the input field after adding tags
      }
    }
   
  }
 
  clear(){
    this.showEmployeeData = false;
    this.tags=[];
    this.searchDropData=[];
    this.totalLength ='';
    this.dataSource = new MatTableDataSource(this.searchDropData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.dropSearchSort;
    this.searchEmployeeForm.patchValue({
      employeeCode: '',
      
  });
}
submit(){
  console.log('Testtttttt Ashish     ',this.teacherPreviewConfirmForm.value)

  if (this.searchEmployeeForm.invalid) {
    Swal.fire({
      'icon':'error',
      'text':'Invalid employee code!'
    })
    return false;
     }
     else{
      var data={
        "teacherEmployeeCode":this.searchEmployeeForm.value.employeeCode
       }
         this.outSideService.getEmployeeDetailV2(data).subscribe((res)=>{
           debugger
         this.emplyeeData=res.response
         
         this.tempTeacherId = this.emplyeeData['teacherId']
         console.log('TEACHER IDDDD ----->>>.', this.tempTeacherId)

         this.outSideService.fetchConfirmedTchDetails(this.tempTeacherId).subscribe((res) => {
          debugger
       
        this.verifyTchTeacherProfileData = res.response.teacherProfile;
        //alert(JSON.stringify(this.verifyTchTeacherProfileData))
        console.log(this.verifyTchTeacherProfileData);
        if(this.verifyTchTeacherProfileData['socialCategories']=='1'){
          this.socialCat='GENERAL';
        }
        if(this.verifyTchTeacherProfileData['socialCategories']=='2'){
          this.socialCat='OBC';
        }
        if(this.verifyTchTeacherProfileData['socialCategories']=='3'){
          this.socialCat='SC';
        }
        if(this.verifyTchTeacherProfileData['socialCategories']=='4'){
          this.socialCat='ST';
        }
        if(this.verifyTchTeacherProfileData['socialSubCategories']=='1'){
          this.socialSubCat='NON EWS';
        }
        if(this.verifyTchTeacherProfileData['socialSubCategories']=='2'){
          this.socialSubCat='EWS';
        }
        if(this.verifyTchTeacherProfileData['socialSubCategories']=='0' || this.verifyTchTeacherProfileData['socialSubCategories']==null){
          this.socialSubCat='NA';
        }
        this.schoolDetails = res.response.schoolDetails;
       // alert(JSON.stringify(this.schoolDetails))
        this.kvNameCode = this.schoolDetails.kvName+' '+this.schoolDetails.kvCode;
        this.stationNameCode= this.schoolDetails.stationName+' '+this.schoolDetails.stationCode;
        this.verifyTchTeacherTraining = res.response.training;
       // alert(JSON.stringify(this.verifyTchTeacherTraining))
      
          for (let i = 0; i < res.response.experience.length; i++) {
            if (res.response.experience[i].workEndDate != null || res.response.experience[i].workEndDate != null) {
              res.response.experience[i].workEndDate = res.response.experience[i].workEndDate;
            }
            res.response.experience[i].workStartDate = res.response.experience[i].workStartDate;
          }
          this.verifyTchTeacherWorkExp = res.response.experience;
          this.teschrLeaveDetails=res.response.teacherLeave;
    
        })
          this.showEmployeeData = true;
         
            this.getFormStatusV2();
          
     })
     }
}

}
