import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherAppPdfService } from 'src/app/kvs/makePdf/teacher-app-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { FormDataService } from '../service/internalService/form-data.service';
import { DateAdapter } from '@angular/material/core';
import { DataService } from '../service/internalService/data-service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Component({
  selector: 'app-preview-confirm',
  templateUrl: './preview-confirm.component.html',
  styleUrls: ['./preview-confirm.component.css']
})
export class PreviewConfirmComponent implements OnInit {
  verifyTchTeacherProfileData: any;
  applicationId: any;
  loginUserNameForChild: any;
  kvicons: any;
  kvCode: any;
  responseData: any;
  tempTeacherId: any;
  kvSchoolDetails: any;
  stationNameCode: any;
  stationCode: any;
  kvNameCode: any;
  udiseSchCode: any;
  schName: any;
  stationName: any;
  flagUpdatedList: any;
 
  verifyTchTeacherWorkExp: any;
  teacherStationChioce: any;
  schoolDetails:any;
  verifyTchTeacherTraining: any;
  declaration1: boolean = false;
  declaration2: boolean = false;
  confirmEnable: boolean = false;
  profileTeacherName: any;
  constructor(private pdfServive: TeacherAppPdfService,private router: Router, private date: DatePipe, private dataService: DataService,
    private modalService: NgbModal, private outSideService: OutsideServicesService,
    private route: ActivatedRoute, private fb: FormBuilder, private formData: FormDataService, private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    this.profileTeacherName=sessionStorage.getItem('profileTeacherName');
    this.onVerifyClick();
  }
  teacherPdf() {
    this.onVerifyClick();
    setTimeout(() => {
      this.pdfServive.testFnc(this.verifyTchTeacherProfileData, this.kvNameCode, this.stationNameCode,
        this.verifyTchTeacherWorkExp, this.teacherStationChioce);
    }, 1000);

  }
  getSchoolDetailsByKvCode() {
    this.outSideService.fetchKvSchoolDetails(this.kvCode).subscribe((res) => {
      this.kvSchoolDetails = res.response;
      console.log("kv details")
      console.log(this.kvSchoolDetails)
      for (let i = 0; i < this.kvSchoolDetails.rowValue.length; i++) {
        this.stationNameCode = this.kvSchoolDetails.rowValue[i].station_name;
        this.stationNameCode = this.stationNameCode + "(" + this.kvSchoolDetails.rowValue[i].station_code + ")";
        this.stationCode = this.kvSchoolDetails.rowValue[i].station_code
        this.kvNameCode = this.kvSchoolDetails.rowValue[i].kv_name;
        this.kvNameCode = this.kvNameCode + "(" + this.kvSchoolDetails.rowValue[i].kv_code + ")";
        this.udiseSchCode = this.kvSchoolDetails.rowValue[i].udise_sch_code;
        this.schName = this.kvSchoolDetails.rowValue[i].kv_name;
        this.stationName = this.kvSchoolDetails.rowValue[i].station_name;
      }
    })
  }
  onVerifyClick() {
    this.outSideService.getUpdatedFlag(this.tempTeacherId).subscribe((res) => {
      this.flagUpdatedList = res.response
    }, error => {
    })
    this.outSideService.fetchConfirmedTchDetails(this.tempTeacherId).subscribe((res) => {
console.log("-----fetch confirm teacher details-------")
console.log(res.response)
    this.verifyTchTeacherProfileData = res.response.teacherProfile
    this.schoolDetails = res.response.schoolDetails
      this.verifyTchTeacherTraining = res.response.training
      for (let i = 0; i < res.response.experience.length; i++) {
        if (res.response.experience[i].workEndDate != null || res.response.experience[i].workEndDate != null) {
          res.response.experience[i].workEndDate = res.response.experience[i].workEndDate;
        }
        res.response.experience[i].workStartDate = res.response.experience[i].workStartDate;
      }
      this.verifyTchTeacherWorkExp = res.response.experience
    })
  }
  changeDateFormat(date: any){
    return moment(date).format('DD-MM-YYYY')
  }
  profileDeclaration(e, id) {
    if (e.target.checked) {
      if (id == '1') {
        this.declaration1 = true;
        if (this.declaration1 == true && this.declaration2 == true) {
          this.confirmEnable = true;
        }
      } else if (id == '2') {
        this.declaration2 = true;
        if (this.declaration1 == true && this.declaration2 == true) {
          this.confirmEnable = true;
        }
      }
    } else if (!e.target.checked) {
      if (id == '1') {
        this.declaration1 = false;
        this.confirmEnable = false;
      } else if (id == '2') {
        this.declaration2 = false;
        this.confirmEnable = false;
      }
    }
  }
  previousPage(){
    this.router.navigate(['/teacher/workExperience']);
  }
}
