import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-transfer-report',
  templateUrl: './transfer-report.component.html',
  styleUrls: ['./transfer-report.component.css']
})
export class TransferReportComponent implements OnInit {

  dataSource:any;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('userMappingSort') userMappingSort: MatSort; 
  constructor() { }

  ngOnInit(): void {
  }


  displayedColumns = ['Sno','reportId','reportName','Action'];
  

}
