import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-transfer-related-doc',
  templateUrl: './transfer-related-doc.component.html',
  styleUrls: ['./transfer-related-doc.component.css']
})
export class TransferRelatedDocComponent implements OnInit {
  transferRelatedDocForm: FormGroup;
  loginUserNameForChild: any;
  kvicons: string;
  teacherName: string;
  kvCode: any;
  tempTeacherId: string;
  documentUploadArray: any[] = [];
  fileUpload: boolean = true;
  fileName: string;
  fileNameWithoutExt: any;
  enableUploadButton4: boolean = false;
  randonNumber: any;
  image2: any[] = [];
  deleteDocUpdate4: boolean = true;
  imageName: any=[];
  isVisible: boolean = false;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService,private modalService: NgbModal) { }
  dataSource:any;
  // displayedColumns:any = ['sno','regionname','stationname','fromdate','todate','status'];
  displayedColumns:any = ['sno','ticketId','subject','InitiateDate','InitiateTo','Status','resolvedBy','Action'];

  testData ={ "sno": "", "ticketId": "","ticketSubject":"", "ticketdateTime": "", "ticketToId": "","ticketStatus":"","ticketResolvedBy":"" };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;      

  ngOnInit(): void {
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.teacherName=JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].firstname+' '+JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].lastname;
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    this.transferRelatedDocForm = this.fb.group({
      'transferType':new FormControl('', Validators.required),
      'transferYear': new FormControl('', Validators.required),
      'transferOrderNumber': new FormControl('', Validators.required),
      'transferOrderDate': new FormControl(''),
      'fileUpload': new FormControl(''),
    });
 
    this.getInitiatedTicket();
  }
  getInitiatedTicket(){
    // var data={
    //  "teacherEmployeeCode":this.loginUserNameForChild
    //  }
    //  this.outSideService.getInitiatedTicket(data).subscribe((res)=>{
    //    this.ticketList=[];
    //    if(res.length>0){
    //        for (let i = 0; i < res.length; i++) {
    //          this.testData.sno = '' + (i + 1) + '';
    //          this.testData.ticketId = res[i].ticketId;   
    //          this.testData.ticketSubject = res[i].ticketSubject;
    //          this.testData.ticketdateTime = res[i].ticketdateTime;
    //          this.testData.ticketToId = res[i].ticketToId;    
    //          if(res[i].ticketStatus==0 || res[i].ticketStatus=='0'){
    //            this.testData.ticketStatus='In Process';
    //          }else if(res[i].ticketStatus=='1' || res[i].ticketStatus==1){
    //            this.testData.ticketStatus='Resolved';
    //          }
    //          else if(res[i].ticketStatus=='2' || res[i].ticketStatus==2){
    //            this.testData.ticketStatus='Rejected';
    //          }
    //          this.testData.ticketResolvedBy = res[i].ticketResolvedBy;    
    //          this.ticketList.push(this.testData);
    //          this.testData = { "sno": "", "ticketId": "","ticketSubject":"", "ticketdateTime": "", "ticketToId": "","ticketStatus":"","ticketResolvedBy":"" };
    //        }
    //    }
    //    setTimeout(() => {
    //      this.dataSource = new MatTableDataSource(this.ticketList);
    //      this.dataSource.paginator = this.paginator;
    //      this.dataSource.sort = this.sort;
    //    }, 100)
      
    //  },
    //  error => {
    //    Swal.fire({
    //      'icon':'error',
    //      'text':error.error
    //    }
    //    )
    //  })
   }
   applyFilter(filterValue: string) {
     filterValue = filterValue.trim();
     filterValue = filterValue.toLowerCase(); 
     this.dataSource.filter = filterValue;
   }
  fileToUpload: File | null = null;
  handleFileInput(files: FileList, index) {
    this.documentUploadArray[index] = { "Action":'' };
    console.log( this.documentUploadArray)
    this.fileUpload = true;
    this.fileName = files.item(0).name;
    var splitted = this.fileName.split('.', 2)
    this.fileNameWithoutExt=splitted[0];
    if (splitted[1].toUpperCase() == 'JPG' || splitted[1].toUpperCase() == 'JPEG' ) {
      if (files.item(0).size <= 512000) {
        this.fileToUpload = files.item(0);
         if (index == '4') {
          this.enableUploadButton4 = true;
        }
      } else {
        this.fileToUpload = null;
        Swal.fire(
          'File size allowed upto 5MB only !',
          '',
          'error'
        )
        if (index == '4') {
          this.enableUploadButton4 = true;
        }
      }

    } else {
      this.fileToUpload = null;
      Swal.fire(
        'Only JPG file can be uploaded',
        '',
        'error'
      )
      if (index == '4') {
        this.enableUploadButton4 = true;
      }
    }
  }
  documentUpload(index) {
    debugger
    if( this.image2.length>4){
      Swal.fire(
        'You  can upload Only 5 Images !',
        '',
        'error'
      )
      return false;
    }
    this.fileUpload = true;
    if(this.fileNameWithoutExt==''){
      Swal.fire(
        'Select JPG to be uploaded !',
        '',
        'error'
      )
      return false;
    }
    const formData = new FormData();
    if (this.fileToUpload != null) {
      formData.append('teacherId', this.tempTeacherId);
      formData.append('file', this.fileToUpload);
      if(this.randonNumber=='' || this.randonNumber==null || this.randonNumber=='undefined' || this.randonNumber==undefined)  {
        this.randonNumber= Math.floor(100000 + Math.random() * 900000)
      } 
      formData.append('folderId', this.randonNumber); 
      formData.append('filename', this.fileNameWithoutExt);
      console.log(formData)
      this.outSideService.uploadTicketDocument(formData).subscribe((res) => {
        this.fileUpload = false;
        
        Swal.fire(
          'Document Upload Sucessfully',
          '',
          'success'
        )
        this.documentUploadArray[index] = { "Action":'upload' };

       if (index == 4) {
          this.deleteDocUpdate4 = false
        }
      this.getDocumentByFolderId()
      })
    } else {
      Swal.fire(
        'Select JPG to be uploaded !',
        '',
        'error'
      )
    }
  }
  getDocumentByFolderId(){
    var data={"folderId": this.randonNumber}
    this.image2=[];
    this.imageName=[];
    this.outSideService.getDocumentByFolderId(data).subscribe((res) => {
     this.image2=res;
     if(res.length>0){
      this.fileUpload = false;
      this.isVisible = true;
     }
    })
  }
  submit(){

  }

 
}
