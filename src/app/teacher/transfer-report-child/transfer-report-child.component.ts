import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { json } from '@rxweb/reactive-form-validators';
import { Workbook } from 'exceljs';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-transfer-report-child',
  templateUrl: './transfer-report-child.component.html',
  styleUrls: ['./transfer-report-child.component.css']
})
export class TransferReportChildComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  loginUserNameForService: any;
  reportList: any=[];
  transferReportListById: any = []
  id:any;
  reportId: any;
  reportName:any;
  reportType:any;
  teacher_id:any;
  emp_code:any;
  empName:any;
  gender:any;
  dob:any;
  postCode:any;
  subjectId:any;
  regionCode:any;
  stationSchoolCountByRegion: any=[];
  resdata: any=[];
  reportResponse:any;
  reportIdAction:any;
  userMappingRegionCode:any;
  displayedColumns = ['sno','empname','presentKvCode','presentRegionName','presentStationNameCode','allotedKvNameCode','regionNameCode','transferType','postName','transferred_under_cat_id'];
  testData ={ "sno": "","empname": "","presentKvCode":"","presentRegionName":"","presentStationNameCode":"","allotedKvNameCode":"","regionNameCode":"","transferType":"","postName":"","transferred_under_cat_id":"" };
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('MatSort') sort: MatSort;
  @ViewChild('AdminCancelBox', { static: true }) AdminCancelBox: TemplateRef<any>;
 
  constructor(private outSideService: OutsideServicesService,private route: ActivatedRoute,private dialog: MatDialog, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.reportIdAction=params['reportId'];
    });
    this.openReportModel();
  }
  ngAfterViewInit(): void {
  }

  openReportModel() {
      var data ={
        reportId:this.reportIdAction
      }
      this.resdata=[];
      this.outSideService.getReportByID(data).subscribe((res) => {
        this.resdata=res.rowValue;
        console.log(this.resdata)
          if(this.resdata.length>0){
              for (let i = 0; i < this.resdata.length; i++) {
                this.testData.sno = '' + (i + 1) + '';
                this.testData.empname = this.resdata[i].emp_name+" ("+this.resdata[i].emp_code+")";
                this.testData.presentKvCode = this.resdata[i].kv_name_present+" ("+this.resdata[i].present_kv_code+")";
                this.testData.presentRegionName = this.resdata[i].region_name_present;
                this.testData.presentStationNameCode = this.resdata[i].station_name_present+" ("+this.resdata[i].present_station_code+")";
                this.testData.allotedKvNameCode = this.resdata[i].kv_name_alloted+" ("+this.resdata[i].allot_kv_code+")";
                this.testData.regionNameCode = this.resdata[i].region_name_alloted+" ("+this.resdata[i].region_code_alloted+")";
                
                this.testData.transferType = this.resdata[i].transfer_type;
                this.testData.postName = this.resdata[i].post_name;
                this.testData.transferred_under_cat_id = this.resdata[i].transferred_under_cat_id;
                this.stationSchoolCountByRegion.push(this.testData);
                this.testData = { "sno": "","empname": "","presentKvCode":"","presentRegionName":"","presentStationNameCode":"","allotedKvNameCode":"","regionNameCode":"","transferType":"","postName":"","transferred_under_cat_id":"" };
              }
            console.log(this.stationSchoolCountByRegion)
          }
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.stationSchoolCountByRegion);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
           
          }, 100)
       })
   
    }
    applyFilterHBSource(filterValue: string) {
      filterValue = filterValue.trim(); 
      filterValue = filterValue.toLowerCase(); 
      this.dataSource.filter = filterValue;
    }
  generatePDF() {
    alert('Pdf generation in progress...')
  }
  
  exportexcel(){
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('TransferReport');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'TRANSFER REPORT', '']);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 15;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 40;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 15;
    const dobCol3 = workSheet.getColumn(3);
    dobCol3.width = 15;
    workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 13, bold: true };
    for (let i = 1; i < 5; i++) {
      const col = ws1.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb:  '9c9b98' },   
      };
    }
   const ws = workSheet.addRow(['S.NO', 'Report Name', 'Report Id', 'Report Type']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 5; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.reportList.forEach((item) => {
      const row = workSheet.addRow([item.id, item.reportName,item.reportId, item.reportType]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'TransferReport.xlsx');
    });
 
  } 
  cancelModal() {
    this.modalService.dismissAll();
  }
}


