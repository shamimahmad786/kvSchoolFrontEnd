import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as echarts from 'echarts';
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
  allResData: any;
  rows: any;
  reportIdAction: any;

  regionWiseArray: any = new Array();
  newRegionArray: any;

  regionNameinArray: any;
  regionNameGenderinArray: any;
  rowanyData: any = new Array();
  teachingMaleCountArray: any = new Array();
  teachingFemaleCountArray: any = new Array();
  teachingUnspecifiedCountArray: any = new Array();
  nonTeachingMaleCountArray: any = new Array();
  nonTeachingFemaleCountArray: any = new Array();
  nonTeachingUnspecifiedCountArray: any = new Array();
  regionName: any;
  constructor(public outSideService: OutsideServicesService,private router: Router) {    }
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

    // if (this.kvicons?.includes(this.applicationId)) {
    //   this.kvIfConditions = true;
    // }else{
    //   this.kvIfConditions = false;
    // }
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
        this.teachingMaleFemaleTotal= res['teachingMale']+res['teachingFemale'];
        this.nonTeachingMaleFemaleTotal= res['nonTeachingMale']+res['nonTeachingFeMale'];
        this.inPositionTotal=this.teachingMaleFemaleTotal+this.nonTeachingMaleFemaleTotal
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
//this.regionWiseEmployeeDetailinBarChart()
var data1 = {
  reportId: '1004',
  region: '1',
  station: 'All',
  school: '',
};
this.regionName='AHMEDABAD';
this.getTotalRegionEmployeeByGender(data1)

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
      text: 'Total number of employees available in dropbox',
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
        name: 'Type',
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


  getMaster(data, business_unit_type_id) {
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
            text: 'Total number of employees region Wise',
            // subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
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
        console.log('chart event:', type, event.name);
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
           
            console.log("all  data")
         console.log(this.allRegioWiseData)
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
               //  this.teachingFemaleCountArray.push(data)

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
        console.log("drop box type---------")


        console.log(this.teachingMaleCountArray)
        console.log(this.teachingFemaleCountArray)
     
          this.regionWiseEmployeeDetailGenderData =  {
            title: {
              text: 'Region wise employees (Staff Type)',
               subtext: this.regionName,
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
             
              // toolbox: {
              //   show: true,
              //   orient: 'vertical',
              //   left: 'right',
              //   top: 'center',
              // },
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
  }


