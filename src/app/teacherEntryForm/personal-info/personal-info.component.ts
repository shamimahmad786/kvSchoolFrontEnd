import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherAppPdfService } from 'src/app/kvs/makePdf/teacher-app-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { DataService } from '../service/internalService/data-service';
import { DatePipe } from '@angular/common';
import { FormDataService } from '../service/internalService/form-data.service';
import { DateAdapter } from '@angular/material/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  personalInfoForm:FormGroup;
  districListByStateIdC: any = [];
  districListByStateIdP: any = [];
  stateMasterList: any;
  isVisible: boolean = false;
  isVisibleBirth: boolean = false;
  documentUploadArray: any[] = [];
  fileUpload: boolean = true;
  responseData: any;
  loginUserNameForChild: any;
  kvicons: any;
  kvCode: any;
  applicationId: any;
  deleteDocUpdate0: boolean = true;
  deleteDocUpdate1: boolean = true;
  deleteDocUpdate2: boolean = true;
  deleteDocUpdate3: boolean = true;
  deleteDocUpdate4: boolean = true;
  marriedStatusYN: boolean = false;
  medicalDocName:any;
  medicalDocURLName:any;
  fileUpgkFilemMedical: boolean = true;
  fileUpcareGiver: boolean = true;
  disabilityCertiDocName:any;
  disabilityCertiDocURLName:any;
  fileUpspGround: boolean = true;
  singleParentDocName:any;
  singleParentDocURLName:any;
  fileUpdfpGround: boolean = true;
  dFPDocName:any;
  dFPDocURLName:any;
  fileUppositionHeld: boolean = true;
  nJCMRJCMDocName:any;
  nJCMRJCMDocURLName:any;
  spouseKVSStation: boolean = false;
  spouseNone: boolean = false;
  fileUpgkFilebenefit: boolean = true;
  spouseDeclarationDocUrlName:any;
  teacherTypeData: any;
  teacherTypeDataNameCode: any = [];
  spouseTypeData: any;
  spouseTypeDataNameCode: any;
@ViewChild('Physically_Handicap_Certificate')Physically_Handicap_Certificate: ElementRef;
  @ViewChild('selectSpouseStationModal', { static: true }) selectSpouseStationModal: TemplateRef<any>;
  constructor(private pdfServive: TeacherAppPdfService,private router: Router,private date: DatePipe, private dataService: DataService,
    private modalService: NgbModal, private outSideService: OutsideServicesService,
    private route: ActivatedRoute, private fb: FormBuilder, private formData: FormDataService, private _adapter: DateAdapter<any>) {
    }

  ngOnInit(): void {
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
     
    }
    if (sessionStorage.getItem('responseData') == null) {
      this.responseData = JSON.parse(sessionStorage.getItem('singleKvTeacher'))
      sessionStorage.setItem('systemTeacherCode', this.responseData.teacherSystemGeneratedCode)
     
    
    } else {
      this.responseData = JSON.parse(sessionStorage.getItem('responseData'))
      sessionStorage.setItem('systemTeacherCode', this.responseData.teacherSystemGeneratedCode)
      if (this.responseData?.teacherDisabilityYn == "1") {
      
        if (this.responseData?.teacherDisabilityFromBirthYn == "0") {
        
        }
      }
    }
    this.personalInfoForm= this.fb.group({
      'disabilityYN': new FormControl('', Validators.required),
      'disabilityType': new FormControl('', Validators.required),
      'disabilityFromBirthYN': new FormControl(''),
      'disabilityDate': new FormControl(''),
      'disabilityPercentage': new FormControl(''),
      'disabilityCertAuth': new FormControl(''),
      'disabilityCertNo': new FormControl(''),
      'crspndncAddress': new FormControl('', Validators.required),
      'crspndncState': new FormControl('', Validators.required),
      'crspndncDistrict': new FormControl('', Validators.required),
      'crspndncPinCode': new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]),
      'prmntAddress': new FormControl('', Validators.required),
      'prmntState': new FormControl('', Validators.required),
      'prmntDistrict': new FormControl('', Validators.required),
      'prmntPinCode': new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]),
      'personalIdNo': new FormControl(''),
      'aadhaarNo': new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.minLength(14), Validators.maxLength(14)]),
      'passportNo': new FormControl('', [Validators.pattern("^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$")]),
      'spouseStatusF': new FormControl('', Validators.required),
      'spouseEmpCode': new FormControl('', Validators.required),
      'spouseName': new FormControl('', Validators.required),
      'spousePost': new FormControl('', Validators.required),
      'spouseStationCode': new FormControl(''),
      'spouseStationName': new FormControl('', Validators.required),
      'maritalStatusF': new FormControl('', Validators.required),
      'spouseStatusKVS': new FormControl('', Validators.required),
      'spouseStatusCentral': new FormControl('', Validators.required),
      'spouseStatusState': new FormControl('', Validators.required),
      'spouseStatusNone': new FormControl('', Validators.required),
      'sameAbove': new FormControl(),
    });
    this.getStateMaster();
    this.getAllMaster();
  }
  getStateMaster() {
    this.outSideService.fetchStateMaster("a").subscribe((res) => {
      debugger
      this.stateMasterList = res.response.rowValue;
    })
  }
  getDistrictListByStateId(event, data) {
    if (data == 'C') {
      this.districListByStateIdC = [];
      this.personalInfoForm.patchValue({
          crspndncPinCode: '',
          sameAbove: false
      });
      this.enableDisableAddress('enable');
    } else if (data == 'P') {
      this.districListByStateIdP = [];
      this.personalInfoForm.patchValue({
          prmntPinCode: ''
      })
    }
    this.getDistrictByStateId(event.target.value, data);
  }
  enableDisableAddress(val) {
    if (val == 'disable') {
      this.personalInfoForm.get('prmntAddress').disable();
      this.personalInfoForm.get('prmntState').disable();
      this.personalInfoForm.get('prmntDistrict').disable();
      this.personalInfoForm.get('prmntPinCode').disable();
    } else if (val == 'enable') {
      this.personalInfoForm.get('prmntAddress').enable();
      this.personalInfoForm.get('prmntState').enable();
      this.personalInfoForm.get('prmntDistrict').enable();
      this.personalInfoForm.get('prmntPinCode').enable();
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
  pDistrictChange(value) {
    //this.responseData.teacherPermanentDistrict = value;
  }
  onClickDisability(val) {
    if (val == 'yes') {
      this.isVisible = true;
    } else if (val == 'no') {
      this.isVisible = false;
      this.personalInfoForm.patchValue({

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
  fileToUpload: File | null = null;
  documentUpload(index) {
    this.fileUpload = true;
    const formData = new FormData();
    if (this.fileToUpload != null) {
      formData.append('teacherId', this.responseData.teacherId);
      formData.append('file', this.fileToUpload);
      if (index == 0) {
        formData.append('filename', "Medical_Certificate");
      } else if (index == 1) {
        formData.append('filename', "Board_examination_Proof");
      } else if (index == 2) {
        formData.append('filename', "Disability_Certificate");
      } else if (index == 3) {
        formData.append('filename', "Differentially_Abled_Certificate");
      } else if (index == 4) {
        formData.append('filename', "Physically_Handicap_Certificate");
      }
      this.outSideService.uploadDocument(formData).subscribe((res) => {
        this.fileUpload = false;
        Swal.fire(
          'Document Upload Sucessfully',
          '',
          'success'
        )
        this.documentUploadArray[index] = { "docName": res.response.docName, "url": res.response.url };

        if (index == 0) {
          this.deleteDocUpdate0 = false
        } else if (index == 1) {
          this.deleteDocUpdate1 = false
        } else if (index == 2) {
          this.deleteDocUpdate2 = false
        } else if (index == 3) {
          this.deleteDocUpdate3 = false
        } else if (index == 4) {
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
    this.outSideService.fetchUploadedDoc(this.responseData.teacherId).subscribe((res) => {
      this.documentUploadArray = res;
      for (let i = 0; i < res.length; i++) {

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
      
        if (res[i].docName == 'Physically_Handicap_Certificate.pdf') {
          this.fileUpload = false;
          this.Physically_Handicap_Certificate.nativeElement.value = "";
        }
        
        if (res[i].docName == 'Disability_Certificate.pdf') {
          this.deleteDocUpdate2 = false;
        }
      }
    })
  }

  maritalStatusCheck(event) {
    if (event.target.value == '1') {
      this.responseData.maritalStatus = '1'
      this.responseData.spouseStatus = '5'
      this.marriedStatusYN = true;
      this.personalInfoForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: '',
          spouseStatusF: '5'
      })
    } else if (event.target.value == '7') {
      this.responseData.maritalStatus = '7'
      this.responseData.spouseStatus = '5'
      this.marriedStatusYN = false;
      this.spouseKVSStation = false;
      this.spouseNone = false;
      this.personalInfoForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: '',
          spouseStatusF: '5'
      })
    }
    else if (event.target.value == '4') {
      this.responseData.maritalStatus = '4'
      this.responseData.spouseStatus = '5'
      this.marriedStatusYN = false;
      this.spouseKVSStation = false;
      this.spouseNone = false;
      this.personalInfoForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: '',
          spouseStatusF: '5'
      })
      if (this.personalInfoForm.value.gender == '2') {
        this.responseData.spouseStatus = '4'
        this.personalInfoForm.patchValue({
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
  onSpouseClick(event) {
    if (event.target.value == '1') {
      this.spouseNone = true;
      this.spouseKVSStation = true;
      this.personalInfoForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
      })
    } else if (event.target.value == '2') {
      this.spouseNone = true;
      this.spouseKVSStation = false;
      this.personalInfoForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
      })
    } else if (event.target.value == '3') {
      this.spouseNone = true;
      this.spouseKVSStation = false;
      this.personalInfoForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
      })
    } else if (event.target.value == '5') {
      this.spouseNone = false;
      this.spouseKVSStation = false;
      this.personalInfoForm.patchValue({
          spouseStationName: '',
          spousePost: '',
          spouseStationCode: '',
          spouseName: '',
          spouseEmpCode: ''
      })
    }
  }
  getAllMaster() {
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
    })

    this.outSideService.fetchAllMaster(1).subscribe((res) => {

      this.spouseTypeData = res.response.postionType;
      this.spouseTypeDataNameCode = [];
      for (let i = 0; i < this.spouseTypeData.length; i++) {
        var concatElement;
        concatElement = this.spouseTypeData[i].organizationTeacherTypeName;
        concatElement = concatElement + "(" + this.spouseTypeData[i].teacherTypeId + ")";
        var data = {
          'nameCode': concatElement,
          'teacherTypeId': this.spouseTypeData[i].teacherTypeId
        }
        this.spouseTypeDataNameCode.push(data)
      }
    })
  }
  selectSpouseStation() {
    this.modalService.open(this.selectSpouseStationModal, { size: 'small', backdrop: 'static', keyboard: false })
  }
  addOrPinChange(val) {
    this.personalInfoForm.patchValue({
        sameAbove: false
    });
    this.enableDisableAddress('enable')
  }
  cDistrictChange(value) {
    this.personalInfoForm.patchValue({
        crspndncPinCode: '',
        sameAbove: false
    })
    this.responseData.teacherCorrespondenceDistrict = value;
    this.enableDisableAddress('enable');
  }
  previousPage(){
    debugger
    this.router.navigate(['/teacher/basicProfile']);
  }
  submit(){
    debugger
    this.router.navigate(['/teacher/workExperience']);
  }
}
