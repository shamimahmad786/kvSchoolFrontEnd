import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
declare const srvTime: any;
@Component({
  selector: 'app-region-wise-school',
  templateUrl: './region-wise-school.component.html',
  styleUrls: ['./region-wise-school.component.css']
})
export class RegionWiseSchoolComponent implements OnInit {
  regionSchoolMF: FormGroup;
  isSubmitted: boolean = false;
  mdoDateResultArray: any = new Array()
  dataSource:any;
  // displayedColumns:any = ['sno','regionname','stationname','fromdate','todate','status'];
  displayedColumns:any = ['sno','regionname','stationname','schoolname','schooladdress'];

  testData = { "sno": "", "regionname": "", "stationname": "", "schoolname": "","schooladdress":""}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listRegionSchool: any=[];
  regionList: any=[];
  businessUnitId:any;
  businessTypeCode:any;
  freezeStatus:false;

  filteredOptions: Observable<string[]>;

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  returnTypeSrvTime: any;
  loginUserNameForService: any;
  constructor(private pdfService: MasterReportPdfService,private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router,private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.getFreezeStatus();
    this.buildRegionMappingForm();
    this.getRegionList();
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForService=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
    }
    this.businessUnitId=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_id;
    this.businessTypeCode=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_code;
    this.search();

  }

  buildRegionMappingForm(){
    this.regionSchoolMF = this.fb.group({
      regionCode: ['', [Validators.required]],
    });
  }
  getFreezeStatus()
  {
    this.outSideService.fetchFreezeStatus(8).subscribe((res)=>{  
    this.freezeStatus=res['status'];
    })
  }
  getRegionList(){
    this.outSideService.fetchRegionList().subscribe((res)=>{
      if(res){
        this.regionList.push({ regionCode: 'All', regionName: ''})
        res.forEach(element => {
         
          if(element.isActive){
          
            this.regionList.push({ regionCode: element.regionCode, regionName: element.regionName})
          }
        });
        this.filteredOptions = this.regionSchoolMF['controls'].regionCode.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
       
      }
    })
  }
  private _filter(value: string): string[] {
    debugger
    const filterValue = value.toLowerCase();
    return this.regionList.filter(option => option.regionName.toLowerCase().includes(filterValue));
  }
  submit(){
    debugger
    if (this.regionSchoolMF.invalid) {
      this.isSubmitted = true;
     this.regionSchoolMF.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.regionSchoolMF.getRawValue();
      // alert(payload.regionCode);
      var regionStationValue = payload.regionCode.split("(")
      var regionCodeValue = regionStationValue[1].split(")")
      if(regionCodeValue[0]=='All')
      {
        this.search();
      }
      else{
        let request={
          "regionCode": regionCodeValue[0],
          "reportType":"R"
         }
         this.outSideService.getSchoolListByRegion(request,this.loginUserNameForService).subscribe((res)=>{
             this.getRegionStationList(res.rowValue)
        },
        error => {
          console.log(error);
        })
      }
    }
  }
  search(){
    let request={};
    if(this.businessUnitId=="2"){
      request={
        "reportType":"N"
    };
    }
    this.outSideService.getSchoolListByRegion(request,this.loginUserNameForService).subscribe((res)=>{
      this.getRegionStationList(res.rowValue)
      },
      error => {
        console.log(error);
      })
  }

  clear(){
    this.formDirective.resetForm();
    this.isSubmitted=false;
    this.regionSchoolMF.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.regionSchoolMF.controls[controlName].hasError(errorName);
  }
  getRegionStationList(res:any){
    this.listRegionSchool=[];
      if(res.length>0){
          for (let i = 0; i < res.length; i++) {
            this.testData.sno = '' + (i + 1) + '';
            this.testData.regionname = res[i].region_name+" ("+res[i].region_code+")";
            this.testData.stationname = res[i].station_name+"("+ res[i].station_code+")";
            this.testData.schoolname = res[i].school_name+" ("+ res[i].kv_code+")";;
            this.testData.schooladdress = res[i].schooladdress;
            this.listRegionSchool.push(this.testData);
            this.testData = { "sno": "", "regionname": "", "stationname": "", "schoolname": "","schooladdress":"" };
   
          }
        console.log(this.listRegionSchool)
      }
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.listRegionSchool);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100)
      // this.regionStationMF.get('regionCode').setValue('');
      // this.formDirective.resetForm();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  regionStationMappingpdf()
  {
    this.returnTypeSrvTime = srvTime();
    var groupByEnrolementDate = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var groubedByEnrolmentDateResult=groupByEnrolementDate(this.listRegionSchool, 'regionname')
    this. mdoDateResultArray = Object.entries(groubedByEnrolmentDateResult)
  // console.log(groubedByEnrolmentDateResult)
    console.log(this.mdoDateResultArray)
    this.pdfService.regionSchoolMappingList(this.mdoDateResultArray,this.returnTypeSrvTime);
    // setTimeout(() => {
    //   this.pdfService.regionStationMappingList(this.listRegionStation);
    // }, 1000);
  }
  exportexcel(){
    console.log(this.listRegionSchool)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('Region Wise School');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'REGION WISE SCHOOL', '']);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 15;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 35;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 50;
    const dobCol3 = workSheet.getColumn(4);
    dobCol3.width = 30;
    workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 13, bold: true };
    for (let i = 1; i < 6; i++) {
      const col = ws1.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb:  '9c9b98' },   
      };
    }
  //  const ws = workSheet.addRow(['Region Name', 'Station Name','From Date','todate','Status']);
   const ws = workSheet.addRow(['Region Name', 'Station Name','School Name','Address']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 6; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.listRegionSchool.forEach((item) => {
      const row = workSheet.addRow([item.regionname, item.stationname,item.schoolname,item.schooladdress]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'RegionWiseSchool.xlsx');
    });
 
  }
}
