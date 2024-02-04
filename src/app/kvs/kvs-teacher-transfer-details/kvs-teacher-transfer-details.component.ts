import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { TeacherAppPdfService } from 'src/app/kvs/makePdf/teacher-app-pdf.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-kvs-teacher-transfer-details',
  templateUrl: './kvs-teacher-transfer-details.component.html',
  styleUrls: ['./kvs-teacher-transfer-details.component.css']
})
export class KvsTeacherTransferDetailsComponent implements OnInit {
  displacementCountForm: FormGroup;
  transferCountForm: FormGroup;
  teacherPreviewUndertakingForm: FormGroup;
  kvCode: any;
  responseTcDcData:any;
  totaldaysPresent: number;
  dcStayAtStation: any;
  totaldaysPresentTc: any;
  dcPeriodAbsence: any;
  dcReturnStation: any;
  disabled = true;
  tcStayAtStation: any;
  tcPeriodAbsence: any;
  empTransferradioButton:any;
  showTcField: boolean = false;
  enableTransferFormYn: boolean = true;
  tcReturnStation: any;
  teacherrofileData:any;
  displayedColumns:any = ['sno', 'teacherId', 'tcPoint','dcPoint','transferFinalStatus','action'];
  testData =  { "sno": "", "teacherId": "", "teacherName": "", "teacherEmployeeCode":"","transferFinalStatus": "","dcTotalPoint":"","tcTotalPoint":""};
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('ConfirmBox', { static: true }) ConfirmBox: TemplateRef<any>;  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  teacherTransferList: any=[];
  tempTeacherId: any;
  user_name: any;
  schoolProfileFinalStatus:any;
  constructor(private _http:HttpClient,private pdfServive: TeacherAppPdfService,private router: Router,private datePipe:DatePipe,
    private modalService: NgbModal, private outSideService: OutsideServicesService,
    private route: ActivatedRoute, private fb: FormBuilder, private formData: FormDataService) {
    }

  ngOnInit(): void {
    this.displacementCountForm = new FormGroup({
      'kvCode': new FormControl(),
      'id': new FormControl(),
      'tcSaveYn': new FormControl(),
      'teacherId': new FormControl(),
      'transferId': new FormControl(),
      'teacherEmployeeCode': new FormControl(),
      'dcStayStationPoint': new FormControl(),//1
      'dcTenureHardPoint': new FormControl(),//3
      'dcPhysicalChallengedPoint': new FormControl(),//3     
      'dcMdDfGroungPoint': new FormControl(),
      'dcLtrPoint': new FormControl(),//5   
      'dcSinglePoint': new FormControl(),//6
      'dcSpousePoint': new FormControl(),//6    
      'dcRjcmNjcmPoint': new FormControl(),//7        
      'dcTotalPoint': new FormControl(),
    });
    this.transferCountForm = new FormGroup({
      'id': new FormControl(),
        'kvCode': new FormControl(),
        'teacherId': new FormControl(),
        'transferId': new FormControl(),
        'teacherEmployeeCode': new FormControl(),
        'tcStayStationPoint': new FormControl(),//1
        'tcTenureHardPoint': new FormControl(),//3
        'tcPhysicalChallengedPoint': new FormControl(),//3     
        'tcMdDfGroungPoint': new FormControl(),
        'tcLtrPoint': new FormControl(),//5   
        'tcSinglePoint': new FormControl(),//6
        'tcSpousePoint': new FormControl(),//6    
        'tcRjcmNjcmPoint': new FormControl(),//7        
        'tcTotalPoint': new FormControl(),
    });

    this.teacherPreviewUndertakingForm =  this.fb.group({
      "stationOne": new FormControl('', Validators.required),
      "stationTwo": new FormControl('', Validators.required),
      "stationThree": new FormControl('', Validators.required),
      "stationFour": new FormControl('', Validators.required),
      "stationFive": new FormControl('', Validators.required),
      "dcCountStatus": new FormControl('', Validators.required),
      "tcCountStatus": new FormControl('', Validators.required),
      "undertaking1": new FormControl('', Validators.required),
      "undertaking2": new FormControl('', Validators.required),
    
    });
    this.user_name = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.user_name;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.getTeacherTransferDetails();
  }
  getFormStatusV2(){
    var data ={
      "teacherId": this.tempTeacherId
    }
    this.outSideService.getFormStatusV2(data).subscribe((res) => {
     this.schoolProfileFinalStatus = res.response['profileFinalStatus']
    })
  }
  getTeacherTransferDetails(){
    var data = {
      "kvCode": this.kvCode,
      "inityear":'2024'
    }
    this.outSideService.getTransferProfileBySchool(data).subscribe((res)=>{
      console.log(res['response']);
      if(res['response'].length>0){
        for (let i = 0; i < res['response'].length; i++) {
          this.testData.sno = '' + (i + 1) + '';
          this.testData.teacherId = res['response'][i].teacherId;
          this.testData.teacherName = res['response'][i].teacherName;
          this.testData.teacherEmployeeCode = res['response'][i].teacherEmployeeCode;
          this.testData.transferFinalStatus = res['response'][i].transferFinalStatus;
          if(res['response'][i].dcSaveYn=='1'){
            this.testData.dcTotalPoint = res['response'][i].dcTotalPoint;
          }
         if(res['response'][i].tcSaveYn=='1'){
          this.testData.tcTotalPoint = res['response'][i].tcTotalPoint;
         }
        
          this.teacherTransferList.push(this.testData);
          this.testData = { "sno": "", "teacherId": "", "teacherName": "", "teacherEmployeeCode":"","transferFinalStatus": "","dcTotalPoint":"","tcTotalPoint":""};
        }
     console.log( this.teacherTransferList)
    }
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.teacherTransferList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100)
  },
  error => {
  Swal.fire({
    'icon':'error',
    'text':error.error
  }
  )
  })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  viewTeacherTransferProfile(teacherId:any,teacherName:any){
    debugger
    localStorage.setItem('transferteacherId', teacherId);
    localStorage.setItem('transferteacherName', teacherName);
    this.router.navigate(['/teacher/kvsTchMiscellaneous']);
  }

  confirmTransferProfile(teacherId:any,teacherName:any){
    this.modalService.open(this.ConfirmBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
    this.tempTeacherId=teacherId;
    this.getTcDcPointByTeacherIdAndInityearV2();
  }

  getTcDcPointByTeacherIdAndInityearV2(){
    var data ={
      "teacherId": this.tempTeacherId,
      "inityear":"2024"
    }
    this.outSideService.getTcDcPointByTeacherIdAndInityear(data).subscribe((res) => {
     this.responseTcDcData=res;
     this.totaldaysPresent = this.responseTcDcData.dcStayAtStation + this.responseTcDcData.dcReturnStation - this.responseTcDcData.dcPeriodAbsence
     this.totaldaysPresentTc = this.responseTcDcData.tcStayAtStation - this.responseTcDcData.tcPeriodAbsence
     this.dcStayAtStation = this.responseTcDcData.dcStayAtStation,
       this.dcPeriodAbsence = this.responseTcDcData.dcPeriodAbsence,
       this.dcReturnStation = this.responseTcDcData.dcReturnStation,
       this.tcStayAtStation = this.responseTcDcData.tcStayAtStation,
       this.tcPeriodAbsence = this.responseTcDcData.tcPeriodAbsence,
       this.tcReturnStation = this.responseTcDcData.tcReturnStation,
       this.displacementCountForm.patchValue({
           kvCode: this.kvCode,
           teacherId: this.tempTeacherId,
           dcStayStationPoint: this.responseTcDcData.dcStayStationPoint,
           dcTenureHardPoint: this.responseTcDcData.dcTenureHardPoint,
           dcPhysicalChallengedPoint: this.responseTcDcData.dcPhysicalChallengedPoint,
           dcMdDfGroungPoint: this.responseTcDcData.dcMdDfGroungPoint,
           dcLtrPoint: this.responseTcDcData.dcLtrPoint,
           dcRjcmNjcmPoint: this.responseTcDcData.dcRjcmNjcmPoint,
           dcTotalPoint: this.responseTcDcData.dcTotalPoint
       })
     this.transferCountForm.patchValue({
         kvCode: this.kvCode,
         teacherId: this.tempTeacherId,
         tcStayStationPoint: this.responseTcDcData.tcStayStationPoint,
         tcTenureHardPoint: this.responseTcDcData.tcTenureHardPoint,
         tcPhysicalChallengedPoint: this.responseTcDcData.tcPhysicalChallengedPoint,
         tcMdDfGroungPoint: this.responseTcDcData.tcMdDfGroungPoint,
         tcLtrPoint: this.responseTcDcData.tcLtrPoint,
         tcRjcmNjcmPoint: this.responseTcDcData.tcRjcmNjcmPoint,
         tcTotalPoint: this.responseTcDcData.tcTotalPoint
     })
     this.getTransferProfile();
    })
  }
  getTransferProfile() {
    debugger
    const data = {
       "teacherId": this.tempTeacherId,
       "inityear":"2024" 
      };
    this.outSideService.getTransferData(data).subscribe((res) => {
      console.log("------transfer data-----------------")
      console.log(res.response) 
      this.teacherrofileData=res.response
      this.teacherPreviewUndertakingForm.patchValue({
        stationOne:  res.response['choiceKv1StationName'],
        stationTwo:  res.response['choiceKv2StationName'],
        stationThree:  res.response['choiceKv3StationName'],
        stationFour:  res.response['choiceKv4StationName'],
        stationFive:  res.response['choiceKv5StationName'],
        dcCountStatus:  String(this.responseTcDcData.dcTotalPoint),
        tcCountStatus:  String(this.responseTcDcData.tcTotalPoint),
    });
      this.empTransferradioButton = res.response.applyTransferYn;
      debugger
      if (this.empTransferradioButton == null || this.empTransferradioButton == "" || this.empTransferradioButton == 0 || this.empTransferradioButton == '0') {
        this.disabled = true;
        this.showTcField =true;
      }
      if (this.empTransferradioButton == 1 || this.empTransferradioButton == '1') {
        this.disabled = false;
        this.showTcField =false;
      }
    })
  }
  onSubmitConfermation(){
    if(this.teacherPreviewUndertakingForm.value.undertaking1==false || this.teacherPreviewUndertakingForm.value.undertaking2==false ){
       Swal.fire({
         'icon':'error',
         'text':'Please check all fields!'
       })
       return false;
      }

    if(this.schoolProfileFinalStatus=='SP'){
      Swal.fire({
        icon: 'info',
        'text':'Your basic profile is yet to be verified by your controling officer. Please get it verified before proceeding further'
      })
      return false;
    }
    else {
    var data =  {
      "teacherId":this.responseTcDcData.teacherId,
      "teacherEmployeeCode":this.user_name,
      "totalTcCount":this.responseTcDcData.tcTotalPoint,
      "totalDcCount":this.responseTcDcData.dcTotalPoint,
      "stationNameChoice1":this.teacherrofileData.choiceKv1StationName,
      "stationNameChoice2":this.teacherrofileData.choiceKv2StationName,
      "stationNameChoice3":this.teacherrofileData.choiceKv3StationName,
      "stationNameChoice4":this.teacherrofileData.choiceKv4StationName,
      "stationNameChoice5":this.teacherrofileData.choiceKv5StationName,
      "stationCodeChoice1":this.teacherrofileData.choiceKv1StationCode,
      "stationCodeChoice2":this.teacherrofileData.choiceKv2StationCode,
      "stationCodeChoice3":this.teacherrofileData.choiceKv3StationCode,
      "stationCodeChoice4":this.teacherrofileData.choiceKv4StationCode,
      "stationCodeChoice5":this.teacherrofileData.choiceKv5StationCode
    }
    console.log(data);
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
        this.outSideService.confirmTransferBySchool(data).subscribe((res) => {
          this.modalService.dismissAll() 
          this.getTeacherTransferDetails();
          if (res) {
            Swal.fire(
              'Your transfer has been submitted  successfully.',
              '',
              'success'
            );
          }
      })
    }
    return false;
    },
    error => {
      Swal.fire({
        'icon':'error',
        'text':error.error
      }
      )
    })
    }
  }
}
