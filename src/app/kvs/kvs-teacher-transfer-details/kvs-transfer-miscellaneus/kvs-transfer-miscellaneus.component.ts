import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { environment } from 'src/environments/environment';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { DataService } from 'src/app/service/data.service';
import { TeacherAppPdfService } from '../../makePdf/teacher-app-pdf.service';
@Component({
  selector: 'app-kvs-transfer-miscellaneus',
  templateUrl: './kvs-transfer-miscellaneus.component.html',
  styleUrls: ['./kvs-transfer-miscellaneus.component.css']
})
export class KvsTransferMiscellaneusComponent implements OnInit {
  gkFilebenefit: boolean = false;
  miscellaneousForm: FormGroup;
  gkFilemMedical: boolean = false;
  applicationId: any;
  loginUserNameForChild: any;
  kvicons: string;
  employeeCode:any;
  kvCode: any;
  responseData: any;
  emplyeeData:any;
  tempTeacherId: any;
  patientAilmentData: any;
  medicalCertificateIssueDateData: string;
  singleParentGroundData: any;
  singleParentCertificateIssueDateData: string;
  deathOfFamilyGroundData: any;
  careGiverRelationData: any;
  relationWithEmplMdgData: any;
  deathCertificateIssueDateData: string;
  empTransferradioButton: any;
  showStationChoice18B: boolean = false;
  showStationChoice18C: boolean = false;
  showStationChoice18: boolean = false;
  spouseKvsYnDradioButton: any;
  careGiverFaimlyYnDradioButton: any;
  careGiver: boolean = false;
  childDifferentAbleYnDradioButton: any;
  abledChild: boolean = false;
  dfpGround: boolean = false;
  spGround: boolean = false;
  inlineRadio13radioButton: any;
  positionHeld: boolean = false;
  buttonVisible: boolean = false;
  flagUpdatedList: any;
  verifyTchTeacherProfileData: any;
  verifyTchTeacherProfQualification: any;
  teacherStationChioce: any;
  verifyTchTeacherAward: any;
  verifyTchTeacherTraining: any;
  verifyTchTeacherWorkExp: any;
  fileUpgkFilebenefit: boolean = true;
  fileUpgkFilemMedical: boolean = true;
  enableUploadButtonRelatedForm0: boolean = false;
  enableUploadButtonRelatedForm1: boolean = false;
  enableUploadButtonRelatedForm2: boolean = false;
  enableUploadButtonRelatedForm3: boolean = false;
  enableUploadButtonRelatedForm5: boolean = false;
  enableUploadButtonRelatedForm6: boolean = false;
  enableUploadButtonRelatedForm7: boolean = false;
  enableUploadButtonRelatedForm8: boolean = false;
  fileUpcareGiver: boolean = true;
  fileUpspGround: boolean = true;
  fileUpdfpGround: boolean = true;
  fileUppositionHeld: boolean = true;
  documentUploadArray: any[] = [];
  deleteDeclairaionFormDocUpdate0: boolean = false;
  deleteDeclairaionFormDocUpdate1: boolean = false;
  deleteDeclairaionFormDocUpdate2: boolean = false;
  deleteDeclairaionFormDocUpdate3: boolean = false;
  deleteDeclairaionFormDocUpdate5: boolean = false;
  deleteDeclairaionFormDocUpdate6: boolean = false;
  deleteDeclairaionFormDocUpdate7: boolean = false;
  deleteDeclairaionFormDocUpdate8: boolean = false;
  fileUpload: boolean = true;
  profileFinalStatus: boolean = false;
  spouseName: any;
  deleteDocUpdate0: boolean = true;
  deleteDocUpdate1: boolean = true;
  deleteDocUpdate2: boolean = true;
  deleteDocUpdate3: boolean = true;
  deleteDocUpdate4: boolean = true;
  isDisabled: boolean = false;
  nJCMRJCMDocName:any;
  medicalDocName:any;
  medicalDocURLName:any;
  disabilityCertiDocName:any;
  disabilityCertiDocURLName:any;
  singleParentDocName:any;
  singleParentDocURLName:any;
  spouseDeclarationDocUrlName:any;
  nJCMRJCMDocURLName:any;
  dFPDocName:any;
  dFPDocURLName:any;
  tempTeachername: any;
  constructor(private pdfServive: TeacherAppPdfService,private router: Router, private date: DatePipe, private dataService: DataService,
    private modalService: NgbModal, private outSideService: OutsideServicesService,
    private route: ActivatedRoute, private fb: FormBuilder, private formData: FormDataService, private _adapter: DateAdapter<any>) {
    }

  ngOnInit(): void {
    this.tempTeacherId = localStorage.getItem('transferteacherId');     
    this.tempTeachername = localStorage.getItem('transferteacherName');
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.miscellaneousForm = this.fb.group({
      'id': new FormControl(''),
      'transferStatus': new FormControl(''),
      'absenceDaysOne': new FormControl('', Validators.required),
      'applyTransferYn': new FormControl(''),
      'disciplinaryYn': new FormControl(''),
      'teacherId': new FormControl('', Validators.required),
      'spouseKvsYnD': new FormControl(),
      'inityear': new FormControl(),
      'personalStatusMdgD': new FormControl(),
      'personalStatusSpD': new FormControl(),
      'personalStatusDfpD': new FormControl(),
      'memberJCM': new FormControl(),
      'surveHardYn': new FormControl(),
      'relationWithEmplMdg': new FormControl('', Validators.required),
      'spouseEmpCode': new FormControl(''),
      'spousePost': new FormControl(''),
      'spouseStationName': new FormControl(''),
      'careGiverFaimlyYnD': new FormControl(''),
      'positionOfNjcmRjcm': new FormControl('', Validators.required),
      'nameOfFamilyMember': new FormControl('', Validators.required),
      'medicalCertificateIssueDate': new FormControl('', Validators.required),
      'singleParentGround': new FormControl('', Validators.required),
      'deathOfFamilyGround': new FormControl('', Validators.required),
      'deathCertificateIssueDate': new FormControl('', Validators.required),
      'singleParentCertificateIssueDate': new FormControl('', Validators.required),
      'patientName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      'patientAilment': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      'patientHospital': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      'patientMedicalOfficerName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      'patientMedicalOfficerDesignation': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      'careGiverName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      'careGiverRelation': new FormControl('', Validators.required),
      'careGiverDisabilityName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
      'careGiverDisabilityPrcnt': new FormControl('', [Validators.required, Validators.maxLength(3), Validators.min(0), Validators.max(100), RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]),
    })
    this.getTransferProfile();
    this.getFormStatusV2()
    this.getDocumentByTeacherId();
  }

  declarationtransferRelated1(event) {
    if (event.target.value == '1') {
      this.gkFilebenefit = true;
    } else if (event.target.value == '0') {
      this.gkFilebenefit = false;
    }
  }

  declarationtransferRelated2(event) {
    if (event.target.value == '1') {
      this.gkFilemMedical = true;
    } else if (event.target.value == '0') {
      this.gkFilemMedical = false;
    }
  }
  getFormStatusV2(){
    var data ={
      "teacherId": this.tempTeacherId
    }
    this.outSideService.getFormStatusV2(data).subscribe((res) => {
    
     if(res.response['form4Status']==1 || res.response['form4Status']=='1')
     {
      //this.profileFinalStatus=true;
     }
    })
  }

  getTransferProfile() {
    const data = {
       "teacherId": this.tempTeacherId,
       "inityear":"2024" 
      };
      debugger
    this.outSideService.getTransferDataMiscelenius(data).subscribe((res) => {
   
      console.log(res.response.spouseKvsYnD)
      if (res.response != null || res.response == '') {
        this.patientAilmentData = res.response.patientAilment
        this.medicalCertificateIssueDateData = this.date.transform(res.response.medicalCertificateIssueDate, 'yyyy-MM-dd');
        this.singleParentGroundData = res.response.singleParentGround
        this.singleParentCertificateIssueDateData = this.date.transform(res.response.singleParentCertificateIssueDate, 'yyyy-MM-dd');
        this.deathOfFamilyGroundData = res.response.deathOfFamilyGround;
        this.careGiverRelationData = res.response.careGiverRelation,
        this.relationWithEmplMdgData = res.response.relationWithEmplMdg
        this.deathCertificateIssueDateData = this.date.transform(res.response.deathCertificateIssueDate, 'yyyy-MM-dd');
        this.miscellaneousForm.patchValue({
            id: res.response.id,
            teacherId: res.response.teacherId,
            applyTransferYn: res.response.applyTransferYn,
            disciplinaryYn: String(res.response.disciplinaryYn),
            absenceDaysOne: res.response.absenceDaysOne,
            positionOfNjcmRjcm: res.response.positionOfNjcmRjcm,
            nameOfFamilyMember: res.response.nameOfFamilyMember,
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
            singleParentGround: res.response.singleParentGround,
            spouseKvsYnD: String(res.response.spouseKvsYnD),
            careGiverFaimlyYnD:  String(res.response.careGiverFaimlyYnD),
            personalStatusMdgD: String(res.response.personalStatusMdgD),
            personalStatusDfpD:  String(res.response.personalStatusDfpD),
            personalStatusSpD: String(res.response.personalStatusSpD),
            memberJCM: String(res.response.memberJCM),
            surveHardYn: String(res.response.surveHardYn),
            spouseEmpCode: res.response.spouseEmpCode,
            spousePost: res.response.spousePost,
            spouseStation: res.response.spouseStation,
            patientName: res.response.patientName,
            patientHospital: res.response.patientHospital,
            patientMedicalOfficerName: res.response.patientMedicalOfficerName,
            patientMedicalOfficerDesignation: res.response.patientMedicalOfficerDesignation,
            careGiverName: res.response.careGiverName,
            careGiverDisabilityName: res.response.careGiverDisabilityName,
            careGiverDisabilityPrcnt: res.response.careGiverDisabilityPrcnt,
            childDifferentName: res.response.childDifferentName,
            childDifferentDisabilityName: res.response.childDifferentDisabilityName,
            childDifferentDisabilityPrcnt: res.response.childDifferentDisabilityPrcnt,
        })
      }

      
      // ---------------------------  declairation from radio button start  here ---------------------------------
      if (this.miscellaneousForm.value.spouseKvsYnD == 1 || this.miscellaneousForm.value.spouseKvsYnD == '1') {
       this.getSpouseDeatails();
      }
      if(this.miscellaneousForm.value.spouseKvsYnD == 0 ||  this.miscellaneousForm.value.spouseKvsYnD == '' )
      {
        this.gkFilebenefit = false;
        this.miscellaneousForm.patchValue({
          spouseKvsYnD: '0'
          })
      }
      if(this.miscellaneousForm.value.spouseKvsYnD == 'null'){
        this.getSpouseDeatails();
      }

      if (this.miscellaneousForm.value.personalStatusMdgD == 1) {
        this.gkFilemMedical = true
      } 
      if (this.miscellaneousForm.value.personalStatusMdgD ==0 || this.miscellaneousForm.value.personalStatusMdgD == '' || this.miscellaneousForm.value.personalStatusMdgD == 'null') {
        this.gkFilemMedical = false;
        this.miscellaneousForm.patchValue({
          personalStatusMdgD: '0'
          })
      }

      if (this.miscellaneousForm.value.personalStatusSpD == 1) {
        this.spGround = true
      } if ( this.miscellaneousForm.value.personalStatusSpD == 0 || this.miscellaneousForm.value.personalStatusSpD == '' || this.miscellaneousForm.value.personalStatusSpD == 'null') {
        this.spGround = false;
        this.miscellaneousForm.patchValue({
          personalStatusSpD: '0'
          })
      }
   
      if (this.miscellaneousForm.value.careGiverFaimlyYnD == 1) {
        this.careGiver = true
      }if (this.miscellaneousForm.value.careGiverFaimlyYnD == 0 || this.miscellaneousForm.value.careGiverFaimlyYnD == '' || this.miscellaneousForm.value.careGiverFaimlyYnD == 'null') {
        this.careGiver = false;
        this.miscellaneousForm.patchValue({
          careGiverFaimlyYnD: '0'
          })
      }

      if (this.miscellaneousForm.value.personalStatusDfpD == 1) {
        this.dfpGround = true
      }if ( this.miscellaneousForm.value.personalStatusDfpD == 0 || this.miscellaneousForm.value.personalStatusDfpD == '' || this.miscellaneousForm.value.personalStatusDfpD == 'null') { 
        this.dfpGround = false;
        this.miscellaneousForm.patchValue({
          personalStatusDfpD: '0'
          })
      }

      if (this.miscellaneousForm.value.memberJCM == 1 || this.miscellaneousForm.value.memberJCM == 2) {
        this.positionHeld = true
      } 
      if (this.miscellaneousForm.value.memberJCM == 0 || this.miscellaneousForm.value.memberJCM == '' || this.miscellaneousForm.value.memberJCM == 'null') {
        this.positionHeld = false
        this.miscellaneousForm.patchValue({
          memberJCM: '0'
          })
      }
      
    if (this.miscellaneousForm.value.disciplinaryYn == 0 || this.miscellaneousForm.value.disciplinaryYn == '' || this.miscellaneousForm.value.disciplinaryYn == 'null') {
    this.miscellaneousForm.patchValue({
      disciplinaryYn: '0'
      })
     }

     if (this.miscellaneousForm.value.surveHardYn == 0 || this.miscellaneousForm.value.surveHardYn == '' || this.miscellaneousForm.value.surveHardYn == 'null') {
      this.miscellaneousForm.patchValue({
        surveHardYn: '0'
        })
       }
    })
   
  }
  getSpouseDeatails(){
    var data ={
      "teacherId": this.tempTeacherId
    }
    debugger
    this.outSideService.getSpouseDetailsV2(data).subscribe((res)=>{ 
      console.log("-------spouse details----------------")
      console.log(res);

      if (res.response['spouse_name'] == '' || res.response['spouse_name'] ==null ) {
        this.gkFilebenefit = false;
        this.isDisabled = false;
        this.miscellaneousForm.patchValue({
          spouseKvsYnD: '0'
          })
      }
      else
      {
        this.gkFilebenefit = true;
        this.spouseName=res.response['spouse_name'],
        this.miscellaneousForm.patchValue({
          spouseName:res.response['spouse_name'],
          spouseStationName:res.response['spouse_station_name'],
          spouseKvsYnD: '1'
          })
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
  declarationtransferRelated6(event) {
    if (event.target.value == '1') {
      this.spGround = true;
    } else if (event.target.value == '0') {
      this.spGround = false;
    }
  }
  declarationtransferRelated7(event) {
    if (event.target.value == '1') {
      this.dfpGround = true;
    } else if (event.target.value == '0') {
      this.dfpGround = false;
    }
  }
  declarationtransferRelated4(event) {
    if (event.target.value == '1') {
      
      this.careGiver = true;
    } else if (event.target.value == '0') {
     
      this.careGiver = false;
    }
  }
  checkRjcmNjcm(val: any) {
    if (val == 'show') {
      this.positionHeld = true
    } else {
      this.positionHeld = false
    }
  }
  checkActiveStaty(event) {
    let regex = /^[0-9]*$/;
    if (regex.test(event.target.value) && event.target.value > -1) {
      return true
    } else {
      this.miscellaneousForm.patchValue({
          absenceDaysOne: '',
      });
      Swal.fire(
        'Alert !',
        'Only Numeric are allowed!',
        'error'
      )
    }
  }
  showSaveBuuton(event: any) {
    if (this.buttonVisible == true) {
      this.buttonVisible = false;
    } else {
      this.buttonVisible = true;
    }
  }
  onVerifyClick() {
    this.outSideService.getUpdatedFlag(this.tempTeacherId).subscribe((res) => {
      this.flagUpdatedList = res.response
    }, error => {
    })
    this.outSideService.fetchConfirmedTchDetails(this.responseData.teacherId).subscribe((res) => {
      this.verifyTchTeacherProfileData = res.response.teacherProfile
      this.verifyTchTeacherProfQualification = res.response.profestinalQualification
      this.teacherStationChioce = res.response.teacherTrainingProfile
      this.verifyTchTeacherAward = res.response.awards
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
  fileToRelatedFormUpload: File | null = null;
  handledeclarationRelatedFormFileInput(files: FileList, index) {
    var data = files.item(0).name
    var splitted = data.split('.', 2)
    if (splitted[1] == 'pdf' || splitted[1] == 'PDF') {
      if (files.item(0).size <= 512000) {
        this.fileToRelatedFormUpload = files.item(0);
        if (index == '0') {
          this.fileUpgkFilemMedical = true;
          this.enableUploadButtonRelatedForm0 = false;
        } else if (index == '1') {
          this.enableUploadButtonRelatedForm1 = false;
        } else if (index == '2') {
          this.fileUpcareGiver = true;
          this.enableUploadButtonRelatedForm2 = false;
        } else if (index == '3') {
          this.enableUploadButtonRelatedForm3 = false;
        } else if (index == '5') {
          this.fileUpgkFilebenefit = true;
          this.enableUploadButtonRelatedForm5 = false;
        } else if (index == '6') {
          this.fileUpspGround = true;
          this.enableUploadButtonRelatedForm6 = false;
        } else if (index == '7') {
          this.fileUpdfpGround = true;
          this.enableUploadButtonRelatedForm7 = false;
        } else if (index == '8') {
          this.fileUppositionHeld = true;
          this.enableUploadButtonRelatedForm8 = false;
        }
      } else {
        this.fileToRelatedFormUpload = null;
        Swal.fire(
          'File size allowed upto 500KB only !',
          '',
          'error'
        )
        if (index == '0') {
        
          this.fileUpgkFilemMedical = false;
          this.enableUploadButtonRelatedForm0 = true;
        } else if (index == '1') {
          this.enableUploadButtonRelatedForm1 = true;
        } else if (index == '2') {
          this.fileUpcareGiver = false;
          this.enableUploadButtonRelatedForm2 = true;
        } else if (index == '3') {
          this.enableUploadButtonRelatedForm3 = true;
        } else if (index == '5') {
          this.fileUpgkFilebenefit = false;
          this.enableUploadButtonRelatedForm5 = true;
        } else if (index == '6') {
          this.fileUpspGround = false;
          this.enableUploadButtonRelatedForm6 = true;
        } else if (index == '7') {
          this.fileUpdfpGround = false;
          this.enableUploadButtonRelatedForm7 = true;
        } else if (index == '8') {
          this.fileUppositionHeld = false;
          this.enableUploadButtonRelatedForm8 = true;
        }
      }
    } else {
      this.fileToRelatedFormUpload = null;
      Swal.fire(
        'Only PDF file can be uploaded',
        '',
        'error'
      )
      if (index == '0') {
        this.fileUpgkFilemMedical = false;
        this.enableUploadButtonRelatedForm0 = true;
      } else if (index == '1') {
        this.enableUploadButtonRelatedForm1 = true;
      } else if (index == '2') {
        this.fileUpcareGiver = false;
        this.enableUploadButtonRelatedForm2 = true;
      } else if (index == '3') {
        this.enableUploadButtonRelatedForm3 = true;
      } else if (index == '5') {
        this.fileUpgkFilebenefit = false;
        this.enableUploadButtonRelatedForm5 = true;
      } else if (index == '6') {
        this.fileUpspGround = false;
        this.enableUploadButtonRelatedForm6 = true;
      } else if (index == '7') {
        this.fileUpdfpGround = false;
        this.enableUploadButtonRelatedForm7 = true;
      } else if (index == '8') {
        this.fileUppositionHeld = false;
        this.enableUploadButtonRelatedForm8 = true;
      }
    }
  }
  documentUploadRelatedForm(index) {
    const formData = new FormData();
    if (this.fileToRelatedFormUpload != null) {
      formData.append('teacherId', this.tempTeacherId);
      formData.append('file', this.fileToRelatedFormUpload);
      if (index == 0) {
        this.fileUpgkFilemMedical = true;
        formData.append('filename', "Medical_Certificate");
      } else if (index == 1) {
        formData.append('filename', "Board_examination_Proof");
      } else if (index == 2) {
        this.fileUpcareGiver = true;
        formData.append('filename', "Disability_Certificate");
      } else if (index == 3) {
        formData.append('filename', "Differentially_Abled_Certificate");
      } else if (index == 5) {
        this.fileUpgkFilebenefit = true;
        formData.append('filename', "Spouse_Declaration");
      } else if (index == 6) {
        this.fileUpspGround = true;
        formData.append('filename', "Single_Parent_Declaration");
      } else if (index == 7) {
        this.fileUpdfpGround = true;
        formData.append('filename', "DFP_Declaration");
      } else if (index == 8) {
        this.fileUppositionHeld = true;
        formData.append('filename', "NJCM_RJCM_Declaration");
      }

      this.outSideService.uploadDocument(formData).subscribe((res) => {
        this.outSideService.fetchUploadedDoc(this.tempTeacherId).subscribe((res) => {
          this.documentUploadArray = res;
          // alert(JSON.stringify(this.documentUploadArray));
          for (let i = 0; i < res.length; i++) {

            if (res[i].docName == 'Medical_Certificate.pdf') {
              this.fileUpgkFilemMedical = false;
              this.deleteDeclairaionFormDocUpdate0 = false;
            }
            if (res[i].docName == 'Board_examination_Proof.pdf') {
              this.deleteDeclairaionFormDocUpdate1 = false;
            }
            if (res[i].docName == 'Disability_Certificate.pdf') {
              this.fileUpcareGiver = false;
              this.deleteDeclairaionFormDocUpdate2 = false;
            }
            if (res[i].docName == 'Differentially_Abled_Certificate.pdf') {
              this.deleteDeclairaionFormDocUpdate3 = false;
            }
            if (res[i].docName == 'Spouse_Declaration.pdf') {
              this.deleteDeclairaionFormDocUpdate5 = false;
              this.fileUpgkFilebenefit = false;
            }
            if (res[i].docName == 'Single_Parent_Declaration.pdf') {
              this.fileUpspGround = false;
              this.deleteDeclairaionFormDocUpdate6 = false;
            }
            if (res[i].docName == 'DFP_Declaration.pdf') {
              this.fileUpdfpGround = false;
              this.deleteDeclairaionFormDocUpdate7 = false;
            }
            if (res[i].docName == 'NJCM_RJCM_Declaration.pdf') {
              this.fileUppositionHeld = false;
              this.deleteDeclairaionFormDocUpdate8 = false;
            }

          }
        })
        this.fileUpload = false;
        Swal.fire(
          'Document Upload Sucessfully',
          '',
          'success'
        )

        this.documentUploadArray[index] = { "docName": res.response.docName, "url": res.response.url };
        if (index == 0) {
          this.deleteDeclairaionFormDocUpdate0 = false
        } else if (index == 1) {
          this.deleteDeclairaionFormDocUpdate1 = false
        } else if (index == 2) {
          this.deleteDeclairaionFormDocUpdate2 = false
        } else if (index == 3) {
          this.deleteDeclairaionFormDocUpdate3 = false
        } else if (index == 5) {
          this.deleteDeclairaionFormDocUpdate5 = false
        } else if (index == 6) {
          this.deleteDeclairaionFormDocUpdate6 = false
        } else if (index == 7) {
          this.deleteDeclairaionFormDocUpdate7 = false
        } else if (index == 8) {
          this.deleteDeclairaionFormDocUpdate8 = false
        }
      })
    } else {
      Swal.fire(
        'Select PDF to be uploaded !',
        '',
        'error'
      )
    }
    this.fileToRelatedFormUpload = null;
  }


  getEmployeeData(){
    var data={
     "teacherEmployeeCode":this.employeeCode
    }
      this.outSideService.getEmployeeDetailV2(data).subscribe((res)=>{
      this.emplyeeData=res.response;
      
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

  getDocumentByTeacherId() {
    this.outSideService.fetchUploadedDoc(this.tempTeacherId).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        var token = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.token
        if(JSON.stringify(res[i]) !="{}" && res[i]?.url !='undefined' && res[i]?.url.length>0){
          res[i].url=res[i].url+"&docId="+token+"&username="+JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;;
      }
        if (res[i].docName == 'Medical_Certificate.pdf') {
          this.fileUpgkFilemMedical=false;
          this.deleteDocUpdate0 = false;
          this.medicalDocName = res[i].docName;
          this.medicalDocURLName = res[i].url;
        }
        if (res[i].docName == 'Board_examination_Proof.pdf') {
          this.deleteDocUpdate1 = false;
        }
        if (res[i].docName == 'Disability_Certificate.pdf') {
          this.fileUpcareGiver = false;
          this.deleteDocUpdate2 = false;
          this.disabilityCertiDocName = res[i].docName;
          this.disabilityCertiDocURLName = res[i].url
        }
        if (res[i].docName == 'Differentially_Abled_Certificate.pdf') {
          this.deleteDocUpdate3 = false;
        }

        if (res[i].docName == 'Spouse_Declaration.pdf') {
         // alert(res[i].url)
          this.fileUpgkFilebenefit = false;
          this.deleteDocUpdate0 = false;
      this.spouseDeclarationDocUrlName = res[i].url
        }  

        if (res[i].docName == 'Single_Parent_Declaration.pdf') {
          this.fileUpspGround = false;
          this.singleParentDocName = res[i].docName;
          this.singleParentDocURLName = res[i].url;
        }

        if (res[i].docName == 'DFP_Declaration.pdf') {
          this.fileUpdfpGround = false;
          this.dFPDocName = res[i].docName;
          this.dFPDocURLName = res[i].url;
        }
        if (res[i].docName == 'NJCM_RJCM_Declaration.pdf') {
          this.fileUppositionHeld = false;
          this.nJCMRJCMDocName = res[i].docName;
          this.nJCMRJCMDocURLName = res[i].url;
        }
       
        if (res[i].docName == 'Disability_Certificate.pdf') {
          this.deleteDocUpdate2 = false;
        }
      }
      this.documentUploadArray = res;
      //this.documentUploadArray = res;
    })
  }

  previousPage(){
    this.router.navigate(['/teacher/teacher-transfer-dashboard']);
  }
  next(){
    this.router.navigate(['/teacher/kvsTchStationChoice']);
  }
  submit(){
    debugger
    this.miscellaneousForm.patchValue({
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
        this.outSideService.saveTransProfile(this.miscellaneousForm.value).subscribe((res)=>{
            console.log(res)
            if (res.status == 1) {
              Swal.fire(
                'Your Data has been saved Successfully!',
                '',
                'success'
              )
              this.router.navigate(['/teacher/kvsTchStationChoice']);
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


