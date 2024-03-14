import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherAppPdfService } from 'src/app/kvs/makePdf/teacher-app-pdf.service';
import { DataService } from '../service/internalService/data-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
declare const srvTime: any;
//declare const showHide:any;
@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  
})
export class LeaveManagementComponent implements OnInit {
  teacherLeaveForm: FormGroup;
  applicationId: any;
  loginUserNameForChild: any;
  kvicons: any;
  kvCode: any;
  tempTeacherId: any;
  leaveDataList: any;
  workExpId: any;
  teacherTypeDataNameCode: any = [];
  workExperienceArray: any = [];
  returnTypeSrvTime: any;
  maxDate:any;
  profileFinalStatus: boolean = false;
  transferGroundList: any;
  profileTeacherName: any;
  profileFinalStatusName:any;
  stationTypeCheckValue: any;
  startDate: any;
  endDate: any;
  stationCode: any;
  kvSchoolDetails: any;
  stationType1: any;
  stationTypeResponse: any;
  stationTypeNormal: any;
  disableNoOfLeaves: boolean = false;
  tl1: boolean = false;
  stationCatagory : number = 0;
 showHide: boolean = true;
  constructor(private pdfServive: TeacherAppPdfService,private router: Router,  private datePipe:DatePipe, private dataService: DataService,
    private modalService: NgbModal, private outSideService: OutsideServicesService,
    private route: ActivatedRoute, private fb: FormBuilder,private _adapter: DateAdapter<any>) {
    }
  ngOnInit(): void {
    this.returnTypeSrvTime = srvTime();
    var date = new Date(this.returnTypeSrvTime),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    this.maxDate =  [date.getFullYear(), mnth, day].join("-");
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    this.profileTeacherName=sessionStorage.getItem('profileTeacherName');
    this.teacherLeaveForm= this.fb.group({
      'leaveManagmentForm': new FormArray([]),
    });
    this.getLeaveManagementByTchId();
    this.getFormStatusV2();
    this.getSchoolDetailsByKvCode();
  
  }
  detailsOfPosting(): FormArray {
    return this.teacherLeaveForm.get("leaveManagmentForm") as FormArray
  }
  getFormStatusV2(){
    var data ={
      "teacherId": this.tempTeacherId
    }
    debugger
    this.outSideService.getFormStatusV2(data).subscribe((res)=>{
      if(res.response['profileFinalStatus']=='SP' || res.response['profileFinalStatus']=='' ||res.response['profileFinalStatus']==null){
        this.profileFinalStatus=true;
        this.profileFinalStatusName='Not Verified';
      //  showHide(false)
      }else{
        
        this.profileFinalStatus=false;
        this.profileFinalStatusName='Verified';
       // showHide(true);
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
  getLeaveManagementByTchId() {
    (this.teacherLeaveForm.controls['leaveManagmentForm'] as FormArray).clear();
    this.leaveDataList = [];
      var data={"teacherId": this.tempTeacherId}
      this.outSideService.getTeacherLeaveMaster(data).subscribe((res) => {
        this.leaveDataList = res.response;
        for (let i = 0; i < this.leaveDataList.length; i++) {
          debugger
          if(i==0){
            this.addFirstLeaveQuantity(this.leaveDataList[i])
          }else{
            this.addQuantity(this.leaveDataList[i])
          }
          
        }
      })
  }
  getSchoolDetailsByKvCode() {
    this.outSideService.fetchKvSchoolDetails(this.kvCode).subscribe((res) => {
      this.kvSchoolDetails = res.response;
      for (let i = 0; i < this.kvSchoolDetails.rowValue.length; i++) {
        this.stationCode = this.kvSchoolDetails.rowValue[i].station_code    
      }
    })
  }

  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;
     return((k >= 48 && k <= 57));
  }
  notGreate365(input:any, id:any) {
   console.log(input.target.value)
   if(((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').value==1){
    if(input.target.value<30){
      ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('noOfLeave').patchValue('');
    }
   }
  
    if (input.target.value > 365) {
      ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('noOfLeave').patchValue('');
    }
    if(id != 0) {
      if(((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('stationType').value==1){
        if(input.target.value<45){
          //alert(input.target.value)
          ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('noOfLeave').patchValue('');
        }
       }
    }

    



  }

  stationTypeCheck(input:any, id:any) {

    var startDate = ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('startDate').value
    var endDate = ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('endDate').value
    this.stationCatagory =  ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('stationType').value
    
    if(this.stationCatagory == 0 && (((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').value == 2 || ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').value == 3) ) {
      ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').patchValue('');
    
    }
    if(this.stationCatagory == 1 && (((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').value == 0 || ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').value == 1) ) {
      ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').patchValue('');
    }

    if(this.stationCatagory == 1){
   $(".ctln"+id).hide();
   $(".ctlh"+id).show();
    }else{
      $(".ctlh"+id).hide();
      $(".ctln"+id).show();
    }


    var data={
      "startDate": startDate,
      "endDate":endDate,
      "stationCode": this.stationCode,
      "category": this.stationCatagory
    }
    this.outSideService.checkStationType(data).subscribe((res) => {
      this.stationTypeResponse = res;
      this.stationTypeNormal = res.status
      console.log('STATION TYPEEEE', this.stationTypeResponse)
     //hard
      if(this.stationTypeNormal == 1) {
      //  this.disableNoOfLeaves = false
      ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('noOfLeave').enable();
       
    if(((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('stationType').value==1){
      if(input.target.value<45){
        ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('noOfLeave').patchValue('');
      }
     }
     $("#"+id).removeAttr("readonly");
     //normal
      } else if(this.stationTypeNormal == 0){
      
        $("#"+id).attr("readonly","true");
        ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('noOfLeave').patchValue('');
       // ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('noOfLeave').disable();
        Swal.fire(
          res.message,
          '',
          'error'
        )
      }
   }
    )
  }



  notGreate366(input:any, id:any) {
    debugger;


    if(this.stationCatagory == 0 && (((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').value == 2 || ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').value == 3) ) {
      ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').patchValue('');
    }
    if(this.stationCatagory == 1 && (((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').value == 0 || ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').value == 1) ) {
      ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').patchValue('');
    }
    console.log(input.target.value)
    if(((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('isContiniousLeave').value==1){
     if(input.target.value<30){
       ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('noOfLeave').patchValue('');
     }
    }
    

    if (input.target.value > 365) {
      ((this.teacherLeaveForm.get('leaveManagmentForm') as FormArray).at(id) as FormGroup).get('noOfLeave').patchValue('');
    }

    
   
   }


  addFirstLeaveQuantity(data){
    this.detailsOfPosting().push(this.newLeaveQuantity(data));
  }
  addQuantity(data) {
    this.detailsOfPosting().push(this.newQuantity(data));
  }
  newLeaveQuantity(data): FormGroup {
    console.log('NEW LEAVE QUANTITYYY',data)
    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        id :data.id,
        startDate: [data.startDate, [Validators.required]],
        endDate:data.endDate,
        stationType: [data.stationType,[Validators.required]],
        isContiniousLeave:'9',
        noOfLeave:  [data.noOfLeave,[Validators.required]],
      
      })
    } 
  }
  newQuantity(data): FormGroup {
    console.log('NEW QUANTITY DATAAAAAA',data)
    if (data != undefined) {
      return this.fb.group({
        teacherId: this.tempTeacherId,
        id :data.id,
        startDate: [data.startDate, [Validators.required]],
        endDate:data.endDate,
        stationType: [data.stationType,[Validators.required]],
        isContiniousLeave:[data.isContiniousLeave,[Validators.required]],
        noOfLeave:  [data.noOfLeave,[Validators.required]],
      
      })
    } 
  }

  previousPage(){
    this.router.navigate(['/teacher/workExperience']);
  }
   blank(value) {
    debugger
    return value === null || value === '';
  }
  onNextClick(){
  
    this.router.navigate(['/teacher/previewConfirm']);
  
}
onClearLeaveManagement(){
  var data = {"teacherId":this.tempTeacherId}
  if (this.teacherLeaveForm.controls.leaveManagmentForm.status == 'VALID') {
    Swal.fire({
      'icon':'warning',
      'text': "Are you sure you  want to delete data? ",
      'allowEscapeKey': false,
      'allowOutsideClick': false,
      'showCancelButton': true,
      'confirmButtonColor': "#DD6B55",
      'confirmButtonText': "Yes",
      'cancelButtonText': "No",
      'showLoaderOnConfirm': true,
    }
    ).then((isConfirm) => {
      if (isConfirm.value === true) {
        this.outSideService.deleteTeacherLeave(data).subscribe((res)=>{
      debugger
          console.log(res)
        
          var responsePosting = res.status;

          if (responsePosting == '1') {
            Swal.fire(
              'Your Data has been deleted Successfully!',
              '',
              'success'
            )
            this.getLeaveManagementByTchId();
          } else if (responsePosting == '0') {
            Swal.fire(
              'Something Went Wrong!',
              '',
              'error'
            )
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
    return false;
    });
  } else {
    Swal.fire(
      'Please enter the required data!',
      '', 
      'error'
    )
  }
}
  onSaveLeaveManagement(){
    debugger
    console.log(this.teacherLeaveForm.controls.leaveManagmentForm.value)
      if (this.teacherLeaveForm.controls.leaveManagmentForm.status == 'VALID') {
        Swal.fire({
          'icon':'warning',
          'text': "Do you want to proceed ?",
          'allowEscapeKey': false,
          'allowOutsideClick': false,
          'showCancelButton': true,
          'confirmButtonColor': "#DD6B55",
          'confirmButtonText': "Yes",
          'cancelButtonText': "No",
          'showLoaderOnConfirm': true,
        }
        ).then((isConfirm) => {
          if (isConfirm.value === true) {
            this.outSideService.saveTeacherLeave(this.teacherLeaveForm.controls.leaveManagmentForm.value).subscribe((res)=>{
          debugger
              console.log(res)
            
              var responsePosting = res.status;
   
              if (responsePosting == '1') {
                Swal.fire(
                  'Your Data has been saved Successfully!',
                  '',
                  'success'
                  
                )
                this.getLeaveManagementByTchId();
                this.router.navigate(['/teacher/previewConfirm']);
              } else if (responsePosting == '0') {
                Swal.fire(
                  'Some thing wen wrong!',
                  '',
                  'error'
                )
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
        return false;
        });
      } else {
        Swal.fire(
          'Please enter the required data!',
          '', 
          'error'
        )
      }
  }
}
