import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from 'src/app/teacherEntryForm/teacher-entry-form/teacher-entry-form.component';
declare const srvTime: any;
declare var $: any;
@Component({
  selector: 'app-admin-transfer-module',
  templateUrl: './admin-transfer-module.component.html',
  styleUrls: ['./admin-transfer-module.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AdminTransferModuleComponent implements OnInit { 
  displayedColumns = ['Sno', 'name','kv_code','is_admin_transfer','kv_name_alloted','join_date','relieve_date','transfer_under_cat','Action'];
  testData = { "sno": "", "employeecode": "", "name":"" ,"email": "", "teacher_dob": "","transfer_type":"","is_admin_transfer":"","kv_name_alloted":"","kv_code":"","join_relieve_flag":"","join_date": "","allot_stn_code": "","allot_kv_code": "","work_experience_appointed_for_subject": "","last_promotion_position_type": "","relieve_date": "","emp_transfer_status": "","transferred_under_cat":"","transferStatusAction":"","presentKvName":"","presentKvCode":"","presentStationName":"","presentStationCode":"","teacherId":"","presentRegionName":"","transferStatusOneComplite":""}
  dataSource:any;
  userMappingSource : MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('userMappingSort') userMappingSort: MatSort;    
  @ViewChild('AdminTransferBox', { static: true }) AdminTransferBox: TemplateRef<any>;
  @ViewChild('AdminCancelBox', { static: true }) AdminCancelBox: TemplateRef<any>;
  @ViewChild('AdminMdificationBox', { static: true }) AdminMdificationBox: TemplateRef<any>;
  @ViewChild('AdminViewBox', { static: true }) AdminViewBox: TemplateRef<any>;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  adminTransferForm: FormGroup;
  adminTransferEditForm: FormGroup;
  modificationEditForm: FormGroup;
  cancelEditForm: FormGroup;
  shiftList=[{'value':'0','type':'Modification in Transfer'},{'value':'1','type':'Administrative Transfer'},{'value':'2','type':'Cancel Transfer'}];
  loginUserNameForChild: any;
  adminTransferMangement: any=[];
  allRegionStationDeatils: any=[];
  businessUnitTypeId: any;
  selectRegionList: any=[];
  stationList: any=[];
  kvSchoolList: any=[];
  searchKeyArray: any[] = [];
  formDataList:any;
  transferGroundList: any;
  transferGroundValue: any;
  totalLength: any;
  showTransferEditForm:boolean = false;
  kvRegionSchoolZietHqName: any;
  editEmpName: any;
  editEmpCode: any;
  email: any;
  kvCode: any;
  dob: any;
  transferType: any;
  presentKvName: any;
  presentKvCode: any;
  PresentStationName: any;
  PresentRegionName: any;
  editCancelEmpName: any;
  editCancelEmpCode: any;
  cancelEmail: any;
  cancelkvCode: any;
  canceldob: any;
  showRegion:boolean = false;
  showSchool:boolean = false;
  showZiet:boolean = false;
  showHq:boolean = false;
  twoRowsFind:boolean = false;
  verifyTchTeacherWorkExp:any;
  showCategory: boolean;
  modiFYTransferType: string;
  editModifyEmpCode: any;
  editModifyEmpName: any;
  editeModifyTransferType: string;
  selectHeadQuaterZoneRegion:boolean = false;
  //transferStatusOneComplite:boolean = false;
  selectSchoolType: any;
  ModifyEmail: any;
  ModifykvCode: any;
  ModifykvName: any;
  Modifydob: any;
  joinDate: any;
  reliveDate: any;
  editeAllotedTransferType: string;
  editAllotedModifyEmpName: any;
  editAllotedModifyEmpCode: any;
  editAllotedModifyEmail: any;
  editAllotedModifykvCode: any;
  editAllotedModifykvName: any;
  editAllotedModifydob: any;
  editAllotedModifyJoindate: any;
  editAllotedModifyrelivedate: any;
  headQuaterList: any = [];   
  zoneList: any = [];
  manualEmpCodeSearch: any = [];
  employeeInstituteType: any;
  selecttedRegionName: any;
  returnTypeSrvTime: any;
  selecttedRegionCode: any;
  selectStationCode: any;
  selectStationName: any;
  selectedKvCode: any;
  selectedKvname: any;
  selectedShiftYN: any;
  school_id:any;
  canclKvName: any;
  teacherDob: any;
  teacherEmail: any;
  maxDate:any;
  presentKvNameViewModal: any;
  presentKvCodeViewModal: any;
  allotedKvCodeViewModal: any;
  teacherDobViewModal: any;
  teacherEmailViewModal: any;
  editModifyEmpCodeViewModal: any;
  editModifyEmpNameViewModal: any;
  adminTransType: any;
  tagInput: string = '';
  tags: string[] = [];
  transferOrderNumber:any;
  searchData: any;
  constructor(private outSideService: OutsideServicesService,private modalService: NgbModal,private formData: FormDataService) { }

  ngOnInit(): void {
    console.log(this)
    this.returnTypeSrvTime = srvTime();
    var date = new Date(this.returnTypeSrvTime),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    this.maxDate =  [date.getFullYear(), mnth, day].join("-");
    this.formDataList = this.formData.formData();
    this.transferGroundList = this.formDataList.transferGround
    console.log(this.formDataList)
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.businessUnitTypeId= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_id;
    }
    this.adminTransferEditForm = new FormGroup({
      'transferRegion': new FormControl(''),
      "transferStation":  new FormControl(''),
      "transferSchool": new FormControl(''),
      "transferGround": new FormControl(''),
      "TransferZiet": new FormControl(''),
      "TransferHeadquater": new FormControl(''),
      "TransferRegionZietHq": new FormControl(''),
      "transferOrderNumber": new FormControl(''),
      "transferOrderdate": new FormControl(''),
      "transferYear": new FormControl(''),
    });

    this.adminTransferForm = new FormGroup({
      'employeeCode': new FormControl(''),
      'name': new FormControl(''),
      'dob': new FormControl(''),
      'mobileNo':new FormControl(''),
      'email': new FormControl(''),
    });

    this.modificationEditForm = new FormGroup({
      'modifyTransferRegion':  new FormControl(''),
      "modifyTransferStation": new FormControl(''),
      "modifyTransferSchool": new FormControl(''),
      "modifyTransferGround":  new FormControl(''),
      "modifyTransferZiet":new FormControl(''),
      "modifyTransferHeadquater":new FormControl(''),
      "ModifyTransferRegionZietHq": new FormControl(''),
      "transferOrderNumber": new FormControl(''),
      "transferOrderdate": new FormControl(''),
      "transferYear": new FormControl(''),
    });
    this.cancelEditForm = new FormGroup({
      'cancelTransferOrderNumber':  new FormControl(''),
      'cancelTransferOrderdate':  new FormControl(''),
    });
    this.getTransferGround();
    this.gettransferOrderNumber();
  }
  gettransferOrderNumber(){
    this.outSideService.getUploadedDocument().subscribe((res)=>{
     console.log("transfer Order number")
     console.log(res)
      if(res.length>0){
          this.transferOrderNumber=res;
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
  applyFilterHBSource(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.userMappingSource.filter = filterValue;
    this.totalLength = this.userMappingSource.filteredData.length;
  }
  disableDate() { 
    return false; 
} 
addKey(txt:any){
  this.searchKeyArray.push(txt)
  console.log(this.searchKeyArray)
}
removeKey(txt:any){
  alert("ddfdfffdfd")
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
removeTag(tagToRemove: string) {
  this.tags = this.tags.filter(tag => tag !== tagToRemove);
  console.log(this.tags)
}
  //********************** Function Use for Admin Transfer Modal*****************************
  openTransfermodal(empName:any,empCode:any,email:any,kvCode:any,dob:any,presentKvName:any,presentKvCode:any,PresentStationName:any,PresentRegionName:any) {

    this.showTransferEditForm=false;
     this.kvRegionSchoolZietHqName='';
     this.editEmpName=empName;
     this.editEmpCode=empCode;
     this.email=email;
     this.kvCode=kvCode;
     this.dob=dob;
     this.transferType=9999;
     this.presentKvName =presentKvName;
     this.presentKvCode = presentKvCode;
     this.PresentStationName = PresentStationName;
     this.PresentRegionName = PresentRegionName;
     this.modalService.open(this.AdminTransferBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
   }
   openCancelmodal(empName:any,empCode:any,email:any,kvName:any,kvCode:any,dob:any){
   
     this.editCancelEmpName=empName;
     this.editCancelEmpCode=empCode;
     this.cancelEmail=email;
     this.cancelkvCode=kvCode;
     this.canclKvName=kvName;
     this.canceldob=dob;
     this.modalService.open(this.AdminCancelBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
   }
 

   openModificationmodal(empCode:any,empName:any,presentKvName:any,presentKvCode:any,PresentStationName:any,PresentRegionName:any,teacherDob:any,teacherEmail:any){
    this.modificationEditForm.patchValue({
      modifyTransferRegion: '',
      modifyTransferStation: '',
      modifyTransferSchool: '',
      modifyTransferGround: '',
      modifyTransferZiet: '',
      modifyTransferHeadquater: '',
      ModifyTransferRegionZietHq: '',
      transferOrderNumber: '',
      transferOrderdate: '',
  })
    this.kvRegionSchoolZietHqName='';
    this.presentKvName =presentKvName;
    this.presentKvCode = presentKvCode;
    this.PresentStationName = PresentStationName;
    this.PresentRegionName = PresentRegionName;
    this.showTransferEditForm=false;
    this.showRegion=false;
    this.showSchool=false;
    this.showZiet=false;
    this.showHq=false;
    this.showCategory=false;
    this.modiFYTransferType='';
    this.transferType=9999;
    this.teacherDob=teacherDob;
    this.teacherEmail=teacherEmail;
    this.editModifyEmpCode=empCode;
    this.editModifyEmpName=empName;
    let req={"empCode":this.editModifyEmpCode};
 
    this.outSideService.getModifiedTransferDetails(req,this.loginUserNameForChild).subscribe((res) => {
      this.adminTransType = res['rowValue'].map(function(el) {
        var o = Object.assign({}, el);
        if(o.is_admin_transfer==true){
          o.addTransType = 'Admin';
        }
        if(o.is_automated_transfer==true){
          o.addTransType = 'Transfer Policy (2023)';
        }
        return o;
      })
    })
    this.modalService.open(this.AdminMdificationBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
  }
  openViewModal(teacherId:any,empName:any,empCode:any,email:any,kvName:any,kvCode:any,dob:any){
  
      this.presentKvNameViewModal='';
      this.presentKvCodeViewModal='';
      this.allotedKvCodeViewModal='';
      this.teacherDobViewModal='';
      this.teacherEmailViewModal='';
      this.editModifyEmpCodeViewModal='';
      this.editModifyEmpNameViewModal='';
      this.presentKvNameViewModal =kvName;
      this.presentKvCodeViewModal = kvCode;
      this.teacherDobViewModal=dob;
      this.teacherEmailViewModal=email;
      this.editModifyEmpCodeViewModal=empCode;
      this.editModifyEmpNameViewModal=empName;
      this.outSideService.fetchConfirmedTchDetails(teacherId).subscribe((res) => {
        for (let i = 0; i < res.response.experience.length; i++) {
          if (res.response.experience[i].workEndDate != null || res.response.experience[i].workEndDate != null) {
            res.response.experience[i].workEndDate = res.response.experience[i].workEndDate;
          }
          res.response.experience[i].workStartDate = res.response.experience[i].workStartDate;
        }
        this.verifyTchTeacherWorkExp = res.response.experience
      })
      this.modalService.open(this.AdminViewBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
    }
  getTransferGround(){
    let req={};
    this.outSideService.getTransferGround(req,this.loginUserNameForChild).subscribe((res) => {
     console.log("-----get cat---------------")
     console.log(res['response'])
     this.transferGroundValue=res['response']
    })
  }


  
  selectInstituteType(event:any){
    this. headQuaterList=[];
    this.zoneList=[];
    this.kvSchoolList=[];
    this.stationList=[];
    this.selectRegionList=[];
    this.transferGroundValue=[];
    this.kvRegionSchoolZietHqName='';
    this.showTransferEditForm=true;
    this.employeeInstituteType='';
    this.employeeInstituteType=event.target.value;
    this.showCategory=true;
   //Region
   if(this.employeeInstituteType=='3'){
     this.showRegion=true;
     this.showSchool=false;
     this.showZiet=false;
     this.showHq=false;
     this.selectHeadQuaterZoneRegion = true
   }
   //School
   if(this.employeeInstituteType=='1'){
     this.showRegion=false;
     this.showSchool=true;
     this.showZiet=false;
     this.showHq=false;
     this.selectHeadQuaterZoneRegion = false
   }
   //Ziet
   if(this.employeeInstituteType=='2'){
     this.showRegion=false;
     this.showSchool=false;
     this.showZiet=true;
     this.showHq=false;
     this.selectHeadQuaterZoneRegion = true
   }
   //Hq
   if(this.employeeInstituteType=='4'){
     this.showRegion=false;
     this.showSchool=false;
     this.showZiet=false;
     this.showHq=true;
     this.selectHeadQuaterZoneRegion = true
   }
   if(this.employeeInstituteType=='1')
   {
     var data: any = {
       "extcall": "MOE_EXT_GET_HQ_REG_ZN",
       "conditionvalue": [3]
     }
   }
   else{
     var data: any = {
       "extcall": "MOE_EXT_GET_HQ_REG_ZN",
       "conditionvalue": [event.target.value]
     }
   }
   this.getTransferGround();
   this.getMaster(data, event.target.value);
   }
  getMaster(data, schoolType) {
    this.selectRegionList=[];
    this.selectSchoolType = schoolType;
    this.outSideService.getMasterData(data).subscribe((res: any) => {
      if (schoolType == 4) {
        this.headQuaterList = res.response.rowValue;
      }
      else if (schoolType == 2) {
        this.zoneList = res.response.rowValue;
      } else if (schoolType == 3) {
        this.selectRegionList = res.response.rowValue;
      } else if (schoolType == 1) {
        this.selectRegionList = res.response.rowValue;
      }
      console.log(this.selectRegionList)
    })
  }

  getStationByHqId(id: any) {
    this.kvRegionSchoolZietHqName = '';
    this.selecttedRegionName='';
    this.selecttedRegionCode='';
    this.selectStationCode='';
    this.selectStationName='';
    this.selectedKvCode='';
    this.selectedKvname='';
    this.selectedShiftYN='';
  if (this.selectSchoolType == 4) {

    for (let i = 0; i < this.headQuaterList.length; i++) {
      if (this.headQuaterList[i].kv_code == id.target.value) {
        this.selecttedRegionName =this.headQuaterList[i].region_name
        this.selecttedRegionCode =this.headQuaterList[i].region_code
        this.selectStationCode =this.headQuaterList[i].station_code
        this.selectStationName =this.headQuaterList[i].station_name
        this.selectedKvCode = this.headQuaterList[i].kv_code
        this.selectedKvname = this.headQuaterList[i].kv_name
        this.selectedShiftYN='';
        this.kvRegionSchoolZietHqName = this.headQuaterList[i].station_name
      }
    }
  }
  else if (this.selectSchoolType == 2) {
    for (let i = 0; i < this.zoneList.length; i++) {
      if (this.zoneList[i].kv_code == id.target.value) {

        this.selecttedRegionName =this.zoneList[i].region_name
        this.selecttedRegionCode =this.zoneList[i].region_code
        this.selectStationCode =this.zoneList[i].station_code
        this.selectStationName =this.zoneList[i].station_name
        this.selectedKvCode = this.zoneList[i].kv_code
        this.selectedKvname = this.zoneList[i].kv_name
        this.selectedShiftYN='';
        this.kvRegionSchoolZietHqName = this.zoneList[i].station_name
      }
    }
  }
  else if (this.selectSchoolType == 3) {
    for (let i = 0; i < this.selectRegionList.length; i++) {
      if (this.selectRegionList[i].region_code == id.target.value) {
        this.selecttedRegionName =this.selectRegionList[i].region_name
        this.selecttedRegionCode =this.selectRegionList[i].region_code
        this.selectStationCode =this.selectRegionList[i].station_code
        this.selectStationName =this.selectRegionList[i].station_name
        this.selectedKvCode = this.selectRegionList[i].kv_code
        this.selectedKvname = this.selectRegionList[i].kv_name
        this.selectedShiftYN='';
        this.kvRegionSchoolZietHqName = this.selectRegionList[i].region_name
      }
    }
  }
}
  clear(){
    this.tags=[];
    this.adminTransferMangement=[];
    this.totalLength ='';
    this.dataSource = new MatTableDataSource(this.adminTransferMangement);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.userMappingSort;
    this.adminTransferForm.patchValue({
      employeeCode: '',
      name: '',
      dob: '',
      email: '',
      mobileNo: '',
  });
}
  //***************Function user for search  data*******************************************/
  submit(){  
    if(this.tags.length<1){
      this.manualEmpCodeSearch=[];
      this.manualEmpCodeSearch.push(this.adminTransferForm.value.employeeCode.trim())
      this.searchData={
        "teacherEmployeeCode": this.manualEmpCodeSearch,
       // "teacherEmployeeCode":this.tags,
        "teacherName":this.adminTransferForm.value.name.trim().toUpperCase(),
        "teacherDob":this.adminTransferForm.value.dob,
        "teacherEmail":this.adminTransferForm.value.email.trim().toUpperCase(),
        "teacherMobile":this.adminTransferForm.value.mobileNo.trim(),
      }
    }
    else{
      this.searchData={
        //"teacherEmployeeCode":this.adminTransferForm.value.employeeCode.trim(),
        "teacherEmployeeCode":this.tags,
        "teacherName":this.adminTransferForm.value.name.trim().toUpperCase(),
        "teacherDob":this.adminTransferForm.value.dob,
        "teacherEmail":this.adminTransferForm.value.email.trim().toUpperCase(),
        "teacherMobile":this.adminTransferForm.value.mobileNo.trim(),
      }
      this.adminTransferForm.patchValue({
        employeeCode: this.tags[0],
    });
    }
   
    if((this.adminTransferForm.value.employeeCode=='' || this.adminTransferForm.value.employeeCode==null )
    && (this.adminTransferForm.value.name=='' || this.adminTransferForm.value.name==null ) && 
    (this.adminTransferForm.value.dob=='' ||  this.adminTransferForm.value.dob ==null ) &&
     (this.adminTransferForm.value.email=='' || this.adminTransferForm.value.email==null) &&
      (this.adminTransferForm.value.mobileNo=='' || this.adminTransferForm.value.mobileNo==null )){
        this.adminTransferMangement=[];
        this.totalLength ='';
        this.dataSource = new MatTableDataSource(this.adminTransferMangement);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.userMappingSort;
        this.adminTransferForm.patchValue({
          employeeCode: '',
          name: '',
          dob: '',
          email: '',
          mobileNo: '',
      });
        return ;
      }
      else{
    console.log(this.searchData)
    this.adminTransferMangement=[];
    this.outSideService.searchEmployeeForTransfer(this.searchData,this.loginUserNameForChild).subscribe(res => {
      console.log("emp transfer  data---------------")
     // this.transferStatusOneComplite=false;
      console.log(res['rowValue'])
      if(res['rowValue'].length>0){
        for (let i = 0; i < res['rowValue'].length; i++) {
          this.testData.sno = '' + (i + 1) + '';
          this.testData.employeecode = res['rowValue'][i].teacher_employee_code;
          this.testData.name = res['rowValue'][i].teacher_name;
          this.testData.email = res['rowValue'][i].teacher_email;
          this.testData.teacher_dob = res['rowValue'][i].teacher_dob;
          this.testData.transfer_type = res['rowValue'][i].transfer_type;
          this.testData.presentKvName = res['rowValue'][i].kv_name_present;
          this.testData.presentKvCode = res['rowValue'][i].present_kv_code;
          this.testData.presentStationName = res['rowValue'][i].station_name_present;
          this.testData.presentStationCode = res['rowValue'][i].present_station_code;
          this.testData.presentRegionName = res['rowValue'][i].region_name_present;
          this.testData.teacherId = res['rowValue'][i].teacher_id;
         if(res['rowValue'][i].is_admin_transfer==true){
          this.testData.is_admin_transfer = 'Admin';
         }
         if(res['rowValue'][i].is_automated_transfer==true){
          this.testData.is_admin_transfer = 'Transfer Policy (2023)';
         }
         if(res['rowValue'][i].transfer_type=='AM'){
          this.testData.is_admin_transfer = 'Admin Modify';
         }
          this.testData.kv_code = res['rowValue'][i].kv_code;
          this.testData.join_relieve_flag = res['rowValue'][i].join_relieve_flag;
          this.testData.join_date = res['rowValue'][i].join_date;
          if( res['rowValue'][i].allot_stn_code=='-1' || res['rowValue'][i].allot_stn_code=='' || res['rowValue'][i].allot_stn_code==null)
          {
            this.testData.allot_stn_code = 'NA';
          }
          else{
            this.testData.allot_stn_code = res['rowValue'][i].allot_stn_code;
          }
          if( res['rowValue'][i].allot_kv_code=='-1' || res['rowValue'][i].allot_kv_code=='' || res['rowValue'][i].allot_kv_code==null)
          {
            this.testData.allot_kv_code = 'NA';
          }
          else{
            this.testData.allot_kv_code = res['rowValue'][i].allot_kv_code;
          }
          if( res['rowValue'][i].allot_kv_code=='-1' || res['rowValue'][i].allot_kv_code=='' || res['rowValue'][i].allot_kv_code==null)
          {
            this.testData.allot_kv_code = 'NA';
          }
          else{
            this.testData.allot_kv_code = res['rowValue'][i].allot_kv_code;
          }
          if( res['rowValue'][i].kv_name_alloted=='-1' || res['rowValue'][i].kv_name_alloted=='' || res['rowValue'][i].kv_name_alloted==null)
          {
            this.testData.kv_name_alloted = '';
          }
          else{
            this.testData.kv_name_alloted = res['rowValue'][i].kv_name_alloted;
          }
          this.testData.kv_name_alloted =  this.testData.kv_name_alloted +' ('+this.testData.allot_kv_code +')'  ;
          this.testData.allot_kv_code = res['rowValue'][i].allot_kv_code;
          this.testData.work_experience_appointed_for_subject = res['rowValue'][i].work_experience_appointed_for_subject;
          this.testData.last_promotion_position_type = res['rowValue'][i].last_promotion_position_type;
          this.testData.relieve_date = res['rowValue'][i].relieve_date;
          this.testData.emp_transfer_status = res['rowValue'][i].emp_transfer_status;
//------------------ Transfer Status----------------------------------------------------------
          if(res['rowValue'][i].emp_transfer_status=='-1' || res['rowValue'][i].emp_transfer_status==null){
            this.testData.transferStatusAction='transfer' 
          }
          if(res['rowValue'][i].join_relieve_flag=='1' || res['rowValue'][i].allot_kv_code=='-1'){
            this.testData.transferStatusAction='transfer'; 
            //this.transferStatusOneComplite=true;
            this.testData.transferStatusOneComplite='true';
          }
          if(res['rowValue'][i].emp_transfer_status=='9999'  && (res['rowValue'][i].join_relieve_flag=='2' || res['rowValue'][i].join_relieve_flag=='0' || res['rowValue'][i].join_relieve_flag=='' || res['rowValue'][i].join_relieve_flag==null )){
            this.testData.transferStatusAction='modificationcancel'; 
          }
          if(res['rowValue'][i].emp_transfer_status=='4'  && (res['rowValue'][i].join_relieve_flag=='1')){
            this.testData.transferStatusAction='transfer'; 
          }
          if(res['rowValue'][i].emp_transfer_status=='4'  && (res['rowValue'][i].join_relieve_flag=='2' || res['rowValue'][i].join_relieve_flag=='0' || res['rowValue'][i].join_relieve_flag=='' || res['rowValue'][i].join_relieve_flag==null )){
            this.testData.transferStatusAction='modificationcancel'; 
          }
          if(res['rowValue'][i].emp_transfer_status=='2' && res['rowValue'][i].allot_kv_code=='-1'){
            this.testData.transferStatusAction='transfer' 
          }
          if(res['rowValue'][i].emp_transfer_status=='5'  && (res['rowValue'][i].join_relieve_flag=='1')){
            this.testData.transferStatusAction='transfer'; 
          }
          if(res['rowValue'][i].emp_transfer_status=='5'  && (res['rowValue'][i].join_relieve_flag=='2' || res['rowValue'][i].join_relieve_flag=='0' || res['rowValue'][i].join_relieve_flag=='' || res['rowValue'][i].join_relieve_flag==null )){
            this.testData.transferStatusAction='modificationcancel'; 
          }         
          if(res['rowValue'][i].emp_transfer_status=='3'  && (res['rowValue'][i].join_relieve_flag=='1')){
            this.testData.transferStatusAction='transfer'; 
          }
          if(res['rowValue'][i].emp_transfer_status=='3'  && (res['rowValue'][i].join_relieve_flag=='2'|| res['rowValue'][i].join_relieve_flag=='0' || res['rowValue'][i].join_relieve_flag=='' || res['rowValue'][i].join_relieve_flag==null )){
            this.testData.transferStatusAction='modificationcancel'; 
          }
          if(res['rowValue'][i].emp_transfer_status=='1'  && (res['rowValue'][i].join_relieve_flag=='1')){
            this.testData.transferStatusAction='transfer'; 
          }
          if(res['rowValue'][i].emp_transfer_status=='1'  && (res['rowValue'][i].join_relieve_flag=='2' || res['rowValue'][i].join_relieve_flag=='0' || res['rowValue'][i].join_relieve_flag=='' || res['rowValue'][i].join_relieve_flag==null )){
            this.testData.transferStatusAction='modificationcancel'; 
          }           
//--------------------Transfer Status end-----------------------------------------------------

//--------------------Transfer under Cat------------------------------------------------------
          if(res['rowValue'][i].transfer_type=='A' || res['rowValue'][i].transfer_type=='AM'){
            for (let j = 0; j < this.transferGroundList.length; j++) {
              if(this.transferGroundList[j]['transferGroundId']==res['rowValue'][i]['transferred_under_cat_id']){
                this.testData.transferred_under_cat=this.transferGroundList[j]['transferGroundType']
              }
            }
          }
          if(res['rowValue'][i].transferred_under_cat=='-1' || res['rowValue'][i].transferred_under_cat==null){
            this.testData.transferred_under_cat='NA' 
          }
          if(res['rowValue'][i].transferred_under_cat=='40'){
            this.testData.transferred_under_cat='PWD' 
          }
          if(res['rowValue'][i].transferred_under_cat=='30'){
            this.testData.transferred_under_cat='Hard Station' 
          }
          if(res['rowValue'][i].transferred_under_cat=='20'){
            this.testData.transferred_under_cat='Single Parent' 
          }
          if(res['rowValue'][i].transferred_under_cat=='12'){
            this.testData.transferred_under_cat='CG Spouse' 
          }
          if(res['rowValue'][i].transferred_under_cat=='8'){
            this.testData.transferred_under_cat='Women' 
          }
          if(res['rowValue'][i].transferred_under_cat=='98'){
            this.testData.transferred_under_cat='Below 40 Transfer' 
          }
          if(res['rowValue'][i].transferred_under_cat=='0'){
            this.testData.transferred_under_cat='Tenure Complete' 
          }
          if(res['rowValue'][i].transferred_under_cat=='35'){
            this.testData.transferred_under_cat='DFP/MGD' 
          }
          if(res['rowValue'][i].transferred_under_cat=='25'){
            this.testData.transferred_under_cat='LTR' 
          }
          if(res['rowValue'][i].transferred_under_cat=='15'){
            this.testData.transferred_under_cat='KVS Spouse' 
          }
          if(res['rowValue'][i].transferred_under_cat=='10'){
            this.testData.transferred_under_cat='State Spouse' 
          }
          if(res['rowValue'][i].transferred_under_cat=='6'){
            this.testData.transferred_under_cat='RJCM/NJCM' 
          }
          if(res['rowValue'][i].transferred_under_cat=='99'){
            this.testData.transferred_under_cat='Displacement without choice' 
          }
//--------------------Transfer under Cat end------------------------------------------------------
          this.adminTransferMangement.push(this.testData);
          this.totalLength = this.adminTransferMangement.length;
          this.testData = {  "sno": "", "employeecode": "", "name":"" ,"email": "", "teacher_dob": "","transfer_type":"","is_admin_transfer":"","kv_name_alloted":"","kv_code":"","join_relieve_flag":"",
          "join_date": "","allot_stn_code": "","allot_kv_code": "","work_experience_appointed_for_subject": "","last_promotion_position_type": "",
          "relieve_date": "","emp_transfer_status": "","transferred_under_cat":"","transferStatusAction":"","presentKvName":"","presentKvCode":"","presentStationName":"","presentStationCode":"","teacherId":"","presentRegionName":"","transferStatusOneComplite":""};
        }
    }
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.adminTransferMangement);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.userMappingSort;
      }, 100)
     },
    error => { 
      Swal.fire({
        'icon':'error',
        'text':'You are not Authorized.'
      })
    })
  }
  }
  submitForm(){
  if(this.selectSchoolType=='Select'){
    Swal.fire({
      'icon':'error',
      'text':'Please select Institute Type.'
     } )
     return false;
 }

 if(this.selectSchoolType=='3'){
  if(this.adminTransferEditForm.value.transferRegion=='' || this.adminTransferEditForm.value.transferRegion==null){
    Swal.fire({
      'icon':'error',
      'text':'Please select region.'
     } )
     return false;
  }
 }
 if(this.selectSchoolType=='1'){
  if(this.adminTransferEditForm.value.transferRegion=='' || this.adminTransferEditForm.value.transferRegion==null){
    Swal.fire({
      'icon':'error',
      'text':'Please select region.'
     } )
     return false;
  }

else if(this.adminTransferEditForm.value.transferStation=='' || this.adminTransferEditForm.value.transferStation==null ){
    Swal.fire({
     'icon':'error',
     'text':'Please select station.'
    } )
    return false;
 }
else if(this.adminTransferEditForm.value.transferSchool=='' || this.adminTransferEditForm.value.transferSchool==null || this.adminTransferEditForm.value.transferSchool=='Select School'){
 Swal.fire({
  'icon':'error',
  'text':'Please select School.'
 } )
 return false;
 }
  else{
    this.school_id =this.adminTransferEditForm.value.transferSchool;
    const myArray =  this.school_id.split("(");
    const schoolCode=myArray[1].split(")")
  for (let i = 0; i < this.kvSchoolList.length; i++) {
    if(this.kvSchoolList[i]['kvCode']==schoolCode[0]){
      this.selecttedRegionName =this.kvSchoolList[i].regionName;
      this.selecttedRegionCode =this.kvSchoolList[i].regionCode;
      this.selectStationCode =this.kvSchoolList[i].stationCode;
      this.selectStationName =this.kvSchoolList[i].stationName;
      this.selectedKvCode = this.kvSchoolList[i].kvCode;
      this.selectedKvname = this.kvSchoolList[i].kvName ;  
      this.selectedShiftYN=this.kvSchoolList[i].shiftYn;
   }  
 }
}
}
 if(this.selectSchoolType=='2'){
  if(this.adminTransferEditForm.value.TransferZiet=='' || this.adminTransferEditForm.value.TransferZiet==null){
    Swal.fire({
      'icon':'error',
      'text':'Please select Ziet.'
     } )
     return false;
  }
 }
 if(this.selectSchoolType=='4'){
  if(this.adminTransferEditForm.value.TransferHeadquater=='' || this.adminTransferEditForm.value.TransferHeadquater==null){
    Swal.fire({
      'icon':'error',
      'text':'Please select HeadQuarter.'
     } )
     return false;
  }
 }
 if(this.adminTransferEditForm.value.transferGround=='' || this.adminTransferEditForm.value.transferGround==null){
  Swal.fire({
    'icon':'error',
    'text':'Please select Transfer Ground.'
   } )
   return false;
}
 if(this.adminTransferEditForm.value.transferOrderNumber=='' || this.adminTransferEditForm.value.transferOrderNumber==null){
  Swal.fire({
    'icon':'error',
    'text':'Please fill transfer order number.'
   } )
   return false;
}
if(this.adminTransferEditForm.value.transferOrderdate=='' || this.adminTransferEditForm.value.transferOrderdate==null){
  Swal.fire({
    'icon':'error',
    'text':'Please fill transfer order date.'
   } )
   return false;
}

if(this.adminTransferEditForm.value.transferYear=='' || this.adminTransferEditForm.value.transferYear==null){
  Swal.fire({
    'icon':'error',
    'text':'Please fill transfer year.'
   } )
   return false;
}
 var data =  {
    "empName":this.editEmpName,
    "empCode":this.editEmpCode,
    "empTransferStatus":this.transferType,
    "transferredUnderCat":this.transferType,
    "transferredUnderCatId":this.adminTransferEditForm.value.transferGround,
    "regionNameAlloted":this.selecttedRegionName, 
    "regionCodeAlloted": this.selecttedRegionCode,
    "allotStnCode": this.selectStationCode,
    "stationNameAlloted": this.selectStationName,
    "allotShift": this.selectedShiftYN,
    "allotKvCode":this.selectedKvCode,
    "transferYear":this.adminTransferEditForm.value.transferYear,
    "kvNameAlloted": this.selectedKvname,
    "trasndferOrderDate":this.adminTransferEditForm.value.transferOrderdate,
    "transferOrderNumber":this.adminTransferEditForm.value.transferOrderNumber
}
console.log(data)
  Swal.fire({
    'icon':'warning',
    'text': "Do you want to proceed?",
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
        this.outSideService.adminTransfer(data,this.loginUserNameForChild).subscribe((res)=>{
    
          console.log(res)
          if(res){
            Swal.fire(
              'Transferred Successfully !',
              '',
              'success'
            )
          }
          this.modalService.dismissAll();
          this.submit();
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

submitModificationForm(){

if(this.selectSchoolType=='Select'){
  Swal.fire({
    'icon':'error',
    'text':'Please select Institute Type.'
   } )
   return false;
}
 if(this.selectSchoolType=='3'){
    if(this.modificationEditForm.value.modifyTransferRegion=='' || this.modificationEditForm.value.modifyTransferRegion==null){
     Swal.fire({
    'icon':'error',
    'text':'Please select region.'
   } )
   return false;
}
}
if(this.selectSchoolType=='1'){
  if(this.modificationEditForm.value.modifyTransferRegion=='' || this.modificationEditForm.value.modifyTransferRegion==null){
    Swal.fire({
     'icon':'error',
     'text':'Please select region.'
    } )
    return false;
 }
else if(this.modificationEditForm.value.modifyTransferStation=='' || this.modificationEditForm.value.modifyTransferStation==null){
   Swal.fire({
    'icon':'error',
    'text':'Please select Station.'
   } )
   return false;
}
else if (this.modificationEditForm.value.modifyTransferSchool=='' || this.modificationEditForm.value.modifyTransferSchool==null || this.modificationEditForm.value.modifyTransferSchool=='Select School'){
 Swal.fire({
  'icon':'error',
  'text':'Please select School.'
 } )
 return false;
}
else{
  this.school_id =this.modificationEditForm.value.modifyTransferSchool;
  const myArray =  this.school_id.split("(");
  const schoolCode=myArray[1].split(")")
  for (let i = 0; i < this.kvSchoolList.length; i++) {
  if(this.kvSchoolList[i]['kvCode']==schoolCode[0]){
      this.selecttedRegionName =this.kvSchoolList[i].regionName;
      this.selecttedRegionCode =this.kvSchoolList[i].regionCode;
      this.selectStationCode =this.kvSchoolList[i].stationCode;
      this.selectStationName =this.kvSchoolList[i].stationName;
      this.selectedKvCode = this.kvSchoolList[i].kvCode;
      this.selectedKvname = this.kvSchoolList[i].kvName ;  
      this.selectedShiftYN=this.kvSchoolList[i].shiftYn;
   }  
  }
}
}
if(this.selectSchoolType=='2'){
if(this.modificationEditForm.value.modifyTransferZiet=='' || this.modificationEditForm.value.modifyTransferZiet==null){
  Swal.fire({
    'icon':'error',
    'text':'Please select Ziet.'
   } )
   return false;
}
}
if(this.selectSchoolType=='4'){
if(this.modificationEditForm.value.modifyTransferHeadquater=='' || this.modificationEditForm.value.modifyTransferHeadquater==null){
  Swal.fire({
    'icon':'error',
    'text':'Please select HeadQuarter.'
   } )
   return false;
}
}
if(this.modificationEditForm.value.modifyTransferGround=='' || this.modificationEditForm.value.modifyTransferGround==null){
  Swal.fire({
    'icon':'error',
    'text':'Please select Transfer Ground.'
   } )
   return false;
}
if(this.modificationEditForm.value.transferOrderNumber=='' || this.modificationEditForm.value.transferOrderNumber==null){
  Swal.fire({
    'icon':'error',
    'text':'Please fill transfer order number.'
   } )
   return false;
}
if(this.modificationEditForm.value.transferOrderdate=='' || this.modificationEditForm.value.transferOrderdate==null){
  Swal.fire({
    'icon':'error',
    'text':'Please fill transfer order date.'
   } )
   return false;
}
if(this.modificationEditForm.value.transferOrderdate=='' || this.modificationEditForm.value.transferOrderdate==null){
  Swal.fire({
    'icon':'error',
    'text':'Please fill transfer order date.'
   } )
   return false;
}
if(this.modificationEditForm.value.transferYear=='' || this.modificationEditForm.value.transferYear==null){
  Swal.fire({
    'icon':'error',
    'text':'Please fill transfer year.'
   } )
   return false;
}
var data =  {
"empName":this.editModifyEmpName,
"empCode":this.editModifyEmpCode,
"empTransferStatus":'',
"transferredUnderCat":'',
"transferredUnderCatId":this.modificationEditForm.value.modifyTransferGround,
"regionNameAlloted":this.selecttedRegionName, 
"regionCodeAlloted": this.selecttedRegionCode,
"allotStnCode": this.selectStationCode,
"stationNameAlloted": this.selectStationName,
"allotShift": this.selectedShiftYN,
"allotKvCode":this.selectedKvCode,
"isAdminTransfer":true,
"transferYear":this.modificationEditForm.value.transferYear,
"kvNameAlloted": this.selectedKvname,
"trasndferOrderDate":this.modificationEditForm.value.transferOrderdate,
"transferOrderNumber":this.modificationEditForm.value.transferOrderNumber
}
console.log(data)
Swal.fire({
  'icon':'warning',
  'text': "Do you want to proceed?",
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
      this.outSideService.transferModification(data,this.loginUserNameForChild).subscribe((res)=>{
   
        console.log(res)
        if(res['status']==0){
          Swal.fire({
            'icon':'error',
            'text':res['message']
           } )
        }
        if(res['status']==1){
          Swal.fire(
           'Transferred Successfully !',
            '',
           'success'
           )
        }
        this.modalService.dismissAll();
        this.submit();
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

submitcancelForm(){
    if(this.editCancelEmpCode=='' || this.editCancelEmpCode==null){
      Swal.fire({
        'icon':'error',
        'text':'Emp Code Not Present.'
       } )
       return false;
    }
    if(this.cancelEditForm.value.cancelTransferOrderNumber=='' || this.cancelEditForm.value.cancelTransferOrderNumber==null){
      Swal.fire({
        'icon':'error',
        'text':'Please fill Cancel transfer order number.'
       } )
       return false;
    }
    if(this.cancelEditForm.value.cancelTransferOrderdate=='' || this.cancelEditForm.value.cancelTransferOrderdate==null){
      Swal.fire({
        'icon':'error',
        'text':'Please fill Cancel transfer order date.'
       } )
       return false;
    }
    var data={
      "empCode":this.editCancelEmpCode,
      "cancelOrderNumber":this.cancelEditForm.value.cancelTransferOrderNumber,
      "transferCancelOrderDate":this.cancelEditForm.value.cancelTransferOrderdate,
    }
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
          this.outSideService.transferCancelation(data,this.loginUserNameForChild).subscribe((res)=>{
      
            console.log(res)
            if(res){
              Swal.fire(
                'Transfer Cancelled Successfully!',
                '',
                'success'
              )
            }
            this.modalService.dismissAll();
            this.submit();
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
    getStationByRegionId(event) {
      const data = { "regionCode": event.target.value };
      this.stationList=[];
      this.outSideService.fetchStationByRegionId(data).subscribe((res) => {
        this.stationList = res.rowValue
      })
    }
    
    getKvSchoolByStationId(event) {
      this.kvSchoolList=[];
      this.outSideService.fetchKvSchoolByStationCode(event.target.value).subscribe((res) => {
        this.kvSchoolList = res.response;
      })
    }
    setUdiseCode(event:any){
      if(event.target.value=='' || event.target.value==null || event.target.value=='Select School'){
        this.kvRegionSchoolZietHqName='';
      }
      else{
        this.kvRegionSchoolZietHqName=event.target.value;
      } 
    }
    applyFilter(filterValue: string) {

      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase(); 
      this.dataSource.filter = filterValue;
    }
    cancelModal(){
      this.selectRegionList=[];
      this.stationList=[];
      this.kvSchoolList=[]; 
      this.zoneList=[];
      this.headQuaterList=[];
      this.adminTransferEditForm.reset();
      this.modificationEditForm.reset();
      this.cancelEditForm.reset();
      this.modalService.dismissAll();
    }

}
