import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as echarts from 'echarts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, RowGroupingDisplayType } from 'ag-grid-community';
@Component({
  selector: 'app-region-dashboard',
  templateUrl: './region-dashboard.component.html',
  styleUrls: ['./region-dashboard.component.css']
})
export class RegionDashboardComponent implements OnInit {   
  @ViewChild('AllDropBox', { static: true }) AllDropBox: TemplateRef<any>;

  @ViewChild('AllDetailBox', { static: true }) AllDetailBox: TemplateRef<any>;



  kvicons: any;
  businessUnitTypeId: any;
  businessUnitTypeCode: any;
  dashboardData: any
  totalTeachingStaff: any;
  nontotalTeachingStaff: any;
  teachingNotVerified: any;
  nonteachingNotVerified:any;
  kvSchoolDetails:any;
  kvCode:any;
  kvSchoolList:any;
  stationCode1:any;
  regionCode:any;
  regionList:any;
  stationList:any;
  loginUserNameForChild:any;
  options: any;
  regionWiseEmployeeDetail:any;
  regionWiseEmployeeDetailGenderData: any;
  dashboardDetails:any;
  stationTotal:any;
  teachingMaleFemaleTotal: any;
  nonTeachingMaleFemaleTotal: any;
  inPositionTotal: any;
  dropBoxDetail:any;
  dropBoxType: any = new Array();
  dropBoxValue: any = new Array();
  showFirstButtonColor: boolean = true;
  showsecondButtonColor: boolean = false;
  activePaneOne: boolean = true;
  activePaneTwo: boolean = false;
  moreInfo: boolean = true;
  regionWiseEmplCount: number = 0;
  teachingFeMaleCount: number = 0;
  teachingMaleCount:number = 0;
  nonTeachingMaleCount: number = 0;
  nonTeachingFeMaleCount: number = 0;
  teachingUnspecifiedCount: number = 0;
  nonTeachingUnspecifiedCount: number = 0;
  allResultDaata: any = new Array();
  allRegioWiseData: any = new Array();
  rowData: any = new Array();
  dropBoxRowData: any = new Array();
  allResData: any;
  rows: any;
  reportIdAction: any;
  regionWiseEmployeeRetirment:any;
  regionWiseArray: any = new Array();
  newRegionArray: any;
  getRetirementWiseEmployee:any;
  empoyeeUnderRetirement:any;
  regionNameinArray: any;
  regionNameGenderinArray: any;
  rowanyData: any = new Array();
  teachingMaleCountArray: any = new Array();
  teachingFemaleCountArray: any = new Array();
  teachingUnspecifiedCountArray: any = new Array();
  nonTeachingMaleCountArray: any = new Array();
  nonTeachingFemaleCountArray: any = new Array();
  nonTeachingUnspecifiedCountArray: any = new Array();
  totalSchoolsInRegion: any = new Array();
  stationWiseCatArray: any = new Array();
  allDropoxDta: any = new Array();
  getTotalEmployeeGenderAgeWiseArray: any = new Array();
  rowanyDataForWithOutDropBox: any = new Array();
  regionName: any;
  regionWiseSchoolDetails: any;
  regionWiseSchoolDetail:any;
  stationWiseCategory:any;
  allEmplDetails: any;
  getRegionWiseEmployeeAge:any;
  regionWiseEmployeeAge:any;
  empoyeeUnderAge:any;
  dropBoxSrNo:any;
  dropBoxRegionName:any;
  dropBoxKvName:any;
  totalEmployeeGenderWise:any;
  dropBoxNOOfEmplAddUpdatedthis:any;
  stationWiseSchoolArray: any = new Array()
  totalStationInRegion: any = new Array()
  totalStationInRegionCount: any = new Array()
  stationWiseSchoolInBarChart:any;
  columnDefs: any = [];
  dropboxName: string;
  regionStationName: string;
  allDetailsData: any = new Array();
  DetailsSrNo: any = new Array()
  DetailsRegionName: any = new Array()
  DetailsKvName: any = new Array()
  DetailsEmpName: any = new Array()
  DetailsTeacherMobile: any = new Array()
  DetailsTeacherDob: any = new Array()
  DetailsDropBoxResion: any = new Array()
  rowanyDetailDataForWithOutDropBox: any = new Array()
  dropBoxDetailRowData: any = new Array()
  ageYearsArray: any = new Array()
  regionWiseMale:any;
  regionWiseFeMale:any;
  regionAgeWiseName:any;
  constructor(public outSideService: OutsideServicesService,private router: Router,private modalService: NgbModal) {    }
  ngOnInit(): void {
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_id;
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.businessUnitTypeCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      if (JSON.parse(sessionStorage.getItem("authTeacherDetails")).applicationDetails[i].application_id == environment.applicationId) {
        const data: any = {
          "extcall": "MOE_EXT_REGIONMAPPINGDATA",
          "conditionvalue": [JSON.parse(sessionStorage.getItem("authTeacherDetails")).applicationDetails[i].business_unit_type_code]
        }
        this.getMaster(data, this.businessUnitTypeId);
      }
    }
    this.getKvRegion();
    if (this.businessUnitTypeId == '2') {

      var dashBoardDataNationtion={
        "regionCode":'',
        "dashboardType":"N"
      }
      this.outSideService.getRoDashboard(dashBoardDataNationtion,this.loginUserNameForChild).subscribe(res => {
        debugger
        this.dashboardDetails=res;
        console.log(res)
        this.stationTotal= res['totalNormalStation']+res['totalPriorityStation']+res['totalHardStation']+res['totalVeryHardStation']+res['totalNerStation'];
        this.teachingMaleFemaleTotal= res['teachingMale']+res['teachingFemale']+res['teachingNoGender'];
        this.nonTeachingMaleFemaleTotal= res['nonTeachingMale']+res['nonTeachingFeMale']+res['nonteachingNoGender'];
        this.inPositionTotal=this.teachingMaleFemaleTotal+this.nonTeachingMaleFemaleTotal
        this.getStationCategory();
        //  this.router.navigate(['/teacher/controler-management'])
      },
      error => { 
        Swal.fire({
          'icon':'error',
          'text':'You are not Authorized.'
        })
      });

   
    } else if (this.businessUnitTypeId == '3') {
      var dashBoardDataRo={
        "regionCode":this.businessUnitTypeCode,
        "dashboardType":"R"
      }
      this.outSideService.getRoDashboard(dashBoardDataRo,this.loginUserNameForChild).subscribe(res => {
        this.dashboardDetails=res;
        console.log(res)
        this.stationTotal= res['totalNormalStation']+res['totalPriorityStation']+res['totalHardStation']+res['totalVeryHardStation']+res['totalNerStation'];
        this.teachingMaleFemaleTotal= res['teachingMale']+res['teachingFemale'];
        this.nonTeachingMaleFemaleTotal= res['nonTeachingMale']+res['nonTeachingFeMale'];
        this.inPositionTotal=this.teachingMaleFemaleTotal+this.nonTeachingMaleFemaleTotal;
        //  this.router.navigate(['/teacher/controler-management'])
        
      },
      error => { 
        Swal.fire({
          'icon':'error',
          'text':'You are not Authorized.'
        })
      });

      // this.showRegion = true;
      var data = {
        "businessUnitTypeId": this.businessUnitTypeId,
        "businessUnitTypeCode": this.businessUnitTypeCode
      }
      this.outSideService.fetchDashboardData(data).subscribe((res) => {
        this.dashboardData = res.response;
        this.totalTeachingStaff = this.dashboardData.teachingRegular * 1 + this.dashboardData.teachingContractual * 1
        this.nontotalTeachingStaff = this.dashboardData.nonteachingContractual * 1 + this.dashboardData.nonteachingRegular * 1
         this.teachingNotVerified = this.dashboardData.teachingTi * 1 +
          this.dashboardData.teachingTa * 1 +
          this.dashboardData.teachingSi * 1 +
          this.dashboardData.teachingNi * 1
         this.nonteachingNotVerified = this.dashboardData.nonteachingNi * 1 +
          this.dashboardData.nonteachingSi * 1 +
          this.dashboardData.nonteachingTa * 1 +
          this.dashboardData.nonteachingTi * 1
      })
    } else if (this.businessUnitTypeId == '4') {
      // this.showStation = true
    } else if (this.businessUnitTypeId == '5') {
      // this.showSchool = true;
    }
this.getdropBoxDetail();
this.getTotalRegionEmployee();
var data1 = {
  reportId: '1004',
  region: '1',
  station: 'All',
  school: '',
};
this.regionName='PATNA';
this.empoyeeUnderAge='Under 30';
this.empoyeeUnderRetirement='Under 60';
this.getTotalRegionEmployeeByGender(data1)
this.getTotalRegionSchoolDetail();
this.getDashboardEmployeeDetails();
//this.getRegionWiseEmployeeAgeData();
this.regionStationName='AHMEDABAD';
this.onChartEventRegionWiseSchool(this.regionStationName);
this.getRetirementWiseEmployeeData();
this.getAllAgeWiseData();

this.onChartEventEmployeeAgeRegionWise('Between(18-30)')

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
getdropBoxDetail(){
  var data ={
     region: "All",
     reportId: "1005",
     school: "",
     station: ""
  }
  this.outSideService.getReportByID(data).subscribe((res) => {
  console.log(res);
  this.dropBoxDetail=res.rowValue;
  for (let i = 0; i < this.dropBoxDetail.length; i++) {
if(this.dropBoxDetail[i]['employeedropid'] == 1){
  var data ={
    value: this.dropBoxDetail[i]['count'],
    name: "Retirement",
 }


  this.dropBoxValue.push(data)
}
if(this.dropBoxDetail[i]['employeedropid'] == 2){
  this.dropBoxType.push('Transfer');


  var data ={
    value: this.dropBoxDetail[i]['count'],
    name: "Transfer",
 }
 this.dropBoxValue.push(data)
}
if(this.dropBoxDetail[i]['employeedropid'] == 3){
 
  var data ={
    value: this.dropBoxDetail[i]['count'],
    name: "Death",
 }
  this.dropBoxValue.push(data)
}
if(this.dropBoxDetail[i]['employeedropid'] == 4){

  var data ={
    value: this.dropBoxDetail[i]['count'],
    name: "Others",
 }
  this.dropBoxValue.push(data)
}
if(this.dropBoxDetail[i]['employeedropid'] == 5){

  var data ={
    value: this.dropBoxDetail[i]['count'],
    name: "Promotion",
 }
  this.dropBoxValue.push(data)
}
if(this.dropBoxDetail[i]['employeedropid'] == 6){

  var data ={
    value: this.dropBoxDetail[i]['count'],
    name: "Resignation",
 }
  this.dropBoxValue.push(data)
}

}
  })
  this.dropBoxDetailinPieChart();
}

dropBoxDetailinPieChart(){
console.log("drop box type---------")
  console.log( this.dropBoxValue)
  this.options = {
    title: {
      text: 'Total Number of Employees Available in Dropbox',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    label: {
      show: false,
      position: 'center'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        radius: ['40%', '70%'],
        name: 'Dropbox',
        type: 'pie',
        //radius: '60%',
        data:this.dropBoxValue,
        
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}

getDashboardEmployeeDetails(){
  this.outSideService.getDashboardEmployeeDetails().subscribe((res)=>{
    this.allEmplDetails = res;
  })
}

getEmployeeStaticsDetailsReport(){
  this.modalService.dismissAll();
  this.moreInfo=false;
  //this.modalService.open(this.AllDetailBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
  this.allDetailsData=[];
  this.rowanyDetailDataForWithOutDropBox=[];
  this.dropBoxRowData=[];
  this.dropBoxDetailRowData=[];
 if(this.dropboxName=='In Dropbox')
 {
  this.outSideService.getEmployeeDetailsRegionSchoolWiseDropbox().subscribe((res)=>{
    this.modalService.open(this.AllDropBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
   console.log(res)
     console.log("----in drop box----")
     console.log(res)
     this.allDetailsData=res;
     this.DetailsSrNo=[];
     this.DetailsRegionName=[];
     this.DetailsKvName=[];
     this.DetailsEmpName=[];
     this.DetailsTeacherMobile=[];
     this.DetailsTeacherDob=[];
     this.DetailsDropBoxResion=[];
   for (let i = 0; i < this.allDetailsData.length; i++) {
     this.DetailsSrNo=i+1;
     this.DetailsRegionName =this.allDetailsData[i]['region_name'];
     this.DetailsKvName =this.allDetailsData[i]['kvschool'];
     this.DetailsEmpName=this.allDetailsData[i]['empnameandcode']; 
     this.DetailsTeacherMobile=this.allDetailsData[i]['teacher_mobile']; 
    // this.DetailsTeacherDob=this.allDetailsData[i]['empnameandcode']; 
     this.DetailsDropBoxResion=this.allDetailsData[i]['reasontomovetodropbox']; 

     this.rowanyDetailDataForWithOutDropBox = [
       {
         SrNo: this.DetailsSrNo,
         RegionName: this.DetailsRegionName,
         KVName: this.DetailsKvName,
         emplName: this.DetailsEmpName,
         mobileNo: this.DetailsTeacherMobile,
       //  dob: this.DetailsTeacherDob,
         dropResion:this.DetailsDropBoxResion
       },
     ];
     this.dropBoxRowData.push(this.rowanyDetailDataForWithOutDropBox[0]);
   
   }
  // this.dropBoxRowData.push(this.rowanyDetailDataForWithOutDropBox[0]);
   console.log(this.dropBoxRowData)
   this.columnDefs = [
     {headerName: 'S.No', field: 'SrNo' },
     {headerName: "Region Name", field: "RegionName"},
     {headerName: "KV/RO/HQ Name", field: "KVName"},
     {headerName: "Mobile", field: "mobileNo"},
   //  {headerName: "D.O.B", field: "dob"},
     {headerName: "Drop Reason", field: "dropResion"},
   ];
  })
}


// if(this.dropboxName=='without')
//  {

//  }

// if(this.dropboxName=='with')
//  {
  
//  }

 if(this.dropboxName=='Profile Updated Today')
 {
  debugger
  this.outSideService.getEmployeeDetailsProfileUpdatedAddedToday().subscribe((res)=>{
    this.modalService.open(this.AllDropBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
   console.log(res)
     console.log("----in drop box----")
     console.log(res)
     this.allDetailsData=res.rowValue;
     this.DetailsSrNo=[];
     this.DetailsRegionName=[];
     this.DetailsKvName=[];
     this.DetailsEmpName=[];
     this.DetailsTeacherMobile=[];
     this.DetailsTeacherDob=[];
     this.DetailsDropBoxResion=[];
   for (let i = 0; i < this.allDetailsData.length; i++) {
     this.DetailsSrNo=i+1;
     this.DetailsRegionName =this.allDetailsData[i]['region_name'];
     this.DetailsKvName =this.allDetailsData[i]['kvschool'];
     this.DetailsEmpName=this.allDetailsData[i]['empnameandcode']; 
     this.DetailsTeacherMobile=this.allDetailsData[i]['teacher_mobile']; 
    // this.DetailsTeacherDob=this.allDetailsData[i]['empnameandcode']; 
     this.DetailsDropBoxResion=this.allDetailsData[i]['reasontomovetodropbox']; 

     this.rowanyDetailDataForWithOutDropBox = [
       {
         SrNo: this.DetailsSrNo,
         RegionName: this.DetailsRegionName,
         KVName: this.DetailsKvName,
         emplName: this.DetailsEmpName,
         mobileNo: this.DetailsTeacherMobile,
       //  dob: this.DetailsTeacherDob,
         dropResion:this.DetailsDropBoxResion
       },
     ];
     this.dropBoxRowData.push(this.rowanyDetailDataForWithOutDropBox[0]);
   
   }
  // this.dropBoxRowData.push(this.rowanyDetailDataForWithOutDropBox[0]);
   console.log(this.dropBoxRowData)
   this.columnDefs = [
     {headerName: 'S.No', field: 'SrNo' },
     {headerName: "Region Name", field: "RegionName"},
     {headerName: "KV/RO/HQ Name", field: "KVName"},
     {headerName: "Mobile", field: "mobileNo"},
   //  {headerName: "D.O.B", field: "dob"},
     {headerName: "Drop Reason", field: "dropResion"},
   ];
  })
 }

 if(this.dropboxName=='Profile Updated')
 {
  this.outSideService.getEmployeeDetailsProfileUpdatedAdded().subscribe((res)=>{
    this.modalService.open(this.AllDropBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
   console.log(res)
     console.log("----in drop box----")
     console.log(res)
     this.allDetailsData=res.rowValue;
     this.DetailsSrNo=[];
     this.DetailsRegionName=[];
     this.DetailsKvName=[];
     this.DetailsEmpName=[];
     this.DetailsTeacherMobile=[];
     this.DetailsTeacherDob=[];
     this.DetailsDropBoxResion=[];
   for (let i = 0; i < this.allDetailsData.length; i++) {
     this.DetailsSrNo=i+1;
     this.DetailsRegionName =this.allDetailsData[i]['region_name'];
     this.DetailsKvName =this.allDetailsData[i]['kvschool'];
     this.DetailsEmpName=this.allDetailsData[i]['empnameandcode']; 
     this.DetailsTeacherMobile=this.allDetailsData[i]['teacher_mobile']; 
    // this.DetailsTeacherDob=this.allDetailsData[i]['empnameandcode']; 
     this.DetailsDropBoxResion=this.allDetailsData[i]['reasontomovetodropbox']; 

     this.rowanyDetailDataForWithOutDropBox = [
       {
         SrNo: this.DetailsSrNo,
         RegionName: this.DetailsRegionName,
         KVName: this.DetailsKvName,
         emplName: this.DetailsEmpName,
         mobileNo: this.DetailsTeacherMobile,
       //  dob: this.DetailsTeacherDob,
         dropResion:this.DetailsDropBoxResion
       },
     ];
     this.dropBoxRowData.push(this.rowanyDetailDataForWithOutDropBox[0]);
   
   }
  // this.dropBoxRowData.push(this.rowanyDetailDataForWithOutDropBox[0]);
   console.log(this.dropBoxRowData)
   this.columnDefs = [
     {headerName: 'S.No', field: 'SrNo' },
     {headerName: "Region Name", field: "RegionName"},
     {headerName: "KV/RO/HQ Name", field: "KVName"},
     {headerName: "Mobile", field: "mobileNo"},
   //  {headerName: "D.O.B", field: "dob"},
     {headerName: "Drop Reason", field: "dropResion"},
   ];
  })
 }
  if(this.dropboxName=='Profile Not Updated')
 {
  this.outSideService.getEmployeeDetailsProfileNotUpdatedCurrentYear().subscribe((res)=>{
    this.modalService.open(this.AllDropBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
   console.log(res)
     console.log("----in drop box----")
     console.log(res)
     this.allDetailsData=res;
     this.DetailsSrNo=[];
     this.DetailsRegionName=[];
     this.DetailsKvName=[];
     this.DetailsEmpName=[];
     this.DetailsTeacherMobile=[];
     this.DetailsTeacherDob=[];
     this.DetailsDropBoxResion=[];
   for (let i = 0; i < this.allDetailsData.length; i++) {
     this.DetailsSrNo=i+1;
     this.DetailsRegionName =this.allDetailsData[i]['region_name'];
     this.DetailsKvName =this.allDetailsData[i]['kvschool'];
     this.DetailsEmpName=this.allDetailsData[i]['empnameandcode']; 
     this.DetailsTeacherMobile=this.allDetailsData[i]['teacher_mobile']; 
    // this.DetailsTeacherDob=this.allDetailsData[i]['empnameandcode']; 
  //   this.DetailsDropBoxResion=this.allDetailsData[i]['reasontomovetodropbox']; 

     this.rowanyDetailDataForWithOutDropBox = [
       {
         SrNo: this.DetailsSrNo,
         RegionName: this.DetailsRegionName,
         KVName: this.DetailsKvName,
         emplName: this.DetailsEmpName,
         mobileNo: this.DetailsTeacherMobile,
       //  dob: this.DetailsTeacherDob,
       //  dropResion:this.DetailsDropBoxResion
       },
     ];
     this.dropBoxRowData.push(this.rowanyDetailDataForWithOutDropBox[0]);
   
   }
  // this.dropBoxRowData.push(this.rowanyDetailDataForWithOutDropBox[0]);
   console.log(this.dropBoxRowData)
   this.columnDefs = [
     {headerName: 'S.No', field: 'SrNo' },
     {headerName: "Region Name", field: "RegionName"},
     {headerName: "KV/RO/HQ Name", field: "KVName"},
     {headerName: "Mobile", field: "mobileNo"},
   //  {headerName: "D.O.B", field: "dob"},
   //  {headerName: "Drop Reason", field: "dropResion"},
   ];
  })
  }

}


withOUtDroBoxClick(event:any){
  this.moreInfo=true;
  this.allDropoxDta=[];
  this.dropBoxRowData=[];
  if(event=='profilenotupdate')
  {
    this.dropboxName='Profile Not Updated';
  this.outSideService.getRegionSchoolWiseProfileNotUpdatedCurrentYear().subscribe((res)=>{
    this.modalService.open(this.AllDropBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
  //  this.allEmplDetails = res;
    console.log("----in drop box----")
    console.log(res)
    this.allDropoxDta=res;
    this.dropBoxSrNo=[];
    this.dropBoxRegionName=[];
    this.dropBoxKvName=[];
    this.dropBoxNOOfEmplAddUpdatedthis=[];
    this.rowanyDataForWithOutDropBox=[];
  for (let i = 0; i < this.allDropoxDta.length; i++) {
    this.dropBoxSrNo=i+1;
    this.dropBoxRegionName =this.allDropoxDta[i]['region_name'];
    this.dropBoxKvName =this.allDropoxDta[i]['kv_name'];
    this.dropBoxNOOfEmplAddUpdatedthis=this.allDropoxDta[i]['noofempprofileaddedupdated']; 
    this.rowanyDataForWithOutDropBox = [
      {
        SrNo: this.dropBoxSrNo,
        RegionName: this.dropBoxRegionName,
        KvName: this.dropBoxKvName,
        EmpAddUpDated: this.dropBoxNOOfEmplAddUpdatedthis,
      },
    ];

    this.dropBoxRowData.push(this.rowanyDataForWithOutDropBox[0]);
  }
  this.columnDefs = [
    {headerName: 'S.No', field: 'SrNo' },
    {headerName: "Region Name", field: "RegionName",},
    {headerName: "KV/RO/HQ Name", field: "KvName",},
    {headerName: "No.of Profiles Updated", field: "EmpAddUpDated",},
  ];
  })
  }
  if(event=='profileUpdate')
  {
    this.dropboxName='Profile Updated';
  this.outSideService.getRegionSchoolWiseProfileUpdatedAdded().subscribe((res)=>{
    this.modalService.open(this.AllDropBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
  //  this.allEmplDetails = res;
    console.log("----in drop box----")
    console.log(res)
    this.allDropoxDta=res;
    this.dropBoxSrNo=[];
    this.dropBoxRegionName=[];
    this.dropBoxKvName=[];
    this.dropBoxNOOfEmplAddUpdatedthis=[];
    this.rowanyDataForWithOutDropBox=[];
  for (let i = 0; i < this.allDropoxDta.length; i++) {
    this.dropBoxSrNo=i+1;
    this.dropBoxRegionName =this.allDropoxDta[i]['region_name'];
    this.dropBoxKvName =this.allDropoxDta[i]['kv_name'];
    this.dropBoxNOOfEmplAddUpdatedthis=this.allDropoxDta[i]['noofempprofileaddedupdated']; 
    this.rowanyDataForWithOutDropBox = [
      {
        SrNo: this.dropBoxSrNo,
        RegionName: this.dropBoxRegionName,
        KvName: this.dropBoxKvName,
        EmpAddUpDated: this.dropBoxNOOfEmplAddUpdatedthis,
      },
    ];

    this.dropBoxRowData.push(this.rowanyDataForWithOutDropBox[0]);
  }
  this.columnDefs = [
    {headerName: 'S.No', field: 'SrNo' },
    {headerName: "Region Name", field: "RegionName",},
    {headerName: "KV/RO/HQ Name", field: "KvName",},
    {headerName: "No.of Profiles Updated", field: "EmpAddUpDated",},
  ];
  })
  }

  if(event=='profileUpdatedToday')
  {
    this.dropboxName='Profile Updated Today';
  this.outSideService.getRegionSchoolWiseProfileUpdatedAddedToday().subscribe((res)=>{
    this.modalService.open(this.AllDropBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
  //  this.allEmplDetails = res;
    console.log("----in drop box----")
    console.log(res)
    this.allDropoxDta=res.rowValue;
    this.dropBoxSrNo=[];
    this.dropBoxRegionName=[];
    this.dropBoxKvName=[];
    this.dropBoxNOOfEmplAddUpdatedthis=[];
    this.rowanyDataForWithOutDropBox=[];
  for (let i = 0; i < this.allDropoxDta.length; i++) {
    this.dropBoxSrNo=i+1;
    this.dropBoxRegionName =this.allDropoxDta[i]['region_name'];
    this.dropBoxKvName =this.allDropoxDta[i]['kv_name'];
    this.dropBoxNOOfEmplAddUpdatedthis=this.allDropoxDta[i]['noofempprofileaddedupdated'];
    this.rowanyDataForWithOutDropBox = [
      {
        SrNo: this.dropBoxSrNo,
        RegionName: this.dropBoxRegionName,
        KvName: this.dropBoxKvName,
        EmpAddUpDated: this.dropBoxNOOfEmplAddUpdatedthis,
      },
    ];

    this.dropBoxRowData.push(this.rowanyDataForWithOutDropBox[0]);
  }
  this.columnDefs = [
    {headerName: 'S.No', field: 'SrNo' },
    {headerName: "Region Name", field: "RegionName",},
    {headerName: "KV/RO/HQ Name", field: "KvName",},
    {headerName: "No.of Profiles Updated", field: "EmpAddUpDated",},
  ];
  })
  }

  if(event=='IndropBox')
  {
    this.dropboxName='In Dropbox';
  this.outSideService.getNoOfEmployeeRegionSchoolWiseDropbox().subscribe((res)=>{
    this.modalService.open(this.AllDropBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
  //  this.allEmplDetails = res;
    console.log("----in drop box----")
    console.log(res)
    this.allDropoxDta=res;
    this.dropBoxSrNo=[];
    this.dropBoxRegionName=[];
    this.dropBoxKvName=[];
    this.dropBoxNOOfEmplAddUpdatedthis=[];
    this.rowanyDataForWithOutDropBox=[];
  for (let i = 0; i < this.allDropoxDta.length; i++) {
    this.dropBoxSrNo=i+1;
    this.dropBoxRegionName =this.allDropoxDta[i]['region_name'];
    this.dropBoxKvName =this.allDropoxDta[i]['kv_name'];
    this.dropBoxNOOfEmplAddUpdatedthis=this.allDropoxDta[i]['noofempprofileaddedupdated'];
    this.rowanyDataForWithOutDropBox = [
      {
        SrNo: this.dropBoxSrNo,
        RegionName: this.dropBoxRegionName,
        KvName: this.dropBoxKvName,
        EmpAddUpDated: this.dropBoxNOOfEmplAddUpdatedthis,
      },
    ];

    this.dropBoxRowData.push(this.rowanyDataForWithOutDropBox[0]);
  }
  this.columnDefs = [
    {headerName: 'S.No', field: 'SrNo' },
    {headerName: "Region Name", field: "RegionName",},
    {headerName: "KV/RO/HQ Name", field: "KvName",},
    {headerName: "No.of Profiles Updated", field: "EmpAddUpDated",},
  ];
  })
  }

  if(event=='with')
  {
    this.dropboxName='Total Employees';
  this.outSideService.getNoOfEmployeeRegionSchoolWiseIncludeDropbox().subscribe((res)=>{
    this.modalService.open(this.AllDropBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
  //  this.allEmplDetails = res;
    this.allDropoxDta=res;
    this.dropBoxSrNo=[];
    this.dropBoxRegionName=[];
    this.dropBoxKvName=[];
    this.dropBoxNOOfEmplAddUpdatedthis=[];
    this.rowanyDataForWithOutDropBox=[];
  for (let i = 0; i < this.allDropoxDta.length; i++) {
    this.dropBoxSrNo=i+1;
    this.dropBoxRegionName =this.allDropoxDta[i]['region_name'];
    this.dropBoxKvName =this.allDropoxDta[i]['kv_name'];
    this.dropBoxNOOfEmplAddUpdatedthis=this.allDropoxDta[i]['noofempprofileaddedupdated'];
    this.rowanyDataForWithOutDropBox = [
      {
        SrNo: this.dropBoxSrNo,
        RegionName: this.dropBoxRegionName,
        KvName: this.dropBoxKvName,
        EmpAddUpDated: this.dropBoxNOOfEmplAddUpdatedthis,
      },
    ];

    this.dropBoxRowData.push(this.rowanyDataForWithOutDropBox[0]);
  }
  this.columnDefs = [
    {headerName: 'S.No', field: 'SrNo' },
    {headerName: "Region Name", field: "RegionName",},
    {headerName: "KV/RO/HQ Name", field: "KvName",},
    {headerName: "No.of Profiles Updated", field: "EmpAddUpDated",},
  ];
  })
}

if(event=='without')
  {
    this.dropboxName='In Institute';
  this.outSideService.getNoOfEmployeeRegionSchoolWiseExcludeDropbox().subscribe((res)=>{
    this.modalService.open(this.AllDropBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
    console.log(res);
  //  this.allEmplDetails = res;
    this.allDropoxDta=res;
    this.dropBoxSrNo=[];
    this.dropBoxRegionName=[];
    this.dropBoxKvName=[];
    this.dropBoxNOOfEmplAddUpdatedthis=[];
    this.rowanyDataForWithOutDropBox=[];
  for (let i = 0; i < this.allDropoxDta.length; i++) {
    this.dropBoxSrNo=i+1;
    this.dropBoxRegionName =this.allDropoxDta[i]['region_name'];
    this.dropBoxKvName =this.allDropoxDta[i]['kv_name'];
    this.dropBoxNOOfEmplAddUpdatedthis=this.allDropoxDta[i]['noofempprofileaddedupdated'];
    this.rowanyDataForWithOutDropBox = [
      {
        SrNo: this.dropBoxSrNo,
        RegionName: this.dropBoxRegionName,
        KvName: this.dropBoxKvName,
        EmpAddUpDated: this.dropBoxNOOfEmplAddUpdatedthis,
      },
    ];

    this.dropBoxRowData.push(this.rowanyDataForWithOutDropBox[0]);
  }
  this.columnDefs = [
    {headerName: 'S.No', field: 'SrNo' },
    {headerName: "Region Name", field: "RegionName",},
    {headerName: "KV/RO/HQ Name", field: "KvName",},
    {headerName: "No.of Profiles Updated", field: "EmpAddUpDated",},
  ];
  })
}


}
public defaultColDef: ColDef = {
  flex: 1,
  minWidth: 150,
  filter: true,
  sortable: true,
  floatingFilter: true,
  resizable: true,
};
public groupDisplayType: RowGroupingDisplayType = 'multipleColumns';
  gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
    },
    // debug: true,
    columnDefs: this.columnDefs,
    suppressAggFuncInHeader: true,
    rowData: null,
  };

  public autoGroupColumnDef: ColDef = {
    minWidth: 220,
  };
cancelModal() {
  this.modalService.dismissAll();
}
  getMaster(data, business_unit_type_id) {
      this.outSideService.getMasterData(data).subscribe((res) => {
        
        var data1 = { 'business_unit_type_id': business_unit_type_id, "mappingData": JSON.parse(JSON.stringify(res.response)).rowValue }
        sessionStorage.setItem("mappingData", JSON.stringify(data1));
        
        this.kvSchoolDetails = JSON.parse(JSON.stringify(res.response)).rowValue[0];
      })
    }

    getStationByRegionId(val){
      var data = {
        "businessUnitTypeId":'3',
        "businessUnitTypeCode":val
      }
  
      this.outSideService.fetchDashboardData(data).subscribe((res)=>{
        this.dashboardData = res.response;
  
        this.totalTeachingStaff = this.dashboardData.teachingRegular * 1 + this.dashboardData.teachingContractual * 1
          this.nontotalTeachingStaff = this.dashboardData.nonteachingContractual * 1 + this.dashboardData.nonteachingRegular * 1
  
          this.teachingNotVerified = this.dashboardData.teachingTi * 1 +
            this.dashboardData.teachingTa * 1 +
            this.dashboardData.teachingSi * 1 +
            this.dashboardData.teachingNi * 1
  
          this.nonteachingNotVerified = this.dashboardData.nonteachingNi * 1 +
            this.dashboardData.nonteachingSi * 1 +
            this.dashboardData.nonteachingTa * 1 +
            this.dashboardData.nonteachingTi * 1          
      })
      this.outSideService.fetchStationByRegionId(val).subscribe((res)=>{
        this.stationList = res.response;
        
      })
    }

    getKvRegion(){
      this.outSideService.fetchKvRegion(1).subscribe((res)=>{
        this.regionList = res.response;
        
      })
    }
  
    getKvSchoolByStationId(val){
      
      var data = {
        "businessUnitTypeId":'4',
        "businessUnitTypeCode":val
      }
  
      this.outSideService.fetchDashboardData(data).subscribe((res)=>{
        this.dashboardData = res.response;
  
        this.totalTeachingStaff = this.dashboardData.teachingRegular * 1 + this.dashboardData.teachingContractual * 1
          this.nontotalTeachingStaff = this.dashboardData.nonteachingContractual * 1 + this.dashboardData.nonteachingRegular * 1
  
          this.teachingNotVerified = this.dashboardData.teachingTi * 1 +
            this.dashboardData.teachingTa * 1 +
            this.dashboardData.teachingSi * 1 +
            this.dashboardData.teachingNi * 1
  
          this.nonteachingNotVerified = this.dashboardData.nonteachingNi * 1 +
            this.dashboardData.nonteachingSi * 1 +
            this.dashboardData.nonteachingTa * 1 +
            this.dashboardData.nonteachingTi * 1          
      })
  
      this.outSideService.fetchKvSchoolByStationCode(val).subscribe((res)=>{
        this.kvSchoolList = res.response;
        this.stationCode1 = res.response[0].stationCode;
        this.regionCode = res.response[0].regionCode;        
      })
    }
  
    onSchoolSelect(val){
  
      var data = {
        "businessUnitTypeId":'5',
        "businessUnitTypeCode":val
      }
  
      this.outSideService.fetchDashboardData(data).subscribe((res)=>{
        
        this.dashboardData = res.response;
  
        this.totalTeachingStaff = this.dashboardData.teachingRegular * 1 + this.dashboardData.teachingContractual * 1
          this.nontotalTeachingStaff = this.dashboardData.nonteachingContractual * 1 + this.dashboardData.nonteachingRegular * 1
  
          this.teachingNotVerified = this.dashboardData.teachingTi * 1 +
            this.dashboardData.teachingTa * 1 +
            this.dashboardData.teachingSi * 1 +
            this.dashboardData.teachingNi * 1
  
          this.nonteachingNotVerified = this.dashboardData.nonteachingNi * 1 +
            this.dashboardData.nonteachingSi * 1 +
            this.dashboardData.nonteachingTa * 1 +
            this.dashboardData.nonteachingTi * 1          
      })
  
      
      var str = val;
      var splitted = str.split("-", 2);
      this.kvCode = splitted[1];
      sessionStorage.setItem('kvCode',this.kvCode)
    }


    getTotalRegionEmployee() {
      this.allResultDaata=[]; 
      this.rowData = [];
      var data = {
        reportId: '1004',
        region: '99',
        station: 'All',
        school: '',
      };
      this.outSideService.getReportByID(data).subscribe((res) => {
        this.allResData = res;
        this.rows = res.rowValue;
        this.allResultDaata = res.rowValue;
        if (this.allResultDaata.length > 0) {
          this.regionWiseEmplCount = 0;
          this.rowData = [];
            var groupByEnrolementDate = function (xs: any, key: any) {
              return xs.reduce(function (rv: any, x: any) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
              }, {});
            };
            var groubedByEnrolmentDateResult = groupByEnrolementDate(
              this.allResultDaata,
              'region_name'
            );
            this.regionWiseArray = Object.entries(groubedByEnrolmentDateResult);
            console.log(this.regionWiseArray);
            for (let i = 0; i < this.regionWiseArray.length; i++) {
              this.newRegionArray = this.regionWiseArray[i];
              this.regionNameinArray = this.regionWiseArray[i][0];
              this.regionWiseEmplCount = 0;
      
              for (let j = 0; j < this.newRegionArray[1].length; j++) {
                  this.regionWiseEmplCount = this.regionWiseEmplCount + this.newRegionArray[1][j]['count'];
                  var data ={
                    value: this.regionWiseEmplCount,
                    name: this.regionNameinArray,
                 }
                }
                this.rowData.push(data);
              } 
            }
            this.regionWiseEmployeeDetailinPieChart();
      });
     
    }

  regionWiseEmployeeDetailinPieChart(){
      console.log("drop box type---------")
        console.log( this.rowData)
        this.regionWiseEmployeeDetail = {
          title: {
            text: 'Total Number of Employees (Region Wise)',
            // subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //   orient: 'vertical',
          // //  left: 'left'
          // },
          
          series: [
            {
              name: 'Total Employee',
              type: 'pie',
              radius: '70%',
              data:this.rowData,
              selectedMode: 'single',
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          label: {
            show: true,
            formatter: '{b} ({d}%)'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        };
      
      }
      onChartEvent(event: any, type: string) {
        console.log('chart event:', type, event);
       this.regionName=event.name
        for (let i = 0; i < this.regionList.rowValue.length; i++) {
          if( this.regionList.rowValue[i]['regionName']==event.name){
            var data = {
              reportId: '1004',
              region: this.regionList.rowValue[i]['regionCode'],
              station: 'All',
              school: '',
            };
          }
        }   
        this.getTotalRegionEmployeeByGender(data)
    }
      getTotalRegionEmployeeByGender(data){
        this.allRegioWiseData=[]; 
        this.teachingMaleCountArray=[];
        this.nonTeachingMaleCountArray=[];
 
        this.outSideService.getReportByID(data).subscribe((res) => {
          this.allRegioWiseData = res.rowValue;
          if (this.allRegioWiseData.length > 0) {
            this.teachingMaleCount = 0;
            this.teachingFeMaleCount = 0;
            this.nonTeachingMaleCount = 0;
            this.nonTeachingFeMaleCount = 0;
            this.teachingUnspecifiedCount = 0;
            this.nonTeachingUnspecifiedCount = 0;
            for (let i = 0; i < this.allRegioWiseData.length; i++) {
              if (
                this.allRegioWiseData[i]['teaching_nonteaching'] == 1 &&
                this.allRegioWiseData[i]['teacher_gender'] == 1
              ) {
                var data ={
                  value: this.allRegioWiseData[i]['count'],
               }
               this.teachingMaleCountArray.push(data)
              }
              if (
                this.allRegioWiseData[i]['teaching_nonteaching'] == 1 &&
                this.allRegioWiseData[i]['teacher_gender'] == 2
              ) {
              
                  var data ={
                    value: this.allRegioWiseData[i]['count'],
                 }
                 this.teachingMaleCountArray.push(data)
              }
              if (
                this.allRegioWiseData[i]['teaching_nonteaching'] == 1 &&
                this.allRegioWiseData[i]['teacher_gender'] == null
              ) {

                  var data ={
                    value: this.allRegioWiseData[i]['count'],
                 }
                 this.teachingUnspecifiedCountArray.push(data)
              }
  
              if (
                this.allRegioWiseData[i]['teaching_nonteaching'] == 2 &&
                this.allRegioWiseData[i]['teacher_gender'] == 1
              ) {
       
                  var data ={
                    value: this.allRegioWiseData[i]['count'],
                 }
                 this.nonTeachingMaleCountArray.push(data)
              }
              if (
                this.allRegioWiseData[i]['teaching_nonteaching'] == 2 &&
                this.allRegioWiseData[i]['teacher_gender'] == 2
              ) {
           

                  var data ={
                    value: this.allRegioWiseData[i]['count'],
                 }
                 this.nonTeachingMaleCountArray.push(data)
                // this.nonTeachingFemaleCountArray.push(data)
              }
              if (
                this.allRegioWiseData[i]['teaching_nonteaching'] == 2 &&
                this.allRegioWiseData[i]['teacher_gender'] == null
              ) {
                var data ={
                  value: this.allRegioWiseData[i]['count'],
               }
               this.nonTeachingUnspecifiedCountArray.push(data)
              }
            }   
          } 
          this.regionWiseEmployeeDetailinBarChart()
        });
      }
    
      regionWiseEmployeeDetailinBarChart(){
          this.regionWiseEmployeeDetailGenderData =  {
            title: {
              text: 'Region Wise Employees (Staff Type)',
               subtext: "Region ( "+this.regionName+' )',
               subtextStyle: {
                color: '#CC5500',
                fontWeight: "bold",
                },
              left: 'center'
            },
          
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
                label: {
                  show: true,
                  overflow: "break"
                }
              }
            },
            legend: {
             
              type: 'scroll',
              orient: 'horizontal',
              right: 280,
              top: 370,
              bottom: 20,
              data: ['Male', 'Female', ]
              // ...
            },
              xAxis: [
                {
                  type: 'category',
                  axisTick: { show: false },
                  axisPointer: {
                    type: 'shadow'
                  },
                  
                  data: ['Teaching','Non-Teaching']
                }
              ],
              yAxis: [
                {
                  interval: 50,
                  type: 'value'
                }
              ],
              label: {
                show: true,
                position: 'top',
                color: "black",
                fontSize:12,
            },
              series: [
                {
                  name: 'Male',
                  type: 'bar',
                  barGap: 0,
                  data: this.teachingMaleCountArray
                },
               
                {
                  name: 'Female',
                  type: 'bar',
                  data:  this.nonTeachingMaleCountArray
                },
              
              ],
              graph: {
                color: ['green','red']
            }
            };
        
        }
        getTotalRegionSchoolDetail(){
          let request={};
          this.totalSchoolsInRegion=[];
         this.outSideService.getStationSchoolCountByRegion(request,this.loginUserNameForChild).subscribe((res)=>{

         this.regionWiseSchoolDetails=res.rowValue
          for (let i = 0; i < this.regionWiseSchoolDetails.length; i++) {
            var data ={
            value: this.regionWiseSchoolDetails[i]['school_count'],
            name: this.regionWiseSchoolDetails[i]['region_name'],
            }
           this.totalSchoolsInRegion.push(data);
      }
   
  })
  this.regionWiseSchoolDetailInPieChart()
}
regionWiseSchoolDetailInPieChart()
{
  this.regionWiseSchoolDetail={
    title: {
      text: 'Region wise schools',
      // subtext: 'Fake Data',
      left: 'center'
    },
    label: {
      show: true,
      formatter: '{b} ({d}%)'
    },
    // legend: {
    //   orient: 'vertical',
    // //  left: 'left'
    // },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },

    series: [
      {
        
        name: 'Total School',
        type: 'pie',
        radius: '70%',
       
        data:this.totalSchoolsInRegion,
        selectedMode: 'single',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  };
}
onChartEventRegionWiseSchool(event:any){
console.log(event)
this.regionStationName=event
let request={};
this. stationWiseSchoolArray=[];
this.totalStationInRegion=[];
this.totalStationInRegionCount=[];
    this.outSideService.getStationWiseSchoolCount(request,this.loginUserNameForChild).subscribe((res)=>{
      console.log("--------region wise station detadfddggf---------")
   
     var groupByEnrolementDate = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var groubedByEnrolmentDateResult=groupByEnrolementDate(res.rowValue, 'region_name')
    this. stationWiseSchoolArray = Object.entries(groubedByEnrolmentDateResult)
    console.log(this.stationWiseSchoolArray)

    for (let i = 0; i < this.stationWiseSchoolArray.length; i++) {
      if(this.stationWiseSchoolArray[i][0]==this.regionStationName){
        // this.stationWiseSchoolArray[i][1];
        for (let j = 0; j < this.stationWiseSchoolArray[i][1].length; j++) {
          this.totalStationInRegion.push(this.stationWiseSchoolArray[i][1][j]['station_name']);
          this.totalStationInRegionCount.push(this.stationWiseSchoolArray[i][1][j]['count']);
        }
      }
      this.showStationWiseSchoolInBarChart();
}
      },
      error => {
        console.log(error);
      })
     
}
showStationWiseSchoolInBarChart(){
  console.log("===========station school=================")
  console.log( this.totalStationInRegion)
  console.log( this.totalStationInRegionCount)

  this.stationWiseSchoolInBarChart = {
    title: {
      text: 'Station Wise School',
      subtext: "Region ( "+this.regionStationName+' )',
      subtextStyle: {
        color: '#CC5500',
        fontWeight: "bold",
        },
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data:this.totalStationInRegion,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          show: true,
          interval: 0,
          rotate: 80,
        },
        // axisTick: {
        //   show: true,
        //   interval: 0
        // }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    label: {
      show: true,
      position: 'top',
      color: "black",
      fontSize:12,
  },
    series: [
      {
        name: 'Total',
        type: 'bar',
        barWidth: '60%',
        data:this.totalStationInRegionCount
      }
    ]
  };
}

getStationCategory(){
 this.stationWiseCatArray=[];      
 this.stationWiseCatArray.push(this.dashboardDetails['totalNormalStation']);
 this.stationWiseCatArray.push(this.dashboardDetails['totalPriorityStation']);
 this.stationWiseCatArray.push( this.dashboardDetails['totalHardStation']);
 this.stationWiseCatArray.push(this.dashboardDetails['totalVeryHardStation']);
 this.stationWiseCatArray.push(this.dashboardDetails['totalNerStation']);
console.log(this.stationWiseCatArray)
this.stationWiseCategoryBarChart();
}

stationWiseCategoryBarChart(){

  this.stationWiseCategory = {
    title: {
      text: 'Category wise station',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Normal', 'Priority', 'Hard', 'Very Hard', 'NER'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    label: {
      show: true,
      position: 'top',
      color: "black",
      fontSize:12,
  },
    series: [
      {
        name: 'Total',
        type: 'bar',
        barWidth: '60%',
        data:this.stationWiseCatArray
      }
    ]
  };
}



getAllAgeWiseData(){

//   this.outSideService.getNoOfEmployeeGenderAgeWise().subscribe((res)=>{
//     console.log("--------Age wise employeeeeeeeeeeee---------")
// console.log(res);
//   });


//   this.outSideService.getNoOfEmployeeRegionGenderAgeWise().subscribe((res)=>{
//     console.log("--------Age wise employeeeeeeeeeeee---------")
// console.log(res);
//   });

  this.outSideService.getNoOfEmployeeAgeWise().subscribe((res)=>{
    console.log("--------Age wise employeeeeeeeeeeee---------")
console.log(res);
var data ={ value: res.rowValue[0]['employeesof18_30years'], name: 'Between(18-30)' }
var data1 ={ value: res.rowValue[0]['employeesof31_40years'], name: 'Between(31-40)' }
var data2 ={ value: res.rowValue[0]['employeesof41_50years'], name: 'Between(41-50)' }
var data3 ={ value: res.rowValue[0]['employeesof51_60years'], name: 'Between(51-60)' }
  this.ageYearsArray.push(data);
  this.ageYearsArray.push(data1);
  this.ageYearsArray.push(data2);
  this.ageYearsArray.push(data3);

    this.getRegionWiseEmployeeAgeData();
    },
    error => {
      console.log(error);
    })
}


getRegionWiseEmployeeAgeData(){
  this.getRegionWiseEmployeeAge = {
    title: {
      text: 'Employee Detail Age Wise',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '8%',
      left: 'center'
    },
    series: [
      {
        name: 'Employee Count',
        type: 'pie',
        radius: '50%',
        data: this.ageYearsArray,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  this.getEmployeeAgeRegionWise();
}

onChartEventEmployeeAgeRegionWise(event: any) {
  console.log('chart event:', event);
 this.empoyeeUnderAge=event;  
 this.regionWiseMale=[];
 this.regionWiseFeMale=[];
 this.regionAgeWiseName=[];
 this.getTotalEmployeeGenderAgeWiseArray=[];

    this.outSideService.getNoOfEmployeeGenderAgeWise().subscribe((res)=>{
  console.log("--------Age wise employeeeeeeeeeeee---------")
  if(this.empoyeeUnderAge=='Between(18-30)')
   {
    var data ={ value: res.rowValue[0]['maleemployeesof18_30years'], name: 'Male' }
    var data1 ={ value: res.rowValue[0]['femaleemployeesof18_30years'], name: 'Female' }
      this.getTotalEmployeeGenderAgeWiseArray.push(data);
      this.getTotalEmployeeGenderAgeWiseArray.push(data1);
   }
      if(this.empoyeeUnderAge=='Between(51-60)')
     {

      var data ={ value: res.rowValue[0]['maleemployeesof51_60years'], name: 'Male' }
      var data1 ={ value: res.rowValue[0]['femaleemployeesof51_60years'], name: 'Female' }
        this.getTotalEmployeeGenderAgeWiseArray.push(data);
        this.getTotalEmployeeGenderAgeWiseArray.push(data1);


      // this.regionWiseMale.push(res.rowValue[0]['maleemployeesof51_60years']);
      // this.regionWiseFeMale.push(res.rowValue[0]['femaleemployeesof51_60years']);
      // this.regionAgeWiseName.push('Total');
     }
    if(this.empoyeeUnderAge=='Between(41-50)')
     {

      var data ={ value: res.rowValue[0]['maleemployeesof41_50years'], name: 'Male' }
      var data1 ={ value: res.rowValue[0]['femaleemployeesof41_50years'], name: 'Female' }
        this.getTotalEmployeeGenderAgeWiseArray.push(data);
        this.getTotalEmployeeGenderAgeWiseArray.push(data1);

      // this.regionWiseMale.push(res.rowValue[0]['maleemployeesof41_50years']);
      //  this.regionWiseFeMale.push(res.rowValue[0]['femaleemployeesof41_50years']);
      //  this.regionAgeWiseName.push('Total');
     }
     if(this.empoyeeUnderAge=='Between(31-40)')
     {

      var data ={ value: res.rowValue[0]['maleemployeesof31_40years'], name: 'Male' }
      var data1 ={ value: res.rowValue[0]['femaleemployeesof31_40years'], name: 'Female' }
        this.getTotalEmployeeGenderAgeWiseArray.push(data);
        this.getTotalEmployeeGenderAgeWiseArray.push(data1);

      // this.regionWiseMale.push(res.rowValue[0]['maleemployeesof31_40years']);
      // this.regionWiseFeMale.push(res.rowValue[0]['femaleemployeesof31_40years']);
      // this.regionAgeWiseName.push('Total');
     }
      this.getTotalEmployeeGenderAgeWise()
    });





  this.outSideService.getNoOfEmployeeRegionGenderAgeWise().subscribe((res)=>{
    console.log("--------Age wise employeeeeeeeeeeee---------")
if(this.empoyeeUnderAge=='Between(18-30)')
{
  for (let i = 0; i < res.rowValue.length; i++) {
  
   this.regionWiseMale.push(res.rowValue[i]['maleemployeesof18_30years']);
   this.regionWiseFeMale.push(res.rowValue[i]['femaleemployeesof18_30years']);
   this.regionAgeWiseName.push(res.rowValue[i]['region_name']);
    }
  }
  else if (this.empoyeeUnderAge=='Between(51-60)'){
    for (let i = 0; i < res.rowValue.length; i++) {
     this.regionWiseMale.push(res.rowValue[i]['maleemployeesof51_60years']);
     this.regionWiseFeMale.push(res.rowValue[i]['femaleemployeesof51_60years']);
     this.regionAgeWiseName.push(res.rowValue[i]['region_name']);
      }
    }
    else if (this.empoyeeUnderAge=='Between(41-50)'){
      for (let i = 0; i < res.rowValue.length; i++) {
       this.regionWiseMale.push(res.rowValue[i]['maleemployeesof41_50years']);
       this.regionWiseFeMale.push(res.rowValue[i]['femaleemployeesof41_50years']);
       this.regionAgeWiseName.push(res.rowValue[i]['region_name']);
        }
      }
      else if (this.empoyeeUnderAge=='Between(31-40)'){
        for (let i = 0; i < res.rowValue.length; i++) {
         this.regionWiseMale.push(res.rowValue[i]['maleemployeesof31_40years']);
         this.regionWiseFeMale.push(res.rowValue[i]['femaleemployeesof31_40years']);
         this.regionAgeWiseName.push(res.rowValue[i]['region_name']);
          }
        }
    this.getEmployeeAgeRegionWise()
  });
}
getTotalEmployeeGenderAgeWise(){
  this.totalEmployeeGenderWise = {
    title: {
      text: 'Age Wise Total Employee',
       subtext: this.empoyeeUnderAge,
       subtextStyle: {
        color: '#CC5500',
        fontWeight: "bold",
        },
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '20%',
      left: 'center'
    },
    series: [
      {
        name: 'Total Employee',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        startAngle: 180,
        endAngle: 360,
        data: this.getTotalEmployeeGenderAgeWiseArray
      }
    ]
  };
}
getEmployeeAgeRegionWise() {
this.regionWiseEmployeeAge = {
  title: {
    text: 'Employee Detail Age Wise (In Regions)',
     subtext: this.empoyeeUnderAge,
     subtextStyle: {
      color: '#CC5500',
      fontWeight: "bold",
      },
    left: 'center'
  },
   tooltip: {
      trigger: 'item'
    },
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      right: 20,
   
      bottom: 370,
      data: ['Male', 'Female', ]
  },
  xAxis: {
    data: this.regionAgeWiseName,
    axisLabel: {
      show: true,
      interval: 0,
      rotate: 45,
    },
    axisTick: {
      show: true,
      interval: 0
    }
  },
  yAxis: {
  
   // interval: 3000
    
  },
  series: [
    {
      name: 'Male',
      data:this.regionWiseMale,
      type: 'bar',
      stack: 'x'
    },
    {
      name: 'Female',
      data:  this.regionWiseFeMale,
      type: 'bar',
      stack: 'x'
    }
  ]
};
}


getRetirementWiseEmployeeData(){
  this.getRetirementWiseEmployee = {
    title: {
      text: 'Employee Detail Retirement Wise', 
      
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Employee Count',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Under 30' },
          { value: 735, name: 'Under 40' },
          { value: 580, name: 'Under 50' },
          { value: 484, name: 'Under 60' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  this.getEmployeeRetirementRegionWise();
}
onChartEventEmployeeRetirementRegionWise(event: any, type: string) {
  console.log('chart event:', type, event);
 this.empoyeeUnderRetirement=event.name  
  this.getEmployeeRetirementRegionWise();
}
getEmployeeRetirementRegionWise(){
  this.regionWiseEmployeeRetirment = {
    title: {
      text: 'Employee Detail Retirement Wise (In Regions)',
       subtext: this.empoyeeUnderRetirement,
       subtextStyle: {
        color: '#CC5500',
        fontWeight: "bold",
        },
      left: 'center'
    },
     tooltip: {
        trigger: 'item'
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        right: 12,
     
        bottom: 372,
        data: ['Male', 'Female', ]
    },
    xAxis: {
      data: ['DELHI', 'ARGA'],
      axisLabel: {
        show: true,
        interval: 0,
        rotate: 45,
      },
      axisTick: {
        show: true,
        interval: 0
      }
    },
    yAxis: {},
    series: [
      {
        name: 'Male',
        data: [10, 22],
        type: 'bar',
        stack: 'x'
      },
      {
        name: 'Female',
        data: [5, 4],
        type: 'bar',
        stack: 'x'
      }
    ]
  };
}

}


