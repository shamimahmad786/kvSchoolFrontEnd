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
import { Router } from '@angular/router';
@Component({
  selector: 'app-transfer-report',
  templateUrl: './transfer-report.component.html',
  styleUrls: ['./transfer-report.component.css']
})
export class TransferReportComponent implements OnInit {
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
  displayedColumns = ['sno','reportId','reportName','reportType','Action'];
  testData = {sno: '', reportId: '', reportName: '',reportType:'',id:'', teacher_id:'', emp_code:'', empName:''};


  @ViewChild('paginator') paginator: MatPaginator;

  @ViewChild('MatSort') sort: MatSort;
 
  @ViewChild('AdminCancelBox', { static: true }) AdminCancelBox: TemplateRef<any>;
 
  constructor(private outSideService: OutsideServicesService,private dialog: MatDialog,private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getReportList()
  }
  ngAfterViewInit(): void {
  }
  getReportList(){
    let request={};
    this.outSideService.fetchReportList(request).subscribe((res)=>{
      if(res.length>0){
        for (let i = 0; i < res.length; i++) {
          this.testData.sno = '' + (i + 1) + '';
          //alert( this.testData.sno)
          //this.testData.sno = res[i].sno;
          this.testData.reportId = res[i].reportId;
          this.testData.reportName = res[i].reportName;
          this.testData.reportType = res[i].reportType;
          this.testData.id = res[i].id;
          this.reportList.push(this.testData);
          this.testData = {sno: '', reportId: '', reportName: '',reportType:'',id:'',teacher_id:'', emp_code:'', empName:''};
        }
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(this.reportList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100)
      }

    })
  }
  subRepot(reportId:any){
    
      this.router.navigate(['/teacher/sub-transfer-report'], { queryParams: {reportId :reportId } });  
 
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


