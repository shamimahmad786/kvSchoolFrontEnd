import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { DataService } from '../service/internalService/data-service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { TeacherAppPdfService } from 'src/app/kvs/makePdf/teacher-app-pdf.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BasicProfile } from 'src/app/basic-profile';
declare const srvTime: any;
interface SubjectData {
  subNameCode: string;
  subjectCode: string;
}
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
@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BasicProfileComponent implements OnInit {
  maxDate: any;
  applicationId: any;
  basicProfileForm: FormGroup;
  kvicons: any;
  kvCode: any;
  kvSchoolDetails: any;
  stationNameCode: any;
  stationCode: any;
  kvNameCode: any;
  udiseSchCode: any;
  schName: any;
  stationName: any;
  subjectListNameCode: any[] = [];
  teacherTypeDataNameCode: any = [];
  documentUploadArray: any[] = [];
  regionList: any[] = [];
  stationList: any[] = [];
  formStatusLocale:any;
  marriedStatusYN: boolean = false;
  fileUppositionHeld: boolean = true;
  spouseNone: boolean = false;
  fileUpgkFilebenefit: boolean = true;
  fileUpload: boolean = true;
  selectedSpouseStation:any;
  enableUploadButton4: boolean = false;
  deleteDocUpdate4: boolean = true;
  spouseKVSStation: boolean = false;
  teacherTypeData: any;
  subjectList: any;
  spouseTypeData: any;
  responseData:any;
  flagUpdatedList: any;
  tempTeacherId: any;
  loginUserNameForChild: any;
  districListByStateIdC: any;
  districListByStateIdP: any;
  stateMasterList: any;
  isVisible: boolean = false;
  isVisibleBirth: boolean = false;
  formDataList: any;
  transferGroundList: any;
  employeeCode: any;
  emplyeeData: any;
  returnTypeSrvTime: any;
  stateId: any;
  profileTeacherName: any;
  teacherDisabilityType: any;
  businessUnitTypeCode: any;
  profileFinalStatus: boolean = false;
  currentAddress:BasicProfile = {corressPondAdd: '', state: '', district: '', zipCode: ''};
  permanentAddress: BasicProfile = {corressPondAdd: '', state: '', district: '', zipCode: ''};;
  copyAdd: boolean = false;

  @ViewChild('Physically_Handicap_Certificate')Physically_Handicap_Certificate: ElementRef;
  @ViewChild('selectSpouseStationModal', { static: true }) selectSpouseStationModal: TemplateRef<any>;
  constructor(private _http:HttpClient,private pdfServive: TeacherAppPdfService,private router: Router,private datePipe:DatePipe, private dataService: DataService,
  private modalService: NgbModal, private outSideService: OutsideServicesService,
  private route: ActivatedRoute, private fb: FormBuilder, private formData: FormDataService, private _adapter: DateAdapter<any>) {
  }
  ngOnInit(): void {
    this.formDataList = this.formData.formData();
    this.transferGroundList = this.formDataList.transferGround
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      this.businessUnitTypeCode= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_code;
    }
    const dtToday = new Date();
    let month = String(dtToday.getMonth() + 1);
    let day = String(dtToday.getDate());
    let year = dtToday.getFullYear();
    if (parseInt(month, 10) < 10) {
      month = '0' + month.toString();
    }
    if (parseInt(day, 10) < 10) {
      day = '0' + day.toString();
    }
    this.returnTypeSrvTime = srvTime();
    var date = new Date(this.returnTypeSrvTime),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day1 = ("0" + date.getDate()).slice(-2);
    this.maxDate =  [date.getFullYear(), mnth, day1].join("-");
    this.basicProfileForm = this.fb.group({
      'empCode': new FormControl('', [Validators.required, Validators.pattern("[0-9]*$")]),
      'fullName': new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z ]*$")]),
      'gender': new FormControl('', Validators.required),
      'dob': new FormControl('', [Validators.required, this.dateDifferenceFnc.bind(this)]),
      'mobile': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[8976][0-9]{9}")]),
      'email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      'presentStationName': new FormControl('', Validators.required),
      'presentKvName': new FormControl('', Validators.required),
      'presentPostName': new FormControl('', Validators.required),
      'presentSubjectName': new FormControl('', Validators.required),
      'staffType': new FormControl('', Validators.required),
      'specialRecruitmentYn': new FormControl('', Validators.required),
      'lastPromotionPositionDate': new FormControl('', Validators.required),
      'kvCode': new FormControl(''),
      'spouseStationCode': new FormControl(''),
      'disabilityYN': new FormControl('', Validators.required),
      'disabilityType': new FormControl('', Validators.required),
      'maritalStatusF': new FormControl('', Validators.required),
      'crspndncAddress': new FormControl('', Validators.required),
      'crspndncState': new FormControl('', Validators.required),
      'crspndncDistrict': new FormControl('', Validators.required),
      'crspndncPinCode': new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]),
      'prmntAddress': new FormControl('', Validators.required),
      'prmntState': new FormControl('', Validators.required),
      'prmntDistrict': new FormControl('', Validators.required),
      'spouseName': new FormControl('', Validators.required),
      'spouseEmpCode': new FormControl('', Validators.required),
      'spousePost': new FormControl('', Validators.required),
      'spouseStatusF': new FormControl('', Validators.required),
      'spouseStationName': new FormControl('', Validators.required),
      'prmntPinCode': new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]),
       'copyAddress': new FormControl(false)
    });
    if(sessionStorage.getItem('newEntryStatus')!='New'){
      this.employeeCode=sessionStorage.getItem('newEntryStatus');
     this.getEmployeeData()
    }
    this.getAllMaster();
    this.getSchoolDetailsByKvCode();
    this.getStateMaster();

  }

  omit_special_char(event)
  {
     var k;
     k = event.charCode;
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32);
  }

  omit_special_char_sEmpId(event)
  {   
     var k;  
     k = event.charCode;
     return((k >= 48 && k <= 57)); 
  }  
  copyCurrentAdd() {
    
    let copyAddress = this.basicProfileForm.get('copyAddress')?.value;
    if(copyAddress) {
      let corresPondAdd = this.basicProfileForm.get('crspndncAddress')?.value
      let corresPondState = this.basicProfileForm.get('crspndncState')?.value
      let corresPondDistrict = this.basicProfileForm.get('crspndncDistrict')?.value
      let corresPondPinCode = this.basicProfileForm.get('crspndncPinCode')?.value
      this.basicProfileForm.patchValue({
        prmntAddress: corresPondAdd,
        prmntState: corresPondState,
        prmntDistrict: corresPondDistrict,
        prmntPinCode: corresPondPinCode
      })
      this.getDistrictListByStateIdSameasAbove(corresPondState, 'P')
    this.copyAdd = true
    } else {
     this.basicProfileForm.patchValue({
      prmntAddress: '',
      prmntState: '',
      prmntDistrict: '',
      prmntPinCode: ''
     })
    }
  }

  getFormStatusV2(){
    var data ={
      "teacherId": this.emplyeeData['teacherId']
    }

    this.outSideService.getFormStatusV2(data).subscribe((res)=>{
      if(res.response['profileFinalStatus']=='SP' || res.response['profileFinalStatus']=='' ||res.response['profileFinalStatus']==null){
        this.profileFinalStatus=true;
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
  getEmployeeData(){
    var data={
     "teacherEmployeeCode":this.employeeCode
    }
      this.outSideService.getEmployeeDetailV2(data).subscribe((res)=>{
      this.emplyeeData=res.response;
      if(res){
        this.basicProfileForm.patchValue({
          fullName:  this.emplyeeData['teacherName'],
          gender: this.emplyeeData['teacherGender'],
          dob: this.emplyeeData['teacherDob'],
          empCode:this.emplyeeData['teacherEmployeeCode'],
          mobile: this.emplyeeData['teacherMobile'],
          email: this.emplyeeData['teacherEmail'],
          prmntAddress: this.emplyeeData['teacherPermanentAddress'],
          prmntState: this.emplyeeData['teacherParmanentState'],
          prmntDistrict: this.emplyeeData['teacherPermanentDistrict'] ,
          prmntPinCode: this.emplyeeData['teacherPermanentPin'],
          crspndncAddress: this.emplyeeData['teacherCorrespondenceAddress'],
          crspndncState: this.emplyeeData['teacherCorrespondenceState'],
          crspndncDistrict: this.emplyeeData['teacherCorrespondenceDistrict'],
          crspndncPinCode: this.emplyeeData['teacherCorrespondencePin'],
          disabilityYN: this.emplyeeData['teacherDisabilityYn'],
          disabilityType: this.emplyeeData['teacherDisabilityType'],
          presentPostName:this.emplyeeData['lastPromotionPositionType'],
          lastPromotionPositionDate: this.emplyeeData['lastPromotionPositionDate'],
          presentSubjectName: this.emplyeeData['workExperienceAppointedForSubject'],
          staffType: this.emplyeeData['teachingNonteaching'],
          spouseStatusF:this.emplyeeData['spouseStatus'],
          spouseEmpCode:this.emplyeeData['spouseEmpCode'],
          spouseName:this.emplyeeData['spouseName'],
          spousePost:this.emplyeeData['spousePost'],
          spouseStationName:this.emplyeeData['spouseStationName'],
          spouseStationCode:this.emplyeeData['spouseStationCode'],
          maritalStatusF:this.emplyeeData['maritalStatus'],
          specialRecruitmentYn: this.emplyeeData['specialRecruitmentYn'],
      });
      sessionStorage.setItem('kvTeacherId',this.emplyeeData['teacherId'])
      this.profileTeacherName= this.emplyeeData['teacherName']
      this.getDistrictByStateId(this.emplyeeData['teacherParmanentState'],'P');
      this.getDistrictByStateId(this.emplyeeData['teacherCorrespondenceState'],'C');


      if (this.emplyeeData['maritalStatus'] == '1' || this.emplyeeData['maritalStatus'] == 1) {
        this.marriedStatusYN = true;
      }
      else{
        this.marriedStatusYN = false;
      }

      if (this.emplyeeData['spouseStatus'] == '1') {
        this.spouseNone = true;
        this.spouseKVSStation = true;
      } else if (this.emplyeeData['spouseStatus'] == '2' || this.emplyeeData['spouseStatus'] == '3') {
        this.spouseNone = true;
        this.spouseKVSStation = false;
      } else if (this.emplyeeData['spouseStatus'] == '5') {
        this.spouseNone = false;
        this.spouseKVSStation = false;
      }
      var data = {
        "applicationId": this.applicationId,
        "teacherTypeId": this.emplyeeData['lastPromotionPositionType']
      }
      this.getSubjectByTchType(data);
      if(this.emplyeeData['teacherDisabilityYn']=='1'){
        this.teacherDisabilityType='yes';
      }
      else{
        this.teacherDisabilityType='no';
      }
      this.clickOnDisability(this.teacherDisabilityType);
      }
      this.getDocumentByTeacherId();
      this.getFormStatusV2();
  },
  error => {
    Swal.fire({
      'icon':'error',
      'text':error.error
    }
    )
  })
  }

  getStateMaster() {
    this.outSideService.fetchStateMaster("a").subscribe((res) => {
      this.stateMasterList = res.response.rowValue;
    })
  }
  getDistrictListByStateId(event, data) {
    debugger
    this.stateId=event;
    if (data == 'C') {
      this.districListByStateIdC = [];
      this.basicProfileForm.patchValue({
          crspndncPinCode: '',
      });
      this.enableDisableAddress('enable');
    } else if (data == 'P') {
      this.districListByStateIdP = [];
      this.basicProfileForm.patchValue({
          prmntPinCode: ''
      })
    }
    this.getDistrictByStateId(this.stateId, data);
  }

  getDistrictListByStateIdSameasAbove(event, data) {
    debugger
    this.stateId=event;
    if (data == 'C') {
      this.districListByStateIdC = [];
      this.basicProfileForm.patchValue({
          crspndncPinCode: '',
      });
      this.enableDisableAddress('enable');
    } else if (data == 'P') {
      this.districListByStateIdP = [];
      // this.basicProfileForm.patchValue({
      //     prmntPinCode: ''
      // })
    }
    this.getDistrictByStateId(this.stateId, data);
  }



  enableDisableAddress(val) {
    if (val == 'disable') {
      this.basicProfileForm.get('prmntAddress').disable();
      this.basicProfileForm.get('prmntState').disable();
      this.basicProfileForm.get('prmntDistrict').disable();
      this.basicProfileForm.get('prmntPinCode').disable();
    } else if (val == 'enable') {
      this.basicProfileForm.get('prmntAddress').enable();
      this.basicProfileForm.get('prmntState').enable();
      this.basicProfileForm.get('prmntDistrict').enable();
      this.basicProfileForm.get('prmntPinCode').enable();
    }
  }
  getDistrictByStateId(stateId, data) {
    this.outSideService.fetchDistrictByStateId(stateId).subscribe((res) => {
      if (data == 'C') {
        this.districListByStateIdC = [];
        this.districListByStateIdC = res.response.rowValue
      } else if (data == 'P') {
        this.districListByStateIdP = [];
        this.districListByStateIdP = res.response.rowValue
      }

    })
  }
  onKeyUp(event){
    this.profileTeacherName=event.target.value;
  }
  pDistrictChange(value) {
    //this.responseData.teacherPermanentDistrict = value;
  }
  clickOnDisability(val) {

    if (val == 'yes') {
      this.isVisible = true;
    } else if (val == 'no') {
      this.isVisible = false;
      this.basicProfileForm.patchValue({
          disabilityType: '',
          disabilityFromBirthYN: '',
          disabilityDate: '',
          disabilityPercentage: '',
          disabilityCertAuth: '',
          disabilityCertNo: '',
      })
    } else if (val == 'yesBirth') {
      this.isVisibleBirth = false;
    } else if (val == 'noBirth') {
      this.isVisibleBirth = true;
    }
  }

  addOrPinChange(val) {
    this.basicProfileForm.patchValue({
        sameAbove: false
    });
    this.enableDisableAddress('enable')
  }
  cDistrictChange(value) {
    this.basicProfileForm.patchValue({
        crspndncPinCode: '',
        sameAbove: false
    })
    this.responseData.teacherCorrespondenceDistrict = value;
    this.enableDisableAddress('enable');
  }


  getSchoolDetailsByKvCode() {
    setTimeout(() => {
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
      },
      error => {
        Swal.fire({
          'icon':'error',
          'text':error.error
        }
        )
      })
    }, 200);
  }
    getAllMaster() {
      debugger;

    this.outSideService.fetchAllMaster(6).subscribe((res) => {
      this.teacherTypeData = res.response.postionType;
      this.teacherTypeDataNameCode = [];
      for (let i = 0; i < this.teacherTypeData.length; i++) {

        var concatElement;
        concatElement = this.teacherTypeData[i].organizationTeacherTypeName;
        concatElement = concatElement + "(" + this.teacherTypeData[i].orgTeacherTypeCode + ")";
        var data = {
          'nameCode': concatElement,
          'teacherTypeId': this.teacherTypeData[i].teacherTypeId
        }
        this.teacherTypeDataNameCode.push(data)
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
  checkMobileNumber(event) {
    this.outSideService.fetchTchDuplicateMobile(event.target.value).subscribe((res) => {

      if (res.response.status == 1) {
      }
      else if (res.response.status == 0) {
        Swal.fire(
          'Mobile number already exist',
          '',
          'error'
        )
        this.basicProfileForm.patchValue({
            mobile: ''
        })
      }
    })
  }

  dateDifferenceFnc(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isBefore(today) == false) {
        return { 'invalidDate': true }
      }
      if ((today.diff(date, 'days')) < 6570) {
        return { 'invalidDate': true }
      }

    }
    return null;
  }
  dateNotBeforeToday(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isBefore(today) == false) {
        return { 'invalidDate': true }
      }
    }
    return null;
  }

  teacherTypeSelect(event) {
    debugger;
    console.log('Staff type test', event.target.value)
    if (event.target.value != 22 && event.target.value != 23 && event.target.value != 10 && event.target.value != 12 && event.target.value != 24 && event.target.value != 11 && event.target.value != '22' && event.target.value != '23' && event.target.value != '11' && event.target.value != '24') {
      this.basicProfileForm.patchValue({
          staffType: '2'
      });
    } else {
      this.basicProfileForm.patchValue({
          staffType: '1'
      });
    }
    this.subjectListNameCode = [];
    this.basicProfileForm.patchValue({
      profileForm: {
        presentSubjectName: ''
      }
    });
    var data = {
      "applicationId": this.applicationId,
      "teacherTypeId": event.target.value
    }
    this.getSubjectByTchType(data);
  }
  onSpouseClick(event) {
    if (event.target.value == '1') {
      this.spouseNone = true;
      this.spouseKVSStation = true;
      this.basicProfileForm.patchValue({

          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''

      })
    } else if (event.target.value == '2') {
      this.spouseNone = true;
      this.spouseKVSStation = false;
      this.basicProfileForm.patchValue({

          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''

      })
    } else if (event.target.value == '3') {
      this.spouseNone = true;
      this.spouseKVSStation = false;
      this.basicProfileForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''

      })
    } else if (event.target.value == '5') {
      this.spouseNone = false;
      this.spouseKVSStation = false;
      this.basicProfileForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
      })
    }
  }

  maritalStatusCheck(event) {

    if (event.target.value == '1') {
      this.marriedStatusYN = true;
      this.basicProfileForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: '',
          spouseStatusF: '5'
      })

    } else if (event.target.value == '7') {
      this.marriedStatusYN = false;
      this.spouseKVSStation = false;
      this.spouseNone = false;
      this.basicProfileForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: '',
          spouseStatusF: '5'
      })

    } else if (event.target.value == '4') {

      this.marriedStatusYN = false;
      this.spouseKVSStation = false;
      this.spouseNone = false;
      this.basicProfileForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: '',
          spouseStatusF: '5'
      })

      if (this.basicProfileForm.value.gender == '2') {
        this.basicProfileForm.patchValue({
            spouseStationName: '',
            spousePost: '',
            spouseStationCode: '',
            spouseName: '',
            spouseEmpCode: '',
            spouseStatusF: '4'
        })
      }

    }
  }
  selectSpouseStation() {
    this.modalService.open(this.selectSpouseStationModal, { size: 'xl', backdrop: 'static', keyboard: false })
    this.getKvRegion();
  }
  getKvRegion() {
    this.regionList=[];
    this.outSideService.fetchKvRegion(1).subscribe((res) => {
      console.log("region list")
      this.regionList = res.response.rowValue;
      console.log(this.regionList)
    })
  }
  getStationByRegionId(event) {
    this.stationList=[];
    const data = { "regionCode": event.target.value };
    this.outSideService.fetchStationByRegionId(data).subscribe((res) => {
      this.stationList = res.rowValue
    })

  }
  selectSpouseStationFn() {
    var str = this.selectedSpouseStation
    var splitted = str.split("-", 2);
    this.basicProfileForm.patchValue({
        spouseStationName: splitted[1],
        spouseStationCode: splitted[0]
    })
  }
  getSpouseDetails(event) {

    this.basicProfileForm.patchValue({
        spouseStationName: '',
        spousePost: '',
        spouseStationCode: '',
        spouseName: ''
    })

    this.outSideService.fetchSpouseByEmpCode(event.target.value).subscribe((res) => {
      if (res.status == '0') {
        // Swal.fire(
        //   'Record not found with the given employee code !',
        //   'Please enter correct employee code',
        //   'error'
        // )
        // this.teacherForm.patchValue({
        //   personalInfoForm: {
        //     spouseStationName: '',
        //     spousePost: '',
        //     spouseStationCode: '',
        //     spouseName: '',
        //     spouseEmpCode: ''
        //   }
        // })
      }
      this.basicProfileForm.patchValue({
          spouseStationName: res.response?.stationName,
          spousePost: res.response?.lastPromotionPositionType,
          spouseStationCode: res.response?.stationCode
      })

      if (res.status == '1') {
        this.outSideService.fetchTeacherByTeacherId(res.response?.teacherId).subscribe((res) => {
          this.basicProfileForm.patchValue({
              spouseName: res.response?.teacherName
          })
        })
      }
    })
  }
  getSubjectByTchType(data) {
    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      this.subjectList = res.response.rowValue;
      console.log(this.subjectList);
      this.subjectListNameCode = [];
      for (let i = 0; i < this.subjectList.length; i++) {
        var conElement;
        conElement = this.subjectList[i].subject_name;
        conElement = conElement + "(" + this.subjectList[i].subject_code + ")";
        var data = {
          'subNameCode': conElement,
          'subjectCode': this.subjectList[i].subject_id
        }
        this.subjectListNameCode.push(data);
      }
    })
  }
  fileToUpload: File | null = null;
  handleFileInput(files: FileList, index) {
    this.fileUpload = true;
    var data = files.item(0).name
    var splitted = data.split('.', 2)
    if (splitted[1] == 'pdf' || splitted[1] == 'PDF' || splitted[1] == 'Pdf') {
      if (files.item(0).size <= 512000) {
        this.fileToUpload = files.item(0);
         if (index == '4') {
          this.enableUploadButton4 = true;
        }
      } else {
        this.fileToUpload = null;
        Swal.fire(
          'File size allowed upto 500KB only !',
          '',
          'error'
        )
        if (index == '4') {
          this.enableUploadButton4 = true;
        }
      }

    } else {
      this.fileToUpload = null;
      Swal.fire(
        'Only PDF file can be uploaded',
        '',
        'error'
      )
      if (index == '4') {
        this.enableUploadButton4 = true;
      }
    }
  }
  documentUpload(index) {

    this.fileUpload = true;
    const formData = new FormData();
    if (this.fileToUpload != null) {
      formData.append('teacherId', this.emplyeeData['teacherId']);
      formData.append('file', this.fileToUpload);
      if (index == 4) {
        formData.append('filename', "Physically_Handicap_Certificate");
      }
      this.outSideService.uploadDocument(formData).subscribe((res) => {
        this.fileUpload = false;
        Swal.fire(
          'Document Upload Sucessfully',
          '',
          'success'
        )
        this.documentUploadArray[index] = { "docName": res.response.docName, "url": res.response.url};

       if (index == 4) {
          this.deleteDocUpdate4 = false
        }
        this.getDocumentByTeacherId()
      })
    } else {
      Swal.fire(
        'Select PDF to be uploaded !',
        '',
        'error'
      )
    }
  }
  getDocumentByTeacherId() {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    this.outSideService.fetchUploadedDoc(this.emplyeeData['teacherId']).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    if(JSON.stringify(res[i]) !="{}" && res[i]?.url !='undefined' && res[i]?.url.length>0){
        res[i].url=res[i].url+"&docId="+token+"&username="+JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;;
    }
        if (res[i].docName == 'Physically_Handicap_Certificate.pdf') {
          this.fileUpload = false;
        }
      }
      this.documentUploadArray = res;
    })
  }

  deleteDocumentUploaded(documentName) {
    for (let i = 0; i < this.documentUploadArray.length; i++) {
      if (this.documentUploadArray[i].docName == documentName) {
        this.documentUploadArray[i] = {}
      }
    }
    if(documentName == 'Physically_Handicap_Certificate.pdf'){
      this.fileUpload = true;
      this.Physically_Handicap_Certificate.nativeElement.value = "";
    }
    var data = {
      "teacherId": this.responseData.teacherId,
      "docName": documentName
    }

    this.outSideService.deleteUploadedDoc(data).subscribe((res) => {
      Swal.fire(
        'Deleted !',
        '',
        'success'
      )
    })
  }
  next(){
    this.router.navigate(['/teacher/workExperience']);
  }
  submit(){
        var data={
          "teacherName":this.basicProfileForm.value.fullName,
          "teacherGender":this.basicProfileForm.value.gender,
          "teacherDob": this.basicProfileForm.value.dob,
          "teacherEmployeeCode":this.basicProfileForm.value.empCode,
          "teacherMobile":this.basicProfileForm.value.mobile,
          "teacherEmail":this.basicProfileForm.value.email,
          "teacherPermanentAddress":this.basicProfileForm.value.prmntAddress,
          "teacherParmanentState":this.basicProfileForm.value.prmntState,
          "teacherPermanentDistrict":this.basicProfileForm.value.prmntDistrict,
          "teacherPermanentPin":this.basicProfileForm.value.prmntPinCode,
          "teacherCorrespondenceAddress":this.basicProfileForm.value.crspndncAddress,
          "teacherCorrespondenceState":this.basicProfileForm.value.crspndncState,
          "teacherCorrespondenceDistrict":this.basicProfileForm.value.crspndncDistrict,
          "teacherCorrespondencePin":this.basicProfileForm.value.crspndncPinCode,
          "teacherDisabilityYn":this.basicProfileForm.value.disabilityYN,
          "teacherDisabilityType":this.basicProfileForm.value.disabilityType,
          "lastPromotionPositionType":this.basicProfileForm.value.presentPostName,
          "lastPromotionPositionDate":this.basicProfileForm.value.lastPromotionPositionDate,
          "workExperienceAppointedForSubject":this.basicProfileForm.value.presentSubjectName,
          "spouseStationName":this.basicProfileForm.value.spouseStationName,
          "spouseStationCode":this.basicProfileForm.value.spouseStationCode,
          "spousePost":this.basicProfileForm.value.spousePost,
          "spouseName":this.basicProfileForm.value.spouseName,
          "spouseEmpCode":this.basicProfileForm.value.spouseEmpCode,
          "spouseStatus":this.basicProfileForm.value.spouseStatusF,
          "maritalStatus":this.basicProfileForm.value.maritalStatusF,
          "currentUdiseSchCode":this.kvCode,
          "teacherId":this.emplyeeData['teacherId'],
          "schoolId":"",
          "dropBoxFlag":"",
          "teachingNonteaching":this.basicProfileForm.value.staffType,
          "natureOfAppointment":"",
          "specialRecruitmentYn":this.basicProfileForm.value.specialRecruitmentYn,
          "kvCode":this.kvCode
        }
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
              this.outSideService.saveSingleTeacher(data).subscribe((res)=>{
                if(res){
                  sessionStorage.setItem('kvTeacherId',res['response']['teacherId']);
                  sessionStorage.setItem('profileTeacherName',this.profileTeacherName);
                  Swal.fire(
                    'Basic profile save successfully!',
                    '',
                    'success'
                  )
                }
                this.router.navigate(['/teacher/workExperience']);
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
}




// downloadDocument(url) {
// // event.preventDefault();
// alert(url);



// var link = document.createElement("a")
// link.href = url
// link.click();
// // this._http.get<any>(, {headers});

// }
}