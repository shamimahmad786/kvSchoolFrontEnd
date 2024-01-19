import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { json } from '@rxweb/reactive-form-validators';
import { OutsideServicesService } from 'src/app/service/outside-services.service';

@Component({
  selector: 'app-transfer-report',
  templateUrl: './transfer-report.component.html',
  styleUrls: ['./transfer-report.component.css']
})
export class TransferReportComponent implements OnInit {

  dataSource:any;
  loginUserNameForService: any;
  reportList: any=[];
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['sno','reportId','reportName','reportType','Action'];
  testData = {sno: '', reportId: '', reportName: '',reportType:'',id:''};

  constructor(private outSideService: OutsideServicesService,) { }

  ngOnInit(): void {
    this.getReportList()
  }



  getReportList(){
    debugger
    let request={};
    this.outSideService.fetchReportList(request).subscribe((res)=>{
      if(res.length>0){
        for (let i = 0; i < res.length; i++) {
       
          this.testData.sno = '' + (i + 1) + '';
          this.testData.sno = res[i].sno;
          this.testData.reportId = res[i].reportId;
          this.testData.reportName = res[i].reportName;
          this.testData.reportType = res[i].reportType;
          this.testData.id = res[i].id;

          this.reportList.push(this.testData);
          this.testData = {sno: '', reportId: '', reportName: '',reportType:'',id:''};
  
        }
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(this.reportList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100)
      }

    })
  }

  generatePDF() {
    alert('Pdf generation in progress...')
  }
  
  exportexcel() {
    alert('Excel generation in progress...')
  }

  openReportModel(reportId: any) {
   this.outSideService.getReportByID(reportId).subscribe((res) => {
    alert(JSON.stringify(res))
   })
  }
}
