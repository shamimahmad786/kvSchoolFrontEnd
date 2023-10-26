import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-station-category',
  templateUrl: './add-station-category.component.html',
  styleUrls: ['./add-station-category.component.css']
})
export class AddStationCategoryComponent implements OnInit {
  displayedColumns = ['Sno', 'Station Name', 'Category name', 'From date','To Date'];
  userMappingSource : MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('hBSort') hBSort: MatSort;
  @ViewChild('JoiningBox', { static: true }) JoiningBox: TemplateRef<any>;   
  childUserData = { "sno": "","station_name": "","category_name": "","from_date": "","to_date": ""}
  stationCategoryMForm: FormGroup;
  isSubmitted: boolean = false;
  showTodate: boolean = true;
  stationList: any=[];
  dropdownStationList = [];
  selectedStationItems = [];
  dropdownStationSettings = {};
  historyControlingOfficedata: any=[];
  categoryList: any=[];
  dropdownCategoryList:any=[];
  selectedCategoryItems = [];
  dropdownCategorySettings = {};
  userMappingAction:any;
  userMappingRegionCode:any;
  loginUserNameForService:any;
  userMappingRegionName:any;
  historyControllerOfficeDataArray: any = [];
  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}]

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService,private route: ActivatedRoute, private router: Router,private dateAdapter: DateAdapter<Date>,private datePipe:DatePipe) { 
    this.dateAdapter.setLocale('en-GB');
    this.settingCategoryDropDown();
    this.settingStationDropDown();
  }
  @ViewChild('multiStation') multiStation;
  ngOnInit(): void {
 
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
 
   
      this.loginUserNameForService=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
    }
    this.route.queryParams.subscribe(params => {
      this.userMappingAction=params['action'];   
      this.userMappingRegionCode=params['regionId'];
      this.userMappingRegionName=params['regionName'];
    });

   if(this.userMappingAction=='Add'){
    this.showTodate=false
   }
    this.buildRegionMappingForm();
    this.getCategoryList();
    this.getStationList();
    this.stationCategoryMappingListByStationCode();
  }

stationCategoryMappingListByStationCode(){
 var data={
    "stationCode": this.userMappingRegionCode
}
  
  this.outSideService.stationCategoryMappingListByStationCode(data,this.loginUserNameForService).subscribe(res => {
    console.log(res)
    this.historyControlingOfficedata=res.rowValue;
    this.historyControllerOfficeDataArray = [];
    for (let i = 0; i < this.historyControlingOfficedata.length; i++) {
      this.childUserData.sno = '' + (i + 1) + '';
      this.childUserData.station_name =this.historyControlingOfficedata[i].station_name;
      this.childUserData.category_name =this.historyControlingOfficedata[i].category_name;
      this.childUserData.from_date = this.historyControlingOfficedata[i].from_date;
      this.childUserData.to_date = this.historyControlingOfficedata[i].to_date;
      this.historyControllerOfficeDataArray.push(this.childUserData);
      this.childUserData = { "sno": "","station_name": "","category_name": "","from_date": "","to_date": ""}
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

applyFilterHBSource(filterValue: string) {
  filterValue = filterValue.trim(); 
  filterValue = filterValue.toLowerCase(); 
  this.userMappingSource.filter = filterValue;
}

  settingStationDropDown(){
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

  settingCategoryDropDown(){
    this.dropdownCategorySettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'category',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      maxHeight:200
    };
  }

  buildRegionMappingForm(){
    this.stationCategoryMForm = this.fb.group({
      category: ['', [Validators.required]],
      stationCode: ['',[Validators.required]],
      fromDate:[new Date(),[Validators.required]],
      toDate:[''],
      status:['',[Validators.required]]
    });
  }
  getCategoryList(){
    let req={};
    this.outSideService.fetchStationCategoryList(req).subscribe((res)=>{
      if(res){
        res.forEach(element => {
          if(element.isActive){
            this.categoryList.push({id:element.id,category:element.category})
          }
        });
         this.dropdownCategoryList=this.categoryList;
        
      }
    })
  }
  getStationList(){
    let request={};
    this.outSideService.searchStationCategoryMList(request,this.loginUserNameForService).subscribe((res)=>{
      debugger
      if(res.rowValue.length>0){
        res.rowValue.forEach(element => {
          if(element.is_active){
            this.stationList.push({ stationCode: element.station_code, stationName: element.station_name })
          }
        });
        this.dropdownStationList=this.stationList;
        console.log(this.dropdownStationList)
        alert(this.userMappingRegionCode)
        this.selectedStationItems = [
          { stationCode: Number(this.userMappingRegionCode), stationName: this.userMappingRegionName  }
        ];
      }
    })
  }


  submit(){
    if (this.stationCategoryMForm.invalid) {
      this.isSubmitted = true;
     this.stationCategoryMForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.stationCategoryMForm.getRawValue();
      let request={
        // id: payload.category[0].id,
        categoryName: payload.category[0].category,
        categoryId: payload.category[0].id,
        stationCode: payload.stationCode[0].stationCode,
        // stationName: payload.stationCode[0].stationName,
        fromDate:this.datePipe.transform(payload.fromDate ,'yyyy-MM-dd'),
        toDate:this.datePipe.transform(payload.toDate ,'yyyy-MM-dd'),
        status:payload.status,
      }

      this.outSideService.addStationCategoryMapping(request).subscribe((res)=>{
        if(res=="SUCCESS"){
          Swal.fire(
            'New Station-Category Mapped Successfully!',
            '',
            'success'
          )
          this.router.navigate(['/teacher/stationCategoryMapping']);
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
  redirectToList(){
    this.router.navigate(['/teacher/stationCategoryMapping']);
  }
  clear(){
    this.formDirective.resetForm();
    this.stationCategoryMForm.get('stationCode').setValue('');
    this.stationCategoryMForm.get('category').setValue('');
    this.isSubmitted=false;
    this.stationCategoryMForm.reset();
    this.stationCategoryMForm.get('fromDate').setValue(new Date());
    this.stationCategoryMForm.get('toDate').setValue('');
    this.stationCategoryMForm.get('status').setValue('');
  }
  errorHandling(controlName: string, errorName: string) {
    return this.stationCategoryMForm.controls[controlName].hasError(errorName);
  }
  currentDate():Date{
    return new Date();
  }

}
