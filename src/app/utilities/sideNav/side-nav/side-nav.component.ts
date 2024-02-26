import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  logoutLink = environment.LOGOUT_URL
  applicationId: any;
  kvicons: any;
  kvIfConditions: boolean = false;
  businessUnitTypeId:any;
  businessUnitTypeCode: any;
  loginUserNameForChild:any;
  inProgressTicketCount: any;
  ticketCount: number = 0;
  inProgressTicketCountForSchool: any;
  dashboardDetails: any;
  timeLeft: number = 15;
  interval;
  showNational:boolean = false;
  showRegion:boolean = false;
  showStation:boolean = false;
  showSchool:boolean = false;
  kvCodeForTicket: any;
  constructor(private router: Router,private outSideService: OutsideServicesService,) {
  }

  ngOnInit(): void {
    this.kvCodeForTicket=localStorage.getItem('businessUnitTypeCodeForTicket');
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_id;
      this.businessUnitTypeCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
    }
    if (this.kvicons?.includes(this.applicationId)) {
      this.kvIfConditions = true;
    }else{
      this.kvIfConditions = false;
    }
    if(this.businessUnitTypeId == '2'){
      this.showNational = true;
    }else if(this.businessUnitTypeId == '3'){
      this.showRegion = true;
    }else if(this.businessUnitTypeId == '4'){
      this.showStation = true
    }else if(this.businessUnitTypeId == '5'){
      this.showSchool = true;
    }
    this.getInProcessTicketCount();
    this.getdashboarData();
//this.timeWatch();
  }

  getInProcessTicketCount() {
   if(this.businessUnitTypeId == '2') {
    var dashBoardDataNationtion={
      "regionCode":'',
      "dashboardType":"N"
    }
    this.outSideService.getRoDashboard(dashBoardDataNationtion,this.loginUserNameForChild).subscribe(res => {
      debugger
      this.dashboardDetails=res;
      this.inProgressTicketCount = this.dashboardDetails?.inprogresTicket;
  })
   }
   
}



getdashboarData(){
if(this.businessUnitTypeId === 5) {
  var dashBoardDataNationtion={
    "kvCode": this.businessUnitTypeCode,
    "dashboardType":"S"
  }
  this.outSideService.getRoDashboard(dashBoardDataNationtion,this.loginUserNameForChild).subscribe(res => {
    debugger
    this.dashboardDetails=res;
    this.inProgressTicketCountForSchool = this.dashboardDetails?.inprogresTicket;
    
  
})
}
  
}

  
timeWatch()
{
if((sessionStorage.getItem("authTeacherDetails")!= null) && (JSON.parse(sessionStorage.getItem("authTeacherDetails")).status != 0)){
   this.timeLeft = 15;
   
   this.interval = setInterval(() => {
     if(this.timeLeft > 0) {
       this.timeLeft--;
     }else if(this.timeLeft==0 && sessionStorage.getItem("authTeacherDetails")!= null) {
      this.timeLeft=30;
      // this.outSideService.refreshtoken().subscribe(res => {
      //   console.log(res)
      //   this.childUserList = res;
      //   this.setToJoingMatTable(this.childUserList);
      //  })
    //  alert("time going---------------"+sessionStorage.getItem("authTeacherDetails"))
     }
   },1000)
  } 
}
}
