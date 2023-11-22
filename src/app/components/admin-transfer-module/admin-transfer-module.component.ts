import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-admin-transfer-module',
  templateUrl: './admin-transfer-module.component.html',
  styleUrls: ['./admin-transfer-module.component.css']
})
export class AdminTransferModuleComponent implements OnInit {
  
  displayedColumns = ['Sno', 'employeecode', 'name', 'email','teacher_dob','kv_code','transfer_type','kv_name_alloted','join_date','work_experience_appointed_for_subject','last_promotion_position_type','relieve_date','transfer_under_cat','Action'];
  testData = { "sno": "", "employeecode": "", "name":"" ,"email": "", "teacher_dob": "","transfer_type":"","kv_name_alloted":"","kv_code":"","join_relieve_flag":"","join_date": "","allot_stn_code": "","allot_kv_code": "","work_experience_appointed_for_subject": "","last_promotion_position_type": "","relieve_date": "","emp_transfer_status": "","transferred_under_cat":"","transferStatusAction":""}
  dataSource:any;
  userMappingSource : MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('userMappingSort') userMappingSort: MatSort;    
  @ViewChild('AdminTransferBox', { static: true }) AdminTransferBox: TemplateRef<any>;
  @ViewChild('AdminCancelBox', { static: true }) AdminCancelBox: TemplateRef<any>;
  @ViewChild('AdminMdificationBox', { static: true }) AdminMdificationBox: TemplateRef<any>;
  adminTransferForm: FormGroup;
  adminTransferEditForm: FormGroup;
  shiftList=[{'value':'0','type':'Modification in Transfer'},{'value':'1','type':'Administrative Transfer'},{'value':'2','type':'Cancel Transfer'}];
  loginUserNameForChild: any;
  adminTransferMangement: any=[];
  allRegionStationDeatils: any=[];
  businessUnitTypeId: any;
  editEmpName: any;
  editEmpCode: any;
  email: any;
  kvCode: any;
  selectRegionList: any;
  stationList: any;
  kvSchoolList: any;
  kvSchoolName: any;
  public checkBoxClick:boolean;
  dob: any;
  transferType: any;
  formDataList:any;
  transferGroundList: any;
  transferGroundValue: any;
  editCancelEmpName: any;
  editCancelEmpCode: any;
  cancelEmail: any;
  cancelkvCode: any;
  canceldob: any;
  employeeJoinKVallotedYN: any;
  
  constructor(private outSideService: OutsideServicesService,private modalService: NgbModal,private formData: FormDataService) { }

  ngOnInit(): void {
    this.formDataList = this.formData.formData();
    this.transferGroundList = this.formDataList.transferGround
    console.log(this.formDataList)
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.businessUnitTypeId= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_id;
    }
    this.adminTransferEditForm = new FormGroup({
      'transferRegion':  new FormControl('', Validators.required),
      "transferStation":  new FormControl('', Validators.required),
      "transferSchool":  new FormControl('', Validators.required),
      "transferGround":  new FormControl('', Validators.required),

    });

    this.adminTransferForm = new FormGroup({
      'employeeCode': new FormControl(''),
      'name': new FormControl(''),
      'dob': new FormControl(''),
      'mobileNo':new FormControl(''),
      'email': new FormControl(''),
    });
    this.getMaster()
    this.getTransferGround();
  }
  applyFilterHBSource(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.userMappingSource.filter = filterValue;
  }


 //********************** Function Use for Admin Transfer Modal*****************************
  openTransfermodal(empName:any,empCode:any,email:any,kvCode:any,dob:any,transferType:any) {
  this.kvSchoolName='';
  this.editEmpName=empName;
  this.editEmpCode=empCode;
  this.email=email;
  this.kvCode=kvCode;
  this.dob=dob;
  this.transferType=9999;
  this.modalService.open(this.AdminTransferBox, { size: 'lg', backdrop: 'static', keyboard: false ,centered: true});
  }
  openCancelmodal(empName:any,empCode:any,email:any,kvCode:any,dob:any,transferType:any){
    this.editCancelEmpName=empName;
    this.editCancelEmpCode=empCode;
    this.cancelEmail=email;
    this.cancelkvCode=kvCode;
    this.canceldob=dob;
    this.modalService.open(this.AdminCancelBox, { size: 'lg', backdrop: 'static', keyboard: false ,centered: true});
  }

  openModificationmodal(empName:any,empCode:any,email:any,kvCode:any,dob:any,joinDate:any,relivedate:any,transferType:any){
    this.editCancelEmpName=empName;
    this.editCancelEmpCode=empCode;
    this.cancelEmail=email;
    this.cancelkvCode=kvCode;
    this.canceldob=dob;
    this.modalService.open(this.AdminMdificationBox, { size: 'lg', backdrop: 'static', keyboard: false ,centered: true});
  }
  employeeJoinKValloted(event:any){
  console.log(event.target.value)
  this.employeeJoinKVallotedYN=event.target.value;
  }
  getTransferGround(){
    let req={};
    this.outSideService.getTransferGround(req,this.loginUserNameForChild).subscribe((res) => {
     console.log("-----get cat---------------")
     console.log(res['response'])
     this.transferGroundValue=res['response']
    })
  }
  cancelTransfer(){
      var data={
        "empCode":this.editCancelEmpCode,
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
            this.outSideService.transferCancelation(data,this.loginUserNameForChild).subscribe((res)=>{
              debugger
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

  applyFilter(filterValue: string) {
    debugger
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  cleceModal(){
    this.checkBoxClick=false;
    this.stationList='';
    this.kvSchoolList=''; 
    this.modalService.dismissAll();
  }
  getMaster() {
    debugger
    const data: any = {
      "extcall": "MOE_EXT_GET_HQ_REG_ZN",
      "conditionvalue": [3]
    }
    this.outSideService.getMasterData(data).subscribe((res: any) => {
      this.selectRegionList = res.response.rowValue;
    })
  }

  getStationByRegionId(event) {
    const data = { "regionCode": event.target.value };
    this.outSideService.fetchStationByRegionId(data).subscribe((res) => {
      this.stationList = res.rowValue
    })
  }

  getKvSchoolByStationId(event) {
    this.outSideService.fetchKvSchoolByStationCode(event.target.value).subscribe((res) => {
      this.kvSchoolList = res.response;
    })
  }
  setUdiseCode(event){
  this.kvSchoolName=event.target.value
    }
  submitForm(){
    this.allRegionStationDeatils=[];
    const myArray =  this.kvSchoolName.split("(");
    const schoolCode=myArray[1].split(")")
    
    for (let i = 0; i < this.kvSchoolList.length; i++) {
     if(this.kvSchoolList[i]['kvCode']==schoolCode[0]){
      this.allRegionStationDeatils.push(this.kvSchoolList[i]);
     }  
    }
    console.log(this.allRegionStationDeatils)
   var data =  {
      "empName":this.editEmpName,
      "empCode":this.editEmpCode,
      "empTransferStatus":this.transferType,
      "transferredUnderCat":this.transferType,
      "transferredUnderCatId":this.adminTransferEditForm.value.transferGround,
      "regionNameAlloted":this.allRegionStationDeatils[0]['regionName'],
      "regionCodeAlloted":this.allRegionStationDeatils[0]['regionCode'],
      "allotStnCode":this.allRegionStationDeatils[0]['stationCode'],
      "stationNameAlloted":this.allRegionStationDeatils[0]['stationName'],
      "allotShift":this.allRegionStationDeatils[0]['shiftYn'],
      "allotKvCode":this.allRegionStationDeatils[0]['kvCode'],
      "kvNameAlloted":this.allRegionStationDeatils[0]['kvName'],
  }
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
            debugger
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
  //***************Function user for search  data*******************************************/
  submit(){
    console.log(this.adminTransferForm.value) 
    var data={
      "teacherEmployeeCode":this.adminTransferForm.value.employeeCode.trim(),
      "teacherName":this.adminTransferForm.value.name.trim().toUpperCase(),
      "teacherDob":this.adminTransferForm.value.dob.trim(),
      "teacherEmail":this.adminTransferForm.value.email.trim().toUpperCase(),
      "teacherMobile":this.adminTransferForm.value.mobileNo.trim(),
    }
    console.log(data)
    this.adminTransferMangement=[];
    this.outSideService.searchEmployeeForTransfer(data,this.loginUserNameForChild).subscribe(res => {
      console.log("emp transfer  data---------------")
      console.log(res['rowValue'])
            if(res['rowValue'].length>0){
          for (let i = 0; i < res['rowValue'].length; i++) {
            this.testData.sno = '' + (i + 1) + '';
            this.testData.employeecode = res['rowValue'][i].teacher_employee_code;
            this.testData.name = res['rowValue'][i].teacher_name;
            this.testData.email = res['rowValue'][i].teacher_email;
            this.testData.teacher_dob = res['rowValue'][i].teacher_dob;
           if(res['rowValue'][i].transfer_type=='A'){
            this.testData.transfer_type = 'Admin';
           }
           if(res['rowValue'][i].transfer_type=='S'){
            this.testData.transfer_type = 'Automated';
           }
           if(res['rowValue'][i].transfer_type=='AM'){
            this.testData.transfer_type = 'Admin';
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
            this.testData.kv_name_alloted =  this.testData.kv_name_alloted +'('+this.testData.allot_kv_code +')'  ;
            this.testData.allot_kv_code = res['rowValue'][i].allot_kv_code;
            this.testData.work_experience_appointed_for_subject = res['rowValue'][i].work_experience_appointed_for_subject;
            this.testData.last_promotion_position_type = res['rowValue'][i].last_promotion_position_type;
            this.testData.relieve_date = res['rowValue'][i].relieve_date;
            this.testData.emp_transfer_status = res['rowValue'][i].emp_transfer_status;
//------------------ Transfer Status----------------------------------------------------------

            if(res['rowValue'][i].emp_transfer_status=='-1' || res['rowValue'][i].emp_transfer_status==null){
              this.testData.transferStatusAction='transfer' 
            }
            if(res['rowValue'][i].emp_transfer_status=='9999'  && (res['rowValue'][i].join_relieve_flag=='1')){
              this.testData.transferStatusAction='transfer'; 
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

            if(res['rowValue'][i].transfer_type=='A'){
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
              this.testData.transferred_under_cat='Tenure Complte' 
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
            this.testData = {  "sno": "", "employeecode": "", "name":"" ,"email": "", "teacher_dob": "","transfer_type":"","kv_name_alloted":"","kv_code":"","join_relieve_flag":"",
            "join_date": "","allot_stn_code": "","allot_kv_code": "","work_experience_appointed_for_subject": "","last_promotion_position_type": "",
            "relieve_date": "","emp_transfer_status": "","transferred_under_cat":"","transferStatusAction":""};
          }
      //  console.log(this.adminTransferMangement)
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
