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
@Component({
  selector: 'app-kv-school-mapping',
  templateUrl: './kv-school-mapping.component.html',
  styleUrls: ['./kv-school-mapping.component.css']
})
export class KvSchoolMappingComponent implements OnInit {
  displayedColumns = ['Sno', 'Institution Name', 'Employee name', 'Modified By','fromdate','todate','Status'];
  userMappingSource : MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('userMappingSort') userMappingSort: MatSort;
  @ViewChild('JoiningBox', { static: true }) JoiningBox: TemplateRef<any>; 
  schoolChildUserData = { "sno": "","institutionName": "","employeeName": "","modifiedBy": "","fromdate":"","todate":"","status": ""}
  addSchoolMapping: FormGroup;
  loginUserNameForChild: any;
  businessUnitTypeId: any;
  schoolType: any;
  controllerType: any;
  roOSchoolList: any=[];
  regionList:any=[];
  regionEmployeeSchoolList:any=[];
  endDateStatus=false
  userMappingAction:any;
  schoolMappingKvCode:any;
  heading:any;
  businessUnitTypeCode: any;
  regionName:any
  addUserMappingFormubmitted=false;
  roSchoolkvName: any;
  controllerOfficeList:any;
  duplicateKvCheck:any=[];
  duplicateKOneCheck:any=[];
  schoolMappingEmpCode:any;
  historySchoolControlingOfficedata:any=[];
  historySchoolControllerOfficeDataArray:any=[];
  activeStatus:any;
  constructor(private outSideService: OutsideServicesService,private route: ActivatedRoute,private dateAdapter: DateAdapter<Date>,private router: Router) { 
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    $('#cf_1268591').attr("disabled", true); 
    this.heading="Add/Edit User Mapping";
    this.route.queryParams.subscribe(params => {
      this.userMappingAction=params['action'];
      this.schoolMappingKvCode=params['regionId'];
    });
    if(this.userMappingAction=="Add"){
     
      this.endDateStatus=false;
      this.addSchoolMapping = new FormGroup({
        'region': new FormControl('', Validators.required),
        'rooffice': new FormControl('', Validators.required),
        'empname': new FormControl('', Validators.required),
        'startdate':new FormControl('', Validators.required),
        'enddate': new FormControl(''),
      });
    }           
    if(this.userMappingAction=="update"){
      this.endDateStatus=true;
      this.addSchoolMapping = new FormGroup({
        'region': new FormControl('', Validators.required),
        'rooffice': new FormControl('', Validators.required),
        'empname': new FormControl('', Validators.required),
        'startdate':new FormControl('', Validators.required),
        'enddate': new FormControl('', Validators.required),
      });
    }


    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.businessUnitTypeId= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_id;
      this.businessUnitTypeCode= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_code;
    }
    alert(this.businessUnitTypeId)
    if(this.businessUnitTypeId=="2"){
    
      this.schoolType="3";
      this.controllerType="R";
    } else if(this.businessUnitTypeId=="3"){
      this.schoolType="1";
      this.controllerType="S";
    }
    if(this.userMappingAction=="view"){
      this.heading="Controller History";
    }
    this.viewSchoolControlerHeirechy();
    this.getRoSchoolControllerOffice();
  }
  get f() { return this.addSchoolMapping.controls; }
  
  //***********************Get Region*************************************/



  getStationByRegionId(){
    this.outSideService.fetchKvRegion(1).subscribe((res) => {
      this.regionList = res.response.rowValue;
   
      for (let i = 0; i <   this.regionList.length; i++) {
        if(this.regionList[i].regionCode==this.businessUnitTypeCode)
        {
         this.regionName=this.regionList[i].regionName;
         console.log( this.regionName)
         this.addSchoolMapping.patchValue({
          region: this.regionName
        })
        }
      }
    })
    }
    applyFilterHBSource(filterValue: string) {
      filterValue = filterValue.trim(); 
      filterValue = filterValue.toLowerCase(); 
      this.userMappingSource.filter = filterValue;
    }

    checkDatelieBeetwenFromTo(event:any,type:any){
      console.log( this.historySchoolControllerOfficeDataArray)
   
      for (let i = 0; i < this.historySchoolControllerOfficeDataArray.length; i++) {
        var dateFrom = this.historySchoolControllerOfficeDataArray[i].fromdate;
        var dateTo = this.historySchoolControllerOfficeDataArray[i].todate;
        var dateCheck;
        if((dateTo == null || dateTo == 'null') && (dateFrom == null || dateFrom == 'null') ){
          return;
        }
        if(event.target.value =='undefined'){
      
          dateCheck =event.target.value;
        }else{
          dateCheck = moment(event.target.value).format("YYYY-MM-DD");
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
            this.addSchoolMapping.patchValue({
              startdate:'',
            })
            this.addSchoolMapping.patchValue({
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
 //***********************Get RO Office *************************************/
 getRoOfficeByRegionId(){
debugger
  this.roOSchoolList=[];
  var data={
    "regionCode": this.businessUnitTypeCode,
     "schoolType":this.schoolType
  }
  this.outSideService.getregionSchool(data,this.loginUserNameForChild).subscribe(res => {

  this.roOSchoolList=res
  for (let i = 0; i <  this.roOSchoolList.length; i++) {
    if(this.roOSchoolList[i].kvCode==this.schoolMappingKvCode)
    {
      this.roSchoolkvName=this.roOSchoolList[i].kvName;
      this.addSchoolMapping.patchValue({
        rooffice: this.roSchoolkvName
      })
    }
  }
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
 getRoEmpByRegionOfficeId(){
  this.regionEmployeeSchoolList=[];
  var data={
    "kvCode":this.schoolMappingKvCode
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

getRoSchoolControllerOffice() { 
  var data={
    "regionCode":this.businessUnitTypeCode,
    "controllerType":this.controllerType
  }
  this.outSideService.getControllerOffice(data,this.loginUserNameForChild).subscribe(res => {

  this.controllerOfficeList = res['response']['rowValue'];
  console.log("-------------------------controler officer list---------------------")
  console.log(this.controllerOfficeList)
  if(this.userMappingAction=="update"){
    this.editeControler();
    }
    if(this.userMappingAction=="Add"){
      this.addControler();
      }
  },
  error => { 
    Swal.fire({
      'icon':'error',
      'text':'You are not Authorized.'
    })
  });
}

 //***********************Add Controler Officer  *************************************/
 addControler(){
  this.getStationByRegionId();
  this.getRoOfficeByRegionId();
  this. getRoEmpByRegionOfficeId();
  
}

//***********************Edit Controler Officer  *************************************/
editeControler(){
for (let i = 0; i < this.controllerOfficeList.length; i++) {
    if(this.controllerOfficeList[i].kv_code==this.schoolMappingKvCode)
    {
      this.duplicateKvCheck.push(this.controllerOfficeList[i]); 
    }
  }
  this.getStationByRegionId();
  this.getRoOfficeByRegionId();
  this.getRoEmpByRegionOfficeId();
  this.addSchoolMapping.patchValue({
    empname:this.duplicateKvCheck[0]['employee_code']+'/'+this.duplicateKvCheck[0]['employee_name'],
    startdate:this.duplicateKvCheck[0]['state_date']
  })
}

//***********************View Controler Officer  *************************************/
viewSchoolControlerHeirechy(){
  var data={
    "regionCode":this.schoolMappingKvCode,
     "controllerType":"S"
  }
  this.outSideService.getControllerOfficeHistory(data,this.loginUserNameForChild).subscribe(res => {
    this.historySchoolControlingOfficedata=res['response'];
    this.historySchoolControllerOfficeDataArray = [];
    for (let i = 0; i < this.historySchoolControlingOfficedata.length; i++) {
      this.schoolChildUserData.sno = '' + (i + 1) + '';
      this.schoolChildUserData.institutionName =this.historySchoolControlingOfficedata[i].institutionName;
      this.schoolChildUserData.employeeName =this.historySchoolControlingOfficedata[i].employeeName;
      this.schoolChildUserData.modifiedBy = this.historySchoolControlingOfficedata[i].modifiedBy;
      this.schoolChildUserData.status = this.historySchoolControlingOfficedata[i].isActive;
      this.schoolChildUserData.fromdate = this.historySchoolControlingOfficedata[i].stateDate;
      this.schoolChildUserData.todate = this.historySchoolControlingOfficedata[i].endDate;
      this.historySchoolControllerOfficeDataArray.push(this.schoolChildUserData);
      this.schoolChildUserData = { "sno": "","institutionName": "","employeeName": "","modifiedBy": "","fromdate":"","todate":"","status": ""}
    }
    console.log("---school  mapping------------")
    console.log(this.historySchoolControllerOfficeDataArray)
    setTimeout(() => {
      this.userMappingSource  = new MatTableDataSource(this.historySchoolControllerOfficeDataArray);
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

currentDate():Date{
  return new Date();
}
  onSubmit(){
    this.addUserMappingFormubmitted=true
    this.duplicateKOneCheck=[];
    const splittedArrayEmp = this.addSchoolMapping.value.empname.split("/");
    var empCode= splittedArrayEmp[0];
    var empName= splittedArrayEmp[1];
    var institutionCode= this.schoolMappingKvCode;
    var institutionName= this.addSchoolMapping.value.rooffice;
    this.activeStatus=0;
      if(this.addSchoolMapping.value.enddate ==null || this.addSchoolMapping.value.enddate=='undefined' || this.addSchoolMapping.value.enddate==""){
        this.activeStatus=1;
      for (let i = 0; i < this.historySchoolControllerOfficeDataArray.length; i++) {
        var dateFrom = this.historySchoolControllerOfficeDataArray[i].fromdate;
        var dateTo = this.historySchoolControllerOfficeDataArray[i].todate;
   if(dateFrom!=null && dateTo!=null )
   {
    if(dateTo==null || dateTo=='undefined'){
      (<HTMLInputElement>document.getElementById("wordStartDate")).value = "";
      (<HTMLInputElement>document.getElementById("wordEndDate")).value = "";
      this.addSchoolMapping.patchValue({
        startdate:'',
      })
      this.addSchoolMapping.patchValue({
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
    if( this.userMappingAction=='Add'){
    for (let i = 0; i < this.controllerOfficeList.length; i++) {
      if(this.controllerOfficeList[i].kv_code==this.schoolMappingKvCode)
      {
        this.duplicateKOneCheck.push(this.controllerOfficeList[i]);
      }
     
    if(this.duplicateKOneCheck.length>1){
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
    "regionCode":this.businessUnitTypeCode,
    "stationCode":"",
    "institutionCode":institutionCode,
    "institutionName":institutionName,
    "isActive":this.activeStatus,
    "stateDate":this.addSchoolMapping.value.startdate,
    "endDate":this.addSchoolMapping.value.enddate,
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
      "regionCode":this.businessUnitTypeCode,
      "stationCode":"",
      "institutionCode":institutionCode,
      "institutionName":institutionName,
      "isActive":this.activeStatus,
      "stateDate":this.addSchoolMapping.value.startdate,
      "endDate":this.addSchoolMapping.value.enddate,
      "id":this.duplicateKvCheck[0]['id'],
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
