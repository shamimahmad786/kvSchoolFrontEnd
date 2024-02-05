import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kvs-transfer-preview-undertaking',
  templateUrl: './kvs-transfer-preview-undertaking.component.html',
  styleUrls: ['./kvs-transfer-preview-undertaking.component.css']
})
export class KvsTransferPreviewUndertakingComponent implements OnInit {
  responseData: any;
  displacementCountForm: FormGroup;
  transferCountForm: FormGroup;
  teacherPreviewUndertakingForm: FormGroup;
  tempTeacherId: any;
  teacherrofileData:any;
  enableTransferFormYn: boolean = true;
  kvCode: any;
  documentUploadArray:any;
  responseTcDcData:any;
  transDisable: boolean = false;
  spouseAtSmaeStation: boolean;
  spouseAtCentralGovt: boolean;
  spouseAtStateGovt: boolean;
  wooomanEmp: boolean;
  tcSpouseAtSmaeStation: boolean;
  tcSpouseAtCentralGovt: boolean;
  tcSpouseAtStateGovt: boolean;
  tcWooomanEmp: boolean;
  statUsMessage:any
  docPreview: any;
  fileUpload: boolean;
  totaldaysPresent: any;
  totaldaysPresentTc: any;
  dcStayAtStation: any;
  dcPeriodAbsence: any;
  dcReturnStation: any;
  tcStayAtStation: any;
  tcPeriodAbsence: any;
  tcReturnStation: any;
  showTcField: boolean = false;
  disabled = true;
  empTransferradioButton:any;
  tcSaveYn: any;
  user_name: any;
  schoolProfileFinalStatus:any;
  tempTeachername:any;
  profileFinalStatus: boolean = false;
  schoolTransferFinalStatus: any;
  medicalDocURLName: any;
  disabilityCertiDocURLName: any;
  spouseDeclarationDocUrlName: any;
  singleParentDocURLName: any;
  dFPDocURLName: any;
  nJCMRJCMDocURLName: any;
  transferIds: any;
  constructor(private outSideService: OutsideServicesService,private fb: FormBuilder,private modalService: NgbModal,private router: Router) { }
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

    this.tempTeacherId = localStorage.getItem('transferteacherId');     
    this.tempTeachername = localStorage.getItem('transferteacherName');
    this.getFormStatusV2();
    this.getDocumentByTeacherId();
   
  }
  getFormStatusV2(){
    var data ={
      "teacherId": this.tempTeacherId
    }
    this.outSideService.getFormStatusV2(data).subscribe((res) => {
     this.schoolProfileFinalStatus = res.response['profileFinalStatus']
     this.schoolTransferFinalStatus = res.response['transferFinalStatus']
     console.log(res.response);
     if(this.schoolTransferFinalStatus=="TA" || this.schoolTransferFinalStatus=="TS" )
     {
      this.profileFinalStatus=true;
      this.getTcDcPointByTeacherIdAndInityearV2();
     }
     else{
      this.getTransferId();
      this.setTcDcReceivedData();
     }
    })
  }
  getTransferId(){
    const data = {
      "teacherId": this.tempTeacherId,
      "inityear":"2024" 
     };
   this.outSideService.getTransferId(data).subscribe((res) => {
     console.log("------transfer id----------------")
     console.log(res.response) 
     this.transferIds=res.response.id;
  
   })
  }
  downloadDocument(documentName) {
    for (let i = 0; i < this.documentUploadArray.length; i++) {
      if (this.documentUploadArray[i].docName == documentName) {
        this.documentUploadArray[i] = {}
      }
    }
    if(documentName == 'Physically_Handicap_Certificate.pdf'){
      this.fileUpload = true;
      this.docPreview.nativeElement.value = "";
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
    const data = {
       "teacherId": this.tempTeacherId,
       "inityear":"2024" 
      };
    this.outSideService.getTransferData1(data).subscribe((res) => {
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

  setTcDcReceivedData() {
    const data = {
      "kvCode": this.kvCode,
      "teacherId": this.tempTeacherId
    }
    this.outSideService.fetchTcDcData(data).subscribe((res) => {
      debugger
      console.log("tc dc res")
      console.log(res)
      this.responseTcDcData = res;
      if (this.responseTcDcData.transferId != null && this.responseTcDcData.transferId != '') {
        this.transDisable = true;
      }
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
      this.canculateDcPoint();
      this.canculateTcPoint();
      this.getTransferProfile();
    })
  
  }
  canculateDcPoint() {
    if (this.responseTcDcData.dcSinglePoint == '-12') {
      this.displacementCountForm.patchValue({
          dcSinglePoint: this.responseTcDcData.dcSinglePoint
      })
    }
    else {
      this.displacementCountForm.patchValue({
          dcSpousePoint: this.responseTcDcData.dcSpousePoint
      })
      if (this.responseTcDcData.dcSpousePoint == '-10') {
        this.spouseAtSmaeStation = true;
      }
      if (this.responseTcDcData.dcSpousePoint == '-8') {
        this.spouseAtCentralGovt = true;
      }
      if (this.responseTcDcData.dcSpousePoint == '-6') {
        this.spouseAtStateGovt = true;
      }
      if (this.responseTcDcData.dcSpousePoint == '-4') {
        this.wooomanEmp = true;
      }
    }
  }


  getDocumentByTeacherId() {
    debugger
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    this.outSideService.fetchUploadedDoc( this.tempTeacherId).subscribe((res) => {
      this.documentUploadArray = res;
      for (let i = 0; i < res.length; i++) {

        if (res[i].docName == 'Medical_Certificate.pdf') {
         
          this.medicalDocURLName = res[i].url+"&docId="+token+"&username="+JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
        }
        if (res[i].docName == 'Disability_Certificate.pdf') {
   
          this.disabilityCertiDocURLName = res[i].url+"&docId="+token+"&username="+JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
        }
        if (res[i].docName == 'Spouse_Declaration.pdf') {

          this.spouseDeclarationDocUrlName = res[i].url+"&docId="+token+"&username="+JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
        }
        if (res[i].docName == 'Single_Parent_Declaration.pdf') {
   
          this.singleParentDocURLName = res[i].url+"&docId="+token+"&username="+JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
        }

        if (res[i].docName == 'DFP_Declaration.pdf') {
      
          this.dFPDocURLName = res[i].url+"&docId="+token+"&username="+JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
        }
        if (res[i].docName == 'NJCM_RJCM_Declaration.pdf') {
   
          this.nJCMRJCMDocURLName = res[i].url+"&docId="+token+"&username="+JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
        }
      }
    })
  }


  previousPage(){
    this.router.navigate(['/teacher/kvsTchStationChoice']);
  }

  canculateTcPoint() {
  
    if (this.responseTcDcData.tcSinglePoint == '20') {
      this.transferCountForm.patchValue({
          tcSinglePoint: this.responseTcDcData.tcSinglePoint
      })
    }
    else {
      this.transferCountForm.patchValue({
          tcSpousePoint: this.responseTcDcData.tcSpousePoint
      })
      if (this.responseTcDcData.tcSpousePoint == '15') {
        this.tcSpouseAtSmaeStation = true;
      }
      if (this.responseTcDcData.tcSpousePoint == '12') {
        this.tcSpouseAtCentralGovt = true;
      }
      if (this.responseTcDcData.tcSpousePoint == '10') {
        this.tcSpouseAtStateGovt = true;
      }
      if (this.responseTcDcData.tcSpousePoint == '8') {
        this.tcWooomanEmp = true;
      }
    }
  }

  onSubmitConfermation(){
    if(this.teacherPreviewUndertakingForm.value.dcCountStatus==='0'){
      this.teacherPreviewUndertakingForm.patchValue({
        dcCountStatus: true,
           });
     }
     if(this.teacherPreviewUndertakingForm.value.tcCountStatus==='0'){
      this.teacherPreviewUndertakingForm.patchValue({
        tcCountStatus: true,
           });
     }
    if(this.teacherPreviewUndertakingForm.value.stationOne==false || this.teacherPreviewUndertakingForm.value.stationTwo==false 
      || this.teacherPreviewUndertakingForm.value.stationThree==false || this.teacherPreviewUndertakingForm.value.stationFour==false
      || this.teacherPreviewUndertakingForm.value.stationFive==false || this.teacherPreviewUndertakingForm.value.dcCountStatus==false
      || this.teacherPreviewUndertakingForm.value.tcCountStatus==false || this.teacherPreviewUndertakingForm.value.undertaking1==false 
      || this.teacherPreviewUndertakingForm.value.undertaking2==false ){
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
   else{
      if( this.empTransferradioButton==1){
        this.tcSaveYn=1;
      }else{
        this.tcSaveYn=0;
      }
      const data = {
        id: this.transferIds,
        kvCode:  this.kvCode,
        teacherId: this.responseTcDcData.teacherId,
        dcStayStationPoint: this.responseTcDcData.dcStayStationPoint,
        dcTenureHardPoint: this.responseTcDcData.dcTenureHardPoint,
        dcPhysicalChallengedPoint: this.responseTcDcData.dcPhysicalChallengedPoint,
        dcMdDfGroungPoint: this.responseTcDcData.dcMdDfGroungPoint,
        dcLtrPoint: this.responseTcDcData.dcLtrPoint,
        dcRjcmNjcmPoint: this.responseTcDcData.dcRjcmNjcmPoint,
        dcTotalPoint: this.responseTcDcData.dcTotalPoint,
        tcStayStationPoint: this.responseTcDcData.tcStayStationPoint,
        tcTenureHardPoint: this.responseTcDcData.tcTenureHardPoint,
        tcPhysicalChallengedPoint: this.responseTcDcData.tcPhysicalChallengedPoint,
        tcMdDfGroungPoint: this.responseTcDcData.tcMdDfGroungPoint,
        tcLtrPoint: this.responseTcDcData.tcLtrPoint,
        tcRjcmNjcmPoint: this.responseTcDcData.tcRjcmNjcmPoint,
        tcTotalPoint: this.responseTcDcData.tcTotalPoint,
        dcSpousePoint: this.responseTcDcData.dcSpousePoint,
        tcSpousePoint: this.responseTcDcData.tcSpousePoint,
        tcSinglePoint: this.responseTcDcData.tcSinglePoint,
        dcSinglePoint: this.responseTcDcData.dcSinglePoint,
        dcStayAtStation: this.dcStayAtStation,
        dcPeriodAbsence: this.dcPeriodAbsence,
        dcReturnStation: this.dcReturnStation,
        tcStayAtStation: this.tcStayAtStation,
        tcPeriodAbsence: this.tcPeriodAbsence,
        dcSaveYn:1,
        inityear:"2024",
        tcSaveYn:this.tcSaveYn,
        tcReturnStation: this.tcReturnStation
      };
console.log(data)
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
          this.outSideService.saveTransferDCTCPoints(data).subscribe((res) => {
            this.modalService.dismissAll() 
            if (res) {
             // this.transDisable = true;
             this.saveConfermation();
            }
        })
      }
      return false;
      });
    }
    }

  saveConfermation(){
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
        this.outSideService.confirmTransferBySchool(data).subscribe((res) => {
        //  this.modalService.dismissAll() 
          if (res) {
            this.getFormStatusV2();
            Swal.fire(
              'Your transfer has been submitted  successfully.',
              '',
              'success'
            );
          }
      }) 
    return false;
  }
  
}
