import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-school-station',
  templateUrl: './add-school-station.component.html',
  styleUrls: ['./add-school-station.component.css']
})
export class AddSchoolStationComponent implements OnInit {
  displayedColumns = ['Sno', 'Station Name', 'School Name', 'From date','To Date'];
  userMappingSource : MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('hBSort') hBSort: MatSort;
  @ViewChild('JoiningBox', { static: true }) JoiningBox: TemplateRef<any>;   
  childUserData = { "sno": "","station_name": "","school_name": "","from_date": "","to_date": ""}
  schoolStationMForm: FormGroup;
  isSubmitted: boolean = false;
  showTodate: boolean = true;
  stationList: any=[];
  dropdownStationList = [];
  selectedStationItems = [];
  dropdownStationSettings = {};
  getSchoolMappingListData:any=[];
  schoolList: any=[];
  dropdownSchoolList:any=[];
  duplicateSchoolCheck:any=[];
  historyControlingOfficedata:any=[];
  historyControllerOfficeDataArray:any=[];
  selectedSchoolItems = [];
  dropdownSchoolSettings = {};
  schoolStaionMapped:boolean=false;
  loginUserNameForService:any;
  userMappingAction:any;
  userMappingRegionCode:any;
  schoolKvcode:any;
  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}]

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService,private route: ActivatedRoute, private router: Router,private dateAdapter: DateAdapter<Date>,private datePipe:DatePipe) { 
    this.dateAdapter.setLocale('en-GB');
    this.settingSchoolDropDown();
    this.settingStationlDropDown();
  }
  @ViewChild('multiStation') multiStation;
  ngOnInit(): void {

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForService=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
    }
    this.route.queryParams.subscribe(params => {
      this.userMappingAction=params['action'];   
      this.userMappingRegionCode=params['regionId']; 
      this.schoolKvcode=params['kvcode'];
    });

   if(this.userMappingAction=='Add'){
    this.showTodate=false
   }
    this.buildRegionMappingForm();
    this.getSchoolList();
    this.getStationList();
    this.stationSchoolMappingListByStationCode();
  }
  settingStationlDropDown(){
    this.dropdownStationSettings = {
      singleSelection: true,
      idField: 'stationCode',
      textField: 'stationName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }
  settingSchoolDropDown(){
    this.dropdownSchoolSettings = {
      singleSelection: false,
      idField: 'schoolCode',
      textField: 'schoolName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }
  applyFilterHBSource(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.userMappingSource.filter = filterValue;
  }
  buildRegionMappingForm(){
    this.schoolStationMForm = this.fb.group({
      schoolCode: ['', [Validators.required]],
      stationCode: ['',[Validators.required]],
      fromDate:[new Date(),[Validators.required]],
      toDate:[''],
      status:['',[Validators.required]],
    });
  }
  getSchoolList(){
    let req={};
    
    this.outSideService.fetchSchoolUnmappedList(req,this.loginUserNameForService).subscribe((res)=>{
      debugger
      if(res.rowValue.length>0){
        res.rowValue.forEach(element => { 
         this.schoolList.push({ schoolCode: element.kv_code, schoolName: element.school_name})
        });
         this.dropdownSchoolList=this.schoolList;
      }else{
        this.schoolStaionMapped=true;
      }
    })
  }
  getStationList(){
    let request={};
    this.getSchoolMappingListData=[];
    this.outSideService.fetchStationList(request,this.loginUserNameForService).subscribe((res)=>{
      debugger
      this.getSchoolMappingListData=res.rowValue
      if(res.rowValue.length>0){
        res.rowValue.forEach(element => { 
       this.stationList.push({ stationCode: element.station_code, stationName: element.station_name})
        });
        this.dropdownStationList=this.stationList;
      }
      if(this.userMappingAction=='update'){
        this.updateSchoolMapping();
      }
      if(this.userMappingAction=='Add'){
        this.addSchoolMapping();
      }
    })
  }

  addSchoolMapping(){
    this.duplicateSchoolCheck=[];
    for (let i = 0; i <  this.getSchoolMappingListData.length; i++) {
      if(this.getSchoolMappingListData[i].kv_code==this.schoolKvcode)
      {
        this.duplicateSchoolCheck.push(this.getSchoolMappingListData[i]); 
      }
    }
    
    this.selectedStationItems = [
      { stationCode: Number(this.userMappingRegionCode), stationName: this.duplicateSchoolCheck[0]['station_name']  }
    ];
    this.selectedSchoolItems = [
      { schoolCode: Number(this.schoolKvcode), schoolName: this.duplicateSchoolCheck[0]['school_name']  }
    ];  
  }
  updateSchoolMapping(){    
    this.duplicateSchoolCheck=[];
    for (let i = 0; i <  this.getSchoolMappingListData.length; i++) {
      if(this.getSchoolMappingListData[i].kv_code==this.schoolKvcode)
      {
        this.duplicateSchoolCheck.push(this.getSchoolMappingListData[i]); 
      }
    }
    this.selectedStationItems = [
      { stationCode: Number(this.userMappingRegionCode), stationName: this.duplicateSchoolCheck[0]['station_name']  }
    ];      
 

    this.selectedSchoolItems = [
      { schoolCode: Number(this.schoolKvcode), schoolName: this.duplicateSchoolCheck[0]['school_name']  }
    ];  
  }

  stationSchoolMappingListByStationCode(){
    this.historyControlingOfficedata=[];
    var data={
        "kvCode": this.schoolKvcode
    }
    
    this.outSideService.getSchoolStationHistory(data,this.loginUserNameForService).subscribe(res => {
      this.historyControlingOfficedata=res.rowValue;
      debugger
      console.log(this.historyControlingOfficedata)
      this.historyControllerOfficeDataArray = [];
      for (let i = 0; i < this.historyControlingOfficedata.length; i++) {
        this.childUserData.sno = '' + (i + 1) + '';
        this.childUserData.station_name =this.historyControlingOfficedata[i].station_name;
        this.childUserData.school_name =this.historyControlingOfficedata[i].school_name;
        this.childUserData.from_date = this.historyControlingOfficedata[i].from_date;
        this.childUserData.to_date = this.historyControlingOfficedata[i].to_date;
        this.historyControllerOfficeDataArray.push(this.childUserData);
        this.childUserData = { "sno": "","station_name": "","school_name": "","from_date": "","to_date": ""}
      }
      setTimeout(() => {
        this.userMappingSource  = new MatTableDataSource(this.historyControllerOfficeDataArray);
        this.userMappingSource .paginator = this.paginator;
        this.userMappingSource .sort = this.hBSort;  
      }, 100)
    },
    error => { 
      Swal.fire({
        'icon':'error',
        'text':'You are not Authorized.'
      })
    });
  }




  submit(){
    if (this.schoolStationMForm.invalid) {
      this.isSubmitted = true;
     this.schoolStationMForm.markAllAsTouched();
    }else{
      if(this.userMappingAction=='update'){
      this.isSubmitted = false;
      let payload=this.schoolStationMForm.getRawValue();
      let filterStationName=payload.stationCode[0].stationName.split("(",1);
      let filterSchoolName=payload.schoolCode[0].schoolName.split("(",1);
      let filterSchool=[];
         filterSchool.push({'schoolCode':this.duplicateSchoolCheck[0]['kv_code'],'schoolName':this.duplicateSchoolCheck[0]['school_name']})
         debugger
      let request={
        // schoolName: payload.schoolCode[0].schoolName,
        // schoolId: payload.schoolCode[0].schoolCode,
        id: this.duplicateSchoolCheck[0]['mid'],
        schoolMasterReqVoList:filterSchool,
        stationCode: payload.stationCode[0].stationCode,
        stationName:filterStationName[0],
        fromDate:this.datePipe.transform(payload.fromDate ,'yyyy-MM-dd'),
        toDate:this.datePipe.transform(payload.toDate ,'yyyy-MM-dd'),
        status:payload.status,
      }

      console.log(request)
      this.outSideService.addSchoolStationMapping(request).subscribe((res)=>{
        if(res=="SUCCESS"){
          Swal.fire(
            'New School Station Mapped Successfully!',
            '',
            'success'
          )
          this.router.navigate(['/teacher/schoolStationMapping']);
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          'icon':'error',
           'text':error.error
        }
        )
      })
    }
    if(this.userMappingAction=='Add'){
      this.isSubmitted = false;
      let payload=this.schoolStationMForm.getRawValue();
      let filterStationName=payload.stationCode[0].stationName.split("(",1);
      let filterSchoolName=payload.schoolCode[0].schoolName.split("(",1);
      let filterSchool=[];
         filterSchool.push({'schoolCode':payload.schoolCode[0].schoolCode,'schoolName':filterSchoolName[0]})
      let request={
        // schoolName: payload.schoolCode[0].schoolName,
        // schoolId: payload.schoolCode[0].schoolCode,
        schoolMasterReqVoList:filterSchool,
        stationCode: payload.stationCode[0].stationCode,
        stationName:filterStationName[0],
        fromDate:this.datePipe.transform(payload.fromDate ,'yyyy-MM-dd'),
        toDate:this.datePipe.transform(payload.toDate ,'yyyy-MM-dd'),
        status:payload.status,
      }
      console.log(request)
      this.outSideService.addSchoolStationMapping(request).subscribe((res)=>{
        if(res=="SUCCESS"){
          Swal.fire(
            'New School Station Mapped Successfully!',
            '',
            'success'
          )
          this.router.navigate(['/teacher/schoolStationMapping']);
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          'icon':'error',
           'text':error.error
        }
        )
      })

    }


    }

    
  }
  redirectToList(){
    this.router.navigate(['/teacher/schoolStationMapping']);
  }
  clear(){
    this.formDirective.resetForm();
    this.schoolStationMForm.get('stationCode').setValue('');
    this.schoolStationMForm.get('schoolCode').setValue('');
    this.isSubmitted=false;
    this.schoolStationMForm.reset();
    this.schoolStationMForm.get('fromDate').setValue(new Date());
    this.schoolStationMForm.get('toDate').setValue('');
    this.schoolStationMForm.get('status').setValue('');
  }
  errorHandling(controlName: string, errorName: string) {
    return this.schoolStationMForm.controls[controlName].hasError(errorName);
  }
  currentDate():Date{
    return new Date();
  }

}
