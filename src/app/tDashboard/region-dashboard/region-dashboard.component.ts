import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-region-dashboard',
  templateUrl: './region-dashboard.component.html',
  styleUrls: ['./region-dashboard.component.css']
})
export class RegionDashboardComponent implements OnInit {
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
  dashboardDetails:any;
  stationTotal:any;
  teachingMaleFemaleTotal: any;
  nonTeachingMaleFemaleTotal: any;
  constructor(public outSideService: OutsideServicesService,private router: Router) { }
  ngOnInit(): void {
    debugger
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

    // if (this.kvicons?.includes(this.applicationId)) {
    //   this.kvIfConditions = true;
    // }else{
    //   this.kvIfConditions = false;
    // }

    if (this.businessUnitTypeId == '2') {



      // var data = {
      //   "businessUnitTypeId": this.businessUnitTypeId,
      //   "businessUnitTypeCode": this.businessUnitTypeCode
      // }
      
      // this.outSideService.fetchDashboardData(data).subscribe((res) => {
        
      //   this.dashboardData = res.response;

      //   this.totalTeachingStaff = this.dashboardData.teachingRegular * 1 + this.dashboardData.teachingContractual * 1
      //   this.nontotalTeachingStaff = this.dashboardData.nonteachingContractual * 1 + this.dashboardData.nonteachingRegular * 1

      //   this.teachingNotVerified = this.dashboardData.teachingTi * 1 +
      //     this.dashboardData.teachingTa * 1 +
      //     this.dashboardData.teachingSi * 1 +
      //     this.dashboardData.teachingNi * 1

      //   this.nonteachingNotVerified = this.dashboardData.nonteachingNi * 1 +
      //     this.dashboardData.nonteachingSi * 1 +
      //     this.dashboardData.nonteachingTa * 1 +
      //     this.dashboardData.nonteachingTi * 1




      // })
      // this.showNational = true;
    } else if (this.businessUnitTypeId == '3') {

      var dashBoardData={
        "regionCode":this.businessUnitTypeCode,
        "dashboardType":"R"
      }
      this.outSideService.getRoDashboard(dashBoardData,this.loginUserNameForChild).subscribe(res => {
        debugger
        this.dashboardDetails=res;
        console.log(res)
        this.stationTotal= res['totalNormalStation']+res['totalPriorityStation']+res['totalHardStation']+res['totalVeryHardStation']+res['totalNerStation'];
        this.teachingMaleFemaleTotal= res['teachingMale']+res['teachingFemale'];
        this.nonTeachingMaleFemaleTotal= res['nonTeachingMale']+res['nonTeachingFeMale'];
   
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

  }

  getMaster(data, business_unit_type_id) {
    debugger
      this.outSideService.getMasterData(data).subscribe((res) => {
        
        var data1 = { 'business_unit_type_id': business_unit_type_id, "mappingData": JSON.parse(JSON.stringify(res.response)).rowValue }
        sessionStorage.setItem("mappingData", JSON.stringify(data1));
        
        this.kvSchoolDetails = JSON.parse(JSON.stringify(res.response)).rowValue[0];
        // this.getKvTeacherByUdiseCode();
        
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
        // this.getStationByRegionId(res.response[0].regionCode);
        
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
      
      // this.udiseSchoolCode = splitted[0];
      // this.businessUnitTypeCode = splitted[1];
      this.kvCode = splitted[1];
      sessionStorage.setItem('kvCode',this.kvCode)
      // this.nationalLogin = true;
      // this.getSchoolDetailsByKvCode();
      // this.getKvTeacherByUdiseCode();
    }

  }


