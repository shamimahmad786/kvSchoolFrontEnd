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
  selector: 'app-region-wise-station-detail',
  templateUrl: './region-wise-station-detail.component.html',
  styleUrls: ['./region-wise-station-detail.component.css']
})
export class RegionWiseStationDetailComponent implements OnInit {
  mdoDateResultArray: any = new Array()
  dataSource:any;
  // displayedColumns:any = ['sno','regionname','stationname','fromdate','todate','status'];
  displayedColumns:any = ['sno','regionname','regionaddress','stationcount','schoolcount','controllername'];

  testData = { "sno": "", "regionname": "", "regionaddress":"" ,"stationcount": "", "schoolcount": "","controllername":"","controllermobile":"","controlleremail":""}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  stationSchoolCountByRegion: any=[];
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
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForService=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
    }
    this.businessUnitId=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_id;
    this.businessTypeCode=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_code;
    this.search();

  }

  getFreezeStatus()
  {
    this.outSideService.fetchFreezeStatus(8).subscribe((res)=>{  
    this.freezeStatus=res['status'];
    })
  }
 
  search(){
    let request={};
    this.outSideService.getStationSchoolCountByRegion(request,this.loginUserNameForService).subscribe((res)=>{
      this.getRegionStationList(res.rowValue)
      },
      error => {
        console.log(error);
      })
  }

  getRegionStationList(res:any){
    debugger
    this.stationSchoolCountByRegion=[];
      if(res.length>0){
          for (let i = 0; i < res.length; i++) {
            this.testData.sno = '' + (i + 1) + '';
            this.testData.regionname = res[i].region_name+" ("+res[i].region_code+")";
            this.testData.regionaddress = res[i].region_address;
            this.testData.stationcount = res[i].station_count;
            this.testData.schoolcount = res[i].school_count;
            this.testData.controllername = res[i].controller_name;
            this.testData.controllermobile = res[i].controller_mobile;
            this.testData.controlleremail = res[i].controller_email;
            this.stationSchoolCountByRegion.push(this.testData);
            this.testData = { "sno": "", "regionname": "", "regionaddress":"" ,"stationcount": "", "schoolcount": "","controllername":"","controllermobile":"","controlleremail":""};
          }
        console.log(this.stationSchoolCountByRegion)
      }
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.stationSchoolCountByRegion);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100)
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
    var groubedByEnrolmentDateResult=groupByEnrolementDate(this.stationSchoolCountByRegion, 'regionname')
    this. mdoDateResultArray = Object.entries(groubedByEnrolmentDateResult)
  // console.log(groubedByEnrolmentDateResult)
    console.log(this.mdoDateResultArray)
    this.pdfService.regionSchoolMappingList(this.mdoDateResultArray,this.returnTypeSrvTime);
    // setTimeout(() => {
    //   this.pdfService.regionStationMappingList(this.listRegionStation);
    // }, 1000);
  }
  exportexcel(){
    console.log(this.stationSchoolCountByRegion)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('RegionStationMapping');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'REGION STATION MAPPING', '']);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 15;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 35;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 70;
    const dobCol3 = workSheet.getColumn(4);
    dobCol3.width = 25;
    const dobCol4 = workSheet.getColumn(5);
    dobCol4.width = 25;
    
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
   const ws = workSheet.addRow(['S.NO.','Region Name', 'Region Address', 'No. Of Station','No. Of School']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 6; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.stationSchoolCountByRegion.forEach((item) => {
      const row = workSheet.addRow([item.sno, item.regionname,item.regionaddress,item.stationcount, item.schoolcount]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'RegionStationMapping.xlsx');
    });
 
  }
}
