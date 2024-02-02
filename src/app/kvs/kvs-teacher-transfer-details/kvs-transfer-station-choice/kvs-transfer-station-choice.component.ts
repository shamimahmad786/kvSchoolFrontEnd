import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-kvs-transfer-station-choice',
  templateUrl: './kvs-transfer-station-choice.component.html',
  styleUrls: ['./kvs-transfer-station-choice.component.css']
})
export class KvsTransferStationChoiceComponent implements OnInit {
  stationChoiceForm: FormGroup;
  transDisable: boolean = false;
  formStatusLocale: any;
  statUsMessage:any
  AllregionList: any = [];
  @ViewChild('selectSchoolModal', { static: true }) selectSchoolModal: TemplateRef<any>;
  @ViewChild('selectSchoolModalInterStation', { static: true }) selectSchoolModalInterStation: TemplateRef<any>;
  position: any;
  applicationId: any;
  loginUserNameForChild: any;
  kvicons: any;
  kvCode: any;
  selectedUdiseCode:any;
  tempTeacherId: any;
  onlyDcFill: boolean = false;
  showTcField: boolean = false;
  regionList: any;
  stationList:any;
  disabled = true;
  kvSchoolListP1: any;
  kvSchoolListP2: any;
  kvSchoolListP3: any;
  kvSchoolListP4: any;
  kvSchoolListP5: any;
  empTransferradioButton:any;
  tempTeachername:any;
  profileFinalStatus: boolean = false;
  constructor(private outSideService: OutsideServicesService,private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.tempTeacherId = localStorage.getItem('transferteacherId');     
    this.tempTeachername = localStorage.getItem('transferteacherName');
      this.stationChoiceForm= new FormGroup({
        'applyTransferYn': new FormControl('', Validators.required),
        'teacherId': new FormControl(''),
        'inityear': new FormControl(''),
        'choiceKv1StationCode': new FormControl,
        'choiceKv2StationCode': new FormControl,
        'choiceKv3StationCode': new FormControl,
        'choiceKv4StationCode': new FormControl,
        'choiceKv5StationCode': new FormControl,
        'choiceKv1StationName': new FormControl('', Validators.required),
        'choiceKv2StationName': new FormControl('', Validators.required),
        'choiceKv3StationName': new FormControl('', Validators.required),
        'choiceKv4StationName': new FormControl('', Validators.required),
        'choiceKv5StationName': new FormControl('', Validators.required)
      }),
   
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.getKvRegion();
    this.getTransferProfile();
  }
 
  getTransferProfile() {
      this.stationChoiceForm.patchValue({
          applyTransferYn: '0',
      })
    const data = { "teacherId": this.tempTeacherId ,
    "inityear":"2024" 
  }
    this.outSideService.getTransferData(data).subscribe((res) => {
      if (res.response != null || res.response == '') {
        this.stationChoiceForm.patchValue({
            id: res.response.id,
            teacherId: res.response.teacherId,
            applyTransferYn: res.response.applyTransferYn,
            choiceKv1StationCode: res.response.choiceKv1StationCode != 'null' ? res.response.choiceKv1StationCode : '',
            choiceKv2StationCode: res.response.choiceKv2StationCode != 'null' ? res.response.choiceKv2StationCode : '',
            choiceKv3StationCode: res.response.choiceKv3StationCode != 'null' ? res.response.choiceKv3StationCode : '',
            choiceKv4StationCode: res.response.choiceKv4StationCode != 'null' ? res.response.choiceKv4StationCode : '',
            choiceKv5StationCode: res.response.choiceKv5StationCode != 'null' ? res.response.choiceKv5StationCode : '',
            choiceKv1StationName: res.response.choiceKv1StationName,
            choiceKv2StationName: res.response.choiceKv2StationName,
            choiceKv3StationName: res.response.choiceKv3StationName,
            choiceKv4StationName: res.response.choiceKv4StationName,
            choiceKv5StationName: res.response.choiceKv5StationName,
            displacement1StationCode: res.response.displacement1StationCode,
            displacement1StationName: res.response.displacement1StationName,
            displacement2StationName: res.response.displacement2StationName,
            displacement2StationCode: res.response.displacement2StationCode,
            displacement3StationName: res.response.displacement3StationName,
            displacement3StationCode: res.response.displacement3StationCode,
            displacement4StationCode: res.response.displacement4StationCode,
            displacement4StationName: res.response.displacement4StationName,
            displacement5StationCode: res.response.displacement5StationCode,
            displacement5StationName: res.response.displacement5StationName,
          },

        )
      }
      this.empTransferradioButton = res.response.applyTransferYn
      if (this.empTransferradioButton == null || this.empTransferradioButton == "") {
        this.stationChoiceForm.patchValue({
            applyTransferYn: '0',
        })
        this.empTransferradioButton = 0;
        this.disabled = true;
        this.showTcField =true;
      }
      if (this.empTransferradioButton == 1 || this.empTransferradioButton == '1') {
        this.stationChoiceForm.patchValue({
            applyTransferYn: '1',
        })
        this.empTransferradioButton = 1;
        this.disabled = false;
        this.showTcField =false;
      }
      if (this.empTransferradioButton == 0 || this.empTransferradioButton == '0') {
        this.stationChoiceForm.patchValue({
            applyTransferYn: '0',
        })
        this.empTransferradioButton = 0;
        this.disabled = true;
        this.showTcField =true;
      }
    })
     this.getFormStatusV2();
  }

  getFormStatusV2(){
    var data ={
      "teacherId": this.tempTeacherId
    }
    this.outSideService.getFormStatusV2(data).subscribe((res) => {
    
     if(res.response['form4Status']==1 || res.response['form4Status']=='1')
     {
      this.profileFinalStatus=true;
     }
    })
  }
  selectSchool(val) {
    this.position = val;
    this.getTransferRegionsByEmployee()
  }
  getKvRegion() {
    debugger 
    this.outSideService.fetchKvRegion(1).subscribe((res) => {
    this.regionList = res.response.rowValue;
    })
  }
  getTransferRegionsByEmployee(){
    debugger
    const data={
      teacherId:this.tempTeacherId
    }
    this.AllregionList=[];
    this.outSideService.getTransferRegionByEmployee(data).subscribe((res) => {
      this.AllregionList = res.rowValue;
     this.modalService.open(this.selectSchoolModalInterStation, { size: 'lg', backdrop: 'static', keyboard: false })
    })
  }
  getKvSchoolByStationIdPreference(event) {
    var str = event.target.value
    this.selectedUdiseCode = str
    var splitted = str.split("-", 2);
    this.outSideService.fetchKvSchoolByStationCode(splitted[0]).subscribe((res) => {
      if (this.position == '1') {
        this.kvSchoolListP1 = res.response;
      } else if (this.position == '2') {
        this.kvSchoolListP2 = res.response;
      } else if (this.position == '3') {
        this.kvSchoolListP3 = res.response;
      } else if (this.position == '4') {
        this.kvSchoolListP4 = res.response;
      } else if (this.position == '5') {
        this.kvSchoolListP5 = res.response;
      }
    })
  }
  getTransfersStationByEmployee(event) {
    debugger
        const data = {
          "regionCode": event.target.value,
          "teacherId": this.tempTeacherId
        };
        this.outSideService.getTransferStationByEmployee(data).subscribe((res) => {
          this.stationList = res.rowValue 
        })
      }
      selectSchoolByUdise() {

    var str = this.selectedUdiseCode
    console.log(str)
    var splitted = str.split("-", 2);
     
    if (this.position == '1') {
      // choiceKv1StationName
      if (this.stationChoiceForm.value.choiceKv2StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv3StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv4StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.stationChoiceForm.patchValue({
            choiceKv1StationCode: '',
            choiceKv1StationName: ''
        })
      } else {
        this.stationChoiceForm.patchValue({
            choiceKv1StationName: splitted[1],
            choiceKv1StationCode: splitted[0]
        })
      }

    } else if (this.position == '2') {
      if (this.stationChoiceForm.value.choiceKv1StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv3StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv4StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.stationChoiceForm.patchValue({
            choiceKv2StationCode: '',
            choiceKv2StationName: ''
        })
      } else {
        this.stationChoiceForm.patchValue({
            choiceKv2StationName: splitted[1],
            choiceKv2StationCode: splitted[0]
        })
      }
    } else if (this.position == '3') {
      if (this.stationChoiceForm.value.choiceKv2StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv1StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv4StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.stationChoiceForm.patchValue({
            choiceKv3StationCode: '',
            choiceKv3StationName: ''
        })
      } else {
        this.stationChoiceForm.patchValue({
            choiceKv3StationName: splitted[1],
            choiceKv3StationCode: splitted[0]
        })
      }
    } else if (this.position == '4') {
      if (this.stationChoiceForm.value.choiceKv2StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv3StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv1StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.stationChoiceForm.patchValue({
            choiceKv4StationCode: '',
            choiceKv4StationName: ''
        })
      } else {
        this.stationChoiceForm.patchValue({
            choiceKv4StationName: splitted[1],
            choiceKv4StationCode: splitted[0]
        })
      }
    } else if (this.position == '5') {
      if (this.stationChoiceForm.value.choiceKv2StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv3StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv4StationName == splitted[1] ||
        this.stationChoiceForm.value.choiceKv1StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.stationChoiceForm.patchValue({
            choiceKv5StationCode: '',
            choiceKv5StationName: ''
        })
      } else {
        this.stationChoiceForm.patchValue({
            choiceKv5StationName: splitted[1],
            choiceKv5StationCode: splitted[0]
        })
      }
    } else if (this.position == '191') {
      if (this.stationChoiceForm.value.displacement2StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement3StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement4StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.stationChoiceForm.patchValue({
            displacement1StationCode: '',
            displacement1StationName: ''
        })
      } else {
        this.stationChoiceForm.patchValue({
            displacement1StationName: splitted[1],
            displacement1StationCode: splitted[0]
        })
      }
    } else if (this.position == '192') {
      if (this.stationChoiceForm.value.displacement1StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement3StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement4StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.stationChoiceForm.patchValue({
            displacement2StationCode: '',
            displacement2StationName: ''
        })
      } else {
        this.stationChoiceForm.patchValue({
            displacement2StationName: splitted[1],
            displacement2StationCode: splitted[0]
        })
      }
    } else if (this.position == '193') {
      if (this.stationChoiceForm.value.displacement2StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement1StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement4StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.stationChoiceForm.patchValue({
          transferRelatedForm: {
            displacement3StationCode: '',
            displacement3StationName: ''
          }
        })
      } else {
        this.stationChoiceForm.patchValue({
            displacement3StationName: splitted[1],
            displacement3StationCode: splitted[0]
        })
      }
    } else if (this.position == '194') {
      if (this.stationChoiceForm.value.displacement2StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement3StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement1StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.stationChoiceForm.patchValue({
            displacement4StationCode: '',
            displacement4StationName: ''
        })
      } else {
        this.stationChoiceForm.patchValue({
            displacement4StationName: splitted[1],
            displacement4StationCode: splitted[0]
        })
      }
    } else if (this.position == '195') {
      if (this.stationChoiceForm.value.displacement2StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement3StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement4StationCode == splitted[0] ||
        this.stationChoiceForm.value.displacement1StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.stationChoiceForm.patchValue({
            displacement5StationCode: '',
            displacement5StationName: ''
        })
      } else {
        this.stationChoiceForm.patchValue({
            displacement5StationName: splitted[1],
            displacement5StationCode: splitted[0]
        })
      }
    }
  }

  restStationSelection(val) {
    if (val == 1) {
      this.stationChoiceForm.patchValue({

          choiceKv1StationCode: '',
          choiceKv1StationName: ''
        
      })
    } else if (val == 2) {
      this.stationChoiceForm.patchValue({
   
          choiceKv2StationCode: '',
          choiceKv2StationName: ''
        
      })
    } else if (val == 3) {
      this.stationChoiceForm.patchValue({
          choiceKv3StationCode: '',
          choiceKv3StationName: ''
      })
    } else if (val == 4) {
      this.stationChoiceForm.patchValue({  
          choiceKv4StationCode: '',
          choiceKv4StationName: ''
      })
    } else if (val == 5) {
      this.stationChoiceForm.patchValue({
          choiceKv5StationCode: '',
          choiceKv5StationName: ''
      })
    } else if (val == 191) {
      this.stationChoiceForm.patchValue({
          displacement1StationName: '',
          displacement1StationCode: ''
      })
    } else if (val == 192) {
      this.stationChoiceForm.patchValue({
          displacement2StationName: '',
          displacement2StationCode: ''
      })
    } else if (val == 193) {
      this.stationChoiceForm.patchValue({
          displacement3StationName: '',
          displacement3StationCode: ''
      })
    } else if (val == 194) {
      this.stationChoiceForm.patchValue({
          displacement4StationName: '',
          displacement4StationCode: ''
      })
    } else if (val == 195) {
      this.stationChoiceForm.patchValue({
          displacement5StationName: '',
          displacement5StationCode: ''
      })
    } else if (val == 291) {
      this.stationChoiceForm.patchValue({
          doptStationOneCode: '',
          doptStationOneName: ''
      })
    } else if (val == 292) {
      this.stationChoiceForm.patchValue({
          doptStationTwoCode: '',
          doptStationTwoName: ''
      })
    }
  }
  manageChoice(val) {
    this.stationChoiceForm.patchValue({
        choiceKv1StationCode: '',
        choiceKv1StationName: '',
        choiceKv2StationCode: '',
        choiceKv2StationName: '',
        choiceKv3StationCode: '',
        choiceKv3StationName: '',
        choiceKv4StationCode: '',
        choiceKv4StationName: '',
        choiceKv5StationCode: '',
        choiceKv5StationName: ''
    })
    if (val == 1) {
      this.disabled = false;
    }
    else {
      this.disabled = true;
    }
  }
  previousPage(){
    this.router.navigate(['/teacher/kvsTchMiscellaneous']);
  }
  next(){
    this.router.navigate(['/teacher/kvsTchPreviewUndertaking']);
  }
  onSubmit() {
    this.stationChoiceForm.patchValue({
      inityear: '2024'
      })
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
        this.outSideService.saveStationChoice(this.stationChoiceForm.value).subscribe((res)=>{
          if (res.status == 1) {
            Swal.fire(
              'Your Station choice has been saved Successfully! ',
              '',
              'success'
            )
            this.router.navigate(['/teacher/preview-undertaking']);
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
  }
}
