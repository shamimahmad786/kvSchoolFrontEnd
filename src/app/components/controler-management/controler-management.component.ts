import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/teacherEntryForm/service/internalService/data-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, formatDate } from '@angular/common';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import * as moment from 'moment';

// import { type } from 'os';
declare var $: any;
declare const srvTime: any;
@Component({
  selector: 'app-controler-management',
  templateUrl: './controler-management.component.html',
  styleUrls: ['./controler-management.component.css']
})
export class ControlerManagementComponent implements OnInit, AfterViewInit {

  displayedColumnsForNational = ['Sno', 'Region Name','Employee Code', 'Employee name','Institution Name','Modified By','Start Date','Status','Action' ];
  displayedColumnsForRoSchool = ['Sno', 'Kv Name', 'Employee name','Modified By','Start Date','Status','Action' ];
  hBSource : MatTableDataSource<any>;

  remarksForm: FormGroup;
 @ViewChild('paginator') paginator: MatPaginator;
 @ViewChild('hBSort') hBSort: MatSort;
 @ViewChild('JoiningBox', { static: true }) JoiningBox: TemplateRef<any>;   

  childUserDataForNational = { "sno": "","regionname": "","employeeCode": "", "employeeName": "","institutionName":"","modifiedBy": "","stateDate":"","regionCode":"","status": ""}
  childUserDataForRoSchool = { "sno": "","kvname": "","kvcode": "", "employeeName": "","modifiedBy": "","stateDate":"","regionCode":"","status": ""}
  applicationId: any;
  loginUsername: any;
  userType: boolean = true;
  userName: boolean = true;
  userEmail: boolean = true;
  userMobile: boolean = true;
  changePassword: boolean = true;
  staticUserType: boolean = false;
  staticUserName: boolean = false;
  staticUserEmail: boolean = false;
  staticUserMobile: boolean = false;
  staticChangePassword: boolean = false;
  activePaneOne: boolean = true;
  activePaneTwo: boolean = false;
  businessUnitTypeId: any;
  userTypeValue: string;
  loginUserMobile:any;
  loginUserEmail:any;
  loginUserNameForChild: any;
  controllerOfficeList:any;
  controllerOfficeDataArray: any = [];
  newChildUserListArr: any = [];
  showFirstButtonColor: boolean = true;
  showsecondButtonColor: boolean = false;
  selectedLanguage: string;
  password: any;
  confirmpassword: any;
  loginUserNameForService: any;
  controllerType:any;
  schoolType: any;
  businessUnitTypeCode: any;
  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private router: Router, private modalService: NgbModal, private setDataService: DataService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.applicationId = environment.applicationId;
    this.getLoginUserdetail();
  }
  ngAfterViewInit(): void {
  }
  getLoginUserdetail(){
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      console.log(JSON.parse(sessionStorage.getItem("authTeacherDetails")));
      this.loginUsername=JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].firstname + " "+ JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].lastname;
      this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_id;
      this.loginUserEmail=JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].email;
      this.loginUserMobile=JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].mobile;
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.loginUserNameForService=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.businessUnitTypeId= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_id;
      this.businessUnitTypeCode= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_code;
    }
    if(this.businessUnitTypeId=="2"){
      this.controllerType="R";
      this.getNationalControllerOffice();
    } else if(this.businessUnitTypeId=="3"){
      this.controllerType="S";
      this.schoolType="1";
      this.getRoSchoolControllerOffice();
    }

  }
  applyFilterHBSource(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.hBSource.filter = filterValue;
  }

  //**********************   Logic for get controling office for national Data from Api  ******************************
  getNationalControllerOffice() {
     this.controllerOfficeList = [];
     const data = {
      "controllerType":this.controllerType
  }
  this.outSideService.getControllerOffice(data,this.loginUserNameForService ).subscribe(res => {
    console.log("ro    list------------------------")
      console.log(res)
      this.controllerOfficeList = res['response']['rowValue'];
      this.setToJoingMatTable(this.controllerOfficeList);
     })
  }
//**********************   Logic for get controling office for RO Data from Api  ******************************
  getRoSchoolControllerOffice() { 
    var data={
      "regionCode":this.businessUnitTypeCode,
      "controllerType":this.controllerType
    }
    this.outSideService.getControllerOffice(data,this.loginUserNameForChild).subscribe(res => {

    this.controllerOfficeList = res['response']['rowValue'];
    console.log("school-----------detail---------------")
    console.log(this.controllerOfficeList)
      this.setToJoingRoSchoolMatTable(this.controllerOfficeList);
    },
    error => { 
      Swal.fire({
        'icon':'error',
        'text':'You are not Authorized.'
      })
    });
 }
  navColor(nav:any){
    if(nav=='transferin')
    {
      this.showFirstButtonColor=true;
      this.showsecondButtonColor=false;
      this.activePaneOne=true;
      this.activePaneTwo=false;
    }else{
      this.showFirstButtonColor=false;
      this.showsecondButtonColor=true;
      this.activePaneOne=false;
      this.activePaneTwo=true;
    } 
  }
  //********************** Joining Data Set in to Table ******************************
   setToJoingMatTable(data:any) {
    this.controllerOfficeDataArray = [];
    for (let i = 0; i < data.length; i++) {
      this.childUserDataForNational.sno = '' + (i + 1) + '';
      this.childUserDataForNational.regionname =data[i].region_name;
      this.childUserDataForNational.employeeCode =data[i].employee_code;
      this.childUserDataForNational.employeeName = data[i].employee_name;
      this.childUserDataForNational.institutionName = data[i].institutionname;
      this.childUserDataForNational.modifiedBy = data[i].modified_by;  
      this.childUserDataForNational.stateDate =data[i].state_date;  
      this.childUserDataForNational.regionCode = data[i].region_code;  
      this.childUserDataForNational.status = data[i].is_active;  
      this.controllerOfficeDataArray.push(this.childUserDataForNational);
      this.childUserDataForNational = { "sno": "","regionname": "","employeeCode": "", "employeeName": "","institutionName":"","modifiedBy": "","stateDate":"","regionCode":"","status": ""}
    }
    setTimeout(() => {
      this.hBSource  = new MatTableDataSource(this.controllerOfficeDataArray);
      this.hBSource .paginator = this.paginator;
      this.hBSource .sort = this.hBSort;  
    }, 100)
  }
  setToJoingRoSchoolMatTable(data:any) {
    this.controllerOfficeDataArray = [];
    for (let i = 0; i < data.length; i++) {
      this.childUserDataForRoSchool.sno = '' + (i + 1) + '';
      this.childUserDataForRoSchool.kvname =data[i].kv_name;
      this.childUserDataForRoSchool.kvcode =data[i].kv_code;
      this.childUserDataForRoSchool.employeeName = data[i].employee_name;
      this.childUserDataForRoSchool.modifiedBy = data[i].modified_by;  
      this.childUserDataForRoSchool.stateDate =data[i].state_date;  
      this.childUserDataForRoSchool.regionCode = data[i].regionCode;  
      this.childUserDataForRoSchool.status = data[i].is_active;  
      this.controllerOfficeDataArray.push(this.childUserDataForRoSchool);
      this.childUserDataForRoSchool = { "sno": "","kvname": "","kvcode": "", "employeeName": "","modifiedBy": "","stateDate":"","regionCode":"","status": ""}
    console.log("kv  detail")
    console.log(this.childUserDataForRoSchool)
    }
   
    setTimeout(() => {
      this.hBSource  = new MatTableDataSource(this.controllerOfficeDataArray);
      this.hBSource .paginator = this.paginator;
      this.hBSource .sort = this.hBSort;  
    }, 100)
  }

  childActiveDeactive(action:any,userName:any)
  { 
    debugger
    const data ={
    "updateType":"AD",
    "username":userName,
    "value":action
   }
    this.outSideService.childActiveDeactiveAction(data,this.loginUserNameForService).subscribe(res => {
      Swal.fire({
        'icon':'success',
        'text':res['response']
      })
        this.getLoginUserdetail();
       })
  }
  addUpdateViewUserMapping(regionId:any,event:any){
    if(event=='add'){
      this.router.navigate(['/teacher/user-mapping'], { queryParams: { action: 'Add',regionId :regionId } });  
    }
    if(event=='update'){
      this.router.navigate(['/teacher/user-mapping'], { queryParams: { action: 'update',regionId :regionId} });  
    }
    if(event=='view'){
      this.router.navigate(['/teacher/user-mapping'], { queryParams: { action: 'view',regionId :regionId } });  
    }
  }
  addUpdateViewSchoolMapping(regionId:any,event:any){
    if(event=='add'){
      this.router.navigate(['/teacher/kv-mapping'], { queryParams: { action: 'Add',regionId :regionId } });  
    }
    if(event=='update'){
      this.router.navigate(['/teacher/kv-mapping'], { queryParams: { action: 'update',regionId :regionId} });  
    }
    if(event=='view'){
      this.router.navigate(['/teacher/kv-mapping'], { queryParams: { action: 'view',regionId :regionId } });  
    }
  }
  enableInputField(event:any){
    if(event=='staticUserEmail'){
      this.staticUserEmail=true;
      this.userEmail=false;
     
      this.staticUserMobile=false;
      this.userMobile=true;
      this.staticChangePassword=false;
      this.changePassword=true;
    }else if(event=='staticUserMobile'){
      this.staticUserMobile=true;
      this.userMobile=false;
     
      this.staticUserEmail=false;
      this.userEmail=true;
      this.staticChangePassword=false;
      this.changePassword=true;
    }else if(event=='staticChangePassword'){
      this.staticChangePassword=true;
      this.changePassword=false;
    
      this.staticUserEmail=false;
      this.userEmail=true;
      this.staticUserMobile=false;
      this.userMobile=true;
    }
   
console.log(event)
  }

  editChildUser(userName:any,type:any){
    this.showFirstButtonColor=false;
    this.showsecondButtonColor=true;
    this.activePaneOne=false;
    this.activePaneTwo=true;
    this.newChildUserListArr=[];
    debugger
    for (let i = 0; i < this.controllerOfficeList.length; i++) {
      if ( this.controllerOfficeList[i]['username']== userName) {
        this.newChildUserListArr.push(this.controllerOfficeList[i]);
      }
    }
    console.log(this.newChildUserListArr)
    this.loginUserNameForChild =this.newChildUserListArr[0]['username']
    this.loginUserMobile=this.newChildUserListArr[0]['mobile']
    this.loginUserEmail=this.newChildUserListArr[0]['email']
    
  }
  changeDateFormat(date: any){
    console.log(date)
    if(date!='' && date!=null){
      return moment(date).format('DD-MM-YYYY')
    }
  }
  saveProfileData(val:any,userName:any,type:any){
    debugger
  if(type=='email'){
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!filter.test(val)) {
    Swal.fire({
      'icon':'error',
      'text':'Please provide a valid email address.'
    })
    return false;
    }
    else{
    this.staticUserEmail=false;
    this.userEmail=true;
    var data = {
        "updateType":"E",
        "username":userName,
        "value":val
    }
    }
  }
  if(type=='mobile'){
    var filter = /^[6-9]{1}[0-9]{9}$/;
  if (!filter.test(val)) {
    Swal.fire({
      'icon':'error',
      'text':'Please provide a valid mobile number.'
    })
    return false;
    }
    else{
      this.staticUserMobile=false;
      this.userMobile=true;
      var data = {
        "updateType":"M",
        "username":userName,
        "value":val
    }
    }
  }
  if(type=='password'){
    this.password= (<HTMLInputElement>document.getElementById("staticChangePassword")).value;
    this.confirmpassword = (<HTMLInputElement>document.getElementById("staticConfirmChangePassword")).value;

  if (this.password!=this.confirmpassword) {
    Swal.fire({
      'icon':'error',
      'text':'New password and confirm password are not same.....'
    })
    return false;
    }
    else{
      this.staticChangePassword=false;
      this.changePassword=true;
      var data = {
        "updateType":"p",
        "username":userName,
        "value":this.confirmpassword
    }
    }
  }
this.outSideService.childActiveDeactiveAction(data,this.loginUserNameForService).subscribe(res => {
    this.showFirstButtonColor=true;
    this.showsecondButtonColor=false;
    this.activePaneOne=true;
    this.activePaneTwo=false;
  Swal.fire({
    'icon':'success',
    'text':res['response']
  })
  
    this.getLoginUserdetail();
   },
   error => { 
    Swal.fire({
      'icon':'error',
       'text':'You are not Authorized.'
    })
   });
  } 
}
      
