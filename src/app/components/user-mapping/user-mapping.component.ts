import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
declare var $: any;
declare const srvTime: any;
@Component({
  selector: 'app-user-mapping',
  templateUrl: './user-mapping.component.html',
  styleUrls: ['./user-mapping.component.css']
})
export class UserMappingComponent implements OnInit {
  displayedColumns = ['Sno', 'Institution Name', 'Employee name', 'Modified By','fromdate','todate','Status'];
  userMappingSource : MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('userMappingSort') userMappingSort: MatSort;
  @ViewChild('JoiningBox', { static: true }) JoiningBox: TemplateRef<any>; 
  childUserData = { "sno": "","institutionName": "","employeeName": "","modifiedBy": "","fromdate":"","todate":"","status": ""}
  addUserMapping: FormGroup;
  addUserMappingFormubmitted=false;
  regionReadOnly=false;
  endDateStatus=false
  regionList: any=[];
  loginUserNameForChild: any;
  roOfficeList: any=[];
  regionEmployeeSchoolList: any=[];
  duplicateregionCheck: any=[];
  duplicateregiononeCheck: any=[];
  historyControlingOfficedata: any=[];
  userMappingAction: any;
  userMappingRegionCode: any;
  controllerOfficeList: any;
  roOfficeCode: any;
  historyControllerOfficeDataArray: any = [];
  heading:any;
  businessUnitTypeId:any;
  returnTypeSrvTime: any;
  schoolType:any;
  controllerType:any;
  activeStatus: any;
  maxDate:any;
  constructor(private outSideService: OutsideServicesService,private route: ActivatedRoute,private dateAdapter: DateAdapter<Date>,private router: Router) {
    this.dateAdapter.setLocale('en-GB');
   }

  ngOnInit(): void {
    this.returnTypeSrvTime = srvTime();
    var date = new Date(this.returnTypeSrvTime),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    this.maxDate =  [date.getFullYear(), mnth, day].join("-");
    this.heading="Add/Edit User Mapping";
    this.route.queryParams.subscribe(params => {
      this.userMappingAction=params['action'];
      this.userMappingRegionCode=params['regionId'];
    });
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.businessUnitTypeId= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_id;
    }
    // alert(this.businessUnitTypeId)
    if(this.businessUnitTypeId=="2"){
      this.schoolType="3";
      this.controllerType="R";
    } else if(this.businessUnitTypeId=="3"){
      this.schoolType="1";
      this.controllerType="S";
    }
    if(this.userMappingAction=="Add"){
    this.endDateStatus=false;
    this.regionReadOnly=true;
    this.addUserMapping = new FormGroup({
      'region': new FormControl('', Validators.required),
      'rooffice': new FormControl('', Validators.required),
      'empname': new FormControl('', Validators.required),
      'startdate':new FormControl('', Validators.required),
      'enddate': new FormControl(''),
    });
  }           
  if(this.userMappingAction=="update"){
    this.addUserMapping = new FormGroup({
      'region': new FormControl('', Validators.required),
      'rooffice': new FormControl('', Validators.required),
      'empname': new FormControl('', Validators.required),
      'startdate':new FormControl('', Validators.required),
      'enddate': new FormControl('', Validators.required),
    });
  }
  if(this.userMappingAction=="view"){
    this.heading="Controller History";
  }
  this.viewControlerHeirechy();
   this.getControllerOffice();
  }
  get f() { return this.addUserMapping.controls; }
  //***********************Get Region*************************************/
  getStationByRegionId(){
  this.outSideService.fetchKvRegion(1).subscribe((res) => {
    this.regionList = res.response.rowValue;
  })
  }
 //***********************Get RO Office *************************************/
  getRoOfficeByRegionId(event:any){
    this.regionEmployeeSchoolList=[];
    this.roOfficeList=[];
    var data={
      "regionCode":event,
       "schoolType":this.schoolType
    }
    this.outSideService.getregionSchool(data,this.loginUserNameForChild).subscribe(res => {

    this.roOfficeList=res
    console.log(res)
    },
    error => { 
      Swal.fire({
        'icon':'error',
        'text':'You are not Authorized.'
      })
    });
  }
  //***********************Get RO Office Employee *************************************/
  getRoEmpByRegionOfficeId(event:any){
    this.regionEmployeeSchoolList=[];
    const roOfficeCodename = event.split("/");
    var roOfficeCode= roOfficeCodename[0];
    var data={
      "kvCode":roOfficeCode
    }
    this.outSideService.getRegionSchoolEmployee(data,this.loginUserNameForChild).subscribe(res => {
    this.regionEmployeeSchoolList=res
    console.log(res)
     },
     error => { 
      Swal.fire({
        'icon':'error',
         'text':'You are not Authorized.'
      })
     });
  }
  applyFilterHBSource(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.userMappingSource.filter = filterValue;
  }
  //***********************Get Controller Officer  *************************************/
  
  getControllerOffice() {
    this.controllerOfficeList = [];
    const data = {
     "controllerType":"R"
  }
  this.outSideService.getControllerOffice(data,this.loginUserNameForChild ).subscribe(res => {
     this.controllerOfficeList = res['response']['rowValue'];
     if(this.userMappingAction=="update"){
      this.endDateStatus=true;
      this.editeControler();
      }
      if(this.userMappingAction=="Add"){
        this.addControler();
        }
    })
 }
 //***********************Add Controler Officer  *************************************/
  addControler(){
      this.getStationByRegionId();
      this.getRoOfficeByRegionId(this.userMappingRegionCode);
      this.addUserMapping.patchValue({
        region:this.userMappingRegionCode,
      })
    }
    currentDate():Date{
      return new Date();
    }
 //***********************Edit Controler Officer  *************************************/
  editeControler(){
    for (let i = 0; i < this.controllerOfficeList.length; i++) {
        if(this.controllerOfficeList[i].region_code==this.userMappingRegionCode)
        {
          this.duplicateregionCheck.push(this.controllerOfficeList[i]); 
        }
      }
      this.getStationByRegionId();
      this.getRoOfficeByRegionId(this.duplicateregionCheck[0]['region_code']);
      this.getRoEmpByRegionOfficeId(this.duplicateregionCheck[0]['institution_code']+'/'+this.duplicateregionCheck[0]['institutionname']);
      this.addUserMapping.patchValue({
        region:this.duplicateregionCheck[0]['region_code'],
        rooffice:this.duplicateregionCheck[0]['institution_code']+'/'+this.duplicateregionCheck[0]['institutionname'],
        empname:this.duplicateregionCheck[0]['employee_code']+'/'+this.duplicateregionCheck[0]['employee_name'],
        startdate:this.duplicateregionCheck[0]['state_date']
      })
    }

    checkDatelieBeetwenFromTo(event:any,type:any){
      console.log( this.historyControllerOfficeDataArray)
      debugger
      for (let i = 0; i < this.historyControllerOfficeDataArray.length; i++) {
        var dateFrom = this.historyControllerOfficeDataArray[i].fromdate;
        var dateTo = this.historyControllerOfficeDataArray[i].todate;
        var dateCheck;
        if(event.target.value =='undefined'){
          dateCheck =event.target.value;
        }else{
          dateCheck = moment(event.target.value).format("YYYY-MM-DD");
        }

        if((dateTo == null || dateTo == 'null') && (dateFrom == null || dateFrom == 'null') ){
          return;
        }
        var returnType
        if (dateTo == null || dateTo == 'null') {
          returnType = this.dateGreater(dateFrom, dateCheck,type);
        } else {
          returnType = this.dateCheck(dateFrom, dateTo, dateCheck,type);
        }
        if (returnType == 0) {
          Swal.fire(
            'Date lies between previous date !',
            '',
            'error'
          );
          setTimeout(() => {
            (<HTMLInputElement>document.getElementById("wordStartDate")).value = "";
            (<HTMLInputElement>document.getElementById("wordEndDate")).value = "";
            this.addUserMapping.patchValue({
              startdate:'',
            })
            this.addUserMapping.patchValue({
              enddate:'',
            })
          }, 200);
        }
      }
    }
  
    dateGreater(dateFrom, dateCheck,type) {
      var from =  Math.round((new Date(dateFrom).getTime())/(3600000*24));
      var check = Math.round((new Date(dateCheck).getTime())/(3600000*24));
      if(type==1){
      if (check >= from) {
        return 0
      } else {
        return 1;
      }
      }else if(type==2 && this.userMappingAction=='Add'){
        if (check > from) {
          return 0
        } else {
          return 1;
        }
      }else if(type==2 && this.userMappingAction=='update'){
        if (check > from) {
          return 1
        } else {
          return 0;
        }
      }
     }
  
    dateCheck(dateFrom, dateTo, dateCheck,type) {
      var from = Math.round((new Date(dateFrom).getTime())/(3600000*24));
      var to = Math.round((new Date(dateTo).getTime())/(3600000*24));
      var check = Math.round((new Date(dateCheck).getTime())/(3600000*24));
      if(type==1){
        if (check >= from && check < to) {
          return 0
        } else {
          return 1;
        }
      }else if(type==2){
        if (check > from && check <= to) {
          return 0
        } else {
          return 1;
        }
      }
    }

//***********************View Controler Officer  *************************************/
    viewControlerHeirechy(){
      this.historyControlingOfficedata=[];
      var data={
        "regionCode":this.userMappingRegionCode,
         "controllerType":"R"
      }
      this.outSideService.getControllerOfficeHistory(data,this.loginUserNameForChild).subscribe(res => {
        debugger
        this.historyControlingOfficedata=res['response'];
        this.historyControllerOfficeDataArray = [];
        for (let i = 0; i < this.historyControlingOfficedata.length; i++) {
          this.childUserData.sno = '' + (i + 1) + '';
          this.childUserData.institutionName =this.historyControlingOfficedata[i].institutionName;
          this.childUserData.employeeName =this.historyControlingOfficedata[i].employeeName;
          this.childUserData.modifiedBy = this.historyControlingOfficedata[i].modifiedBy;
          this.childUserData.fromdate = this.historyControlingOfficedata[i].stateDate;
          this.childUserData.todate = this.historyControlingOfficedata[i].endDate;
          this.childUserData.status = this.historyControlingOfficedata[i].isActive;
          this.historyControllerOfficeDataArray.push(this.childUserData);
          this.childUserData = { "sno": "","institutionName": "","employeeName": "","modifiedBy": "","fromdate":"","todate":"","status": ""}
        }
        console.log( this.historyControllerOfficeDataArray)
        setTimeout(() => {
          this.userMappingSource  = new MatTableDataSource(this.historyControllerOfficeDataArray);
          this.userMappingSource .paginator = this.paginator;
          this.userMappingSource .sort = this.userMappingSort;  
        }, 100)
      },
      error => { 
        Swal.fire({
          'icon':'error',
          'text':'You are not Authorized.'
        })
      });
    }
    
  //*********************** Submit Form  *************************************/
  onSubmit(){
    this.addUserMappingFormubmitted=true
    this.duplicateregiononeCheck=[];
    const splittedArrayEmp = this.addUserMapping.value.empname.split("/");
    var empCode= splittedArrayEmp[0];
    var empName= splittedArrayEmp[1];
    const splittedArrayInstitution = this.addUserMapping.value.rooffice.split("/");
    var institutionCode= splittedArrayInstitution[0];
    var institutionName= splittedArrayInstitution[1];
    this.activeStatus=0;
      if(this.addUserMapping.value.enddate ==null || this.addUserMapping.value.enddate=='undefined' || this.addUserMapping.value.enddate==""){
        this.activeStatus=1;
      for (let i = 0; i < this.historyControllerOfficeDataArray.length; i++) {
        var dateFrom = this.historyControllerOfficeDataArray[i].fromdate;
        var dateTo = this.historyControllerOfficeDataArray[i].todate;

   if(dateFrom!=null && (dateTo==null || dateTo=='undefined') )
   {
    if(dateTo==null || dateTo=='undefined'){
      (<HTMLInputElement>document.getElementById("wordStartDate")).value = "";
      (<HTMLInputElement>document.getElementById("wordEndDate")).value = "";
      this.addUserMapping.patchValue({
        startdate:'',
      })
      this.addUserMapping.patchValue({
        enddate:'',
      })
      Swal.fire(
        'Mapped user exist without to date',
        '',
        'error'
      );
      return;
    }
  }
      }
    }
    if( this.userMappingAction=='Add' && this.addUserMapping.value.region ==  this.userMappingRegionCode){
    for (let i = 0; i < this.controllerOfficeList.length; i++) {
      if(this.controllerOfficeList[i].region_code==this.addUserMapping.value.region)
      {
        this.duplicateregiononeCheck.push(this.controllerOfficeList[i]);
      }
    if(this.duplicateregiononeCheck.length>1){
      Swal.fire({
        'icon':'error',
        'text':"Please update the current controling officer end date.."
      })
      return false;
    }
    }
  const data = {
    "employeeCode":empCode,
    "employeeName":empName,
    "controllerType":this.controllerType,
    "regionCode":this.addUserMapping.value.region,
    "stationCode":"",
    "institutionCode":institutionCode,
    "institutionName":institutionName,
    "isActive":this.activeStatus,
    "stateDate":this.addUserMapping.value.startdate,
    "endDate":this.addUserMapping.value.enddate,
    "createdBy":this.loginUserNameForChild,
    "modifiedBy":this.loginUserNameForChild,
  }
    this.outSideService.saveControllerOffice(data,this.loginUserNameForChild).subscribe(res => {
      console.log(res)
    Swal.fire({
      'icon':'success',
      'text':res['message']
    })
    this.router.navigate(['/teacher/controler-management'])
    },
    error => { 
      Swal.fire({
        'icon':'error',
        'text':'You are not Authorized.'
      })
    });
 }
  if( this.userMappingAction=='update'){
    const data = {
      "employeeCode":empCode,
      "employeeName":empName,
      "controllerType":this.controllerType,
      "regionCode":this.addUserMapping.value.region,
      "stationCode":"",
      "institutionCode":institutionCode,
      "institutionName":institutionName,
      "isActive":this.activeStatus,
      "stateDate":this.addUserMapping.value.startdate,
      "endDate":this.addUserMapping.value.enddate,
      "id":this.duplicateregionCheck[0]['id'],
      "createdBy":this.loginUserNameForChild,
      "modifiedBy":this.loginUserNameForChild,

  }
  this.outSideService.saveControllerOffice(data,this.loginUserNameForChild).subscribe(res => {
    console.log(res)
  Swal.fire({
    'icon':'success',
    'text':res['message']
  })
  this.router.navigate(['/teacher/controler-management'])
  },
  error => { 
    Swal.fire({
      'icon':'error',
      'text':'You are not Authorized.'
    })
  });
}
}

}
