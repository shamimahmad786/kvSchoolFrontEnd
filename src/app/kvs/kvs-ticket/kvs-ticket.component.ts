import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-kvs-ticket',
  templateUrl: './kvs-ticket.component.html',
  styleUrls: ['./kvs-ticket.component.css']
})
export class KvsTicketComponent implements OnInit {
  kvsTicketForm: FormGroup;
  assignToForm: FormGroup;
  resolveForm: FormGroup;
  fileUpload: boolean = true;
  enableUploadButton4: boolean = false;
  loginUserNameForChild: any;
  kvicons: any;
  kvCode: any;
  tempTeacherId: any;
  documentUploadArray: any[] = [];
  deleteDocUpdate4: boolean = true;
  randonNumber: any;
  fileName: string;
  ticketList: any=[];
  imageName: any=[];
  isVisible: boolean = false;
  fileNameWithoutExt: any;
  imageName1: any;
  image2: any;
  selectTransferType:any
  docList: any;
  ticketDetails: any;
  ticketId: any;
  ticketStatusForPreview: any;
  ticketStatusForAssignTo: any;
  ticketStatusForResolve: any;
  resolveTicket:any;
  selectYear:any;
  ticketType: any;
  businessTypeId: any;
  businessTypeCode: any;
  initiateddatTicket: any;
  assignTo:any;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService,private modalService: NgbModal) { }
  dataSource:any;
  // displayedColumns:any = ['sno','regionname','stationname','fromdate','todate','status'];
  displayedColumns:any = ['sno','ticketId','subject','InitiateDate','InitiateFrom','Status','resolvedBy','Action'];

  testData ={ "sno": "", "ticketId": "","ticketSubject":"", "ticketdateTime": "","ticketFrom":"","ticketFromId":"", "ticketToId": "","instituteCode":"","ticketStatus":"","ticketResolvedBy":"" };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;      
  @ViewChild('PreviewBox', { static: true }) PreviewBox: TemplateRef<any>;
  @ViewChild('AssignToBox', { static: true }) AssignToBox: TemplateRef<any>;
  @ViewChild('ResolveBox', { static: true }) ResolveBox: TemplateRef<any>;
  ngOnInit(): void {
    debugger
    this.selectTransferType='0';
    this.ticketType='0';

    this.businessTypeId=JSON.parse(sessionStorage.getItem('authTeacherDetails')).applicationDetails[0].business_unit_type_id;

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    this.kvsTicketForm = this.fb.group({
      'ticketInitiateTo':new FormControl('', Validators.required),
      'subject': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
    });
    this.assignToForm = new FormGroup({
      assignTo: new FormControl('', Validators.required),
      assignToRemarks: new FormControl('', Validators.required),
   })  
   this.resolveForm = new FormGroup({
    ticketType: new FormControl('', Validators.required),
    resolveRemarks: new FormControl('', Validators.required),
 }) 
    this.getInitiatedTicket();

  }

  getInitiatedTicket(){
    debugger
    if( this.businessTypeId==2 ||  this.businessTypeId=='2'){
      this.initiateddatTicket = {
        "instituteCode":'1',
        "dataType":this.ticketType
        }
    }else{
      this.initiateddatTicket = {
        "instituteCode":this.kvCode,
        "dataType":this.ticketType
        }
    }
  
    this.outSideService.getTicketByInstitute(this.initiateddatTicket).subscribe((res)=>{
      console.log(res)
      this.ticketList=[];
      if(res.length>0){
          for (let i = 0; i < res.length; i++) {
            this.testData.sno = '' + (i + 1) + '';
            this.testData.ticketId = res[i].ticketId;   
            this.testData.ticketSubject = res[i].ticketSubject;
            this.testData.ticketdateTime = res[i].ticketdateTime;
            this.testData.ticketToId = res[i].ticketToId;  
            this.testData.ticketFrom = res[i].ticketFrom; 
            this.testData.ticketFromId = res[i].ticketFromId;   
            this.testData.instituteCode = res[i].instituteCode;

            if(res[i].ticketStatus==0 || res[i].ticketStatus=='0'){
              this.testData.ticketStatus='In Process';
            }else if(res[i].ticketStatus=='1' || res[i].ticketStatus==1){
              this.testData.ticketStatus='Resolved';
            }
            else if(res[i].ticketStatus=='2' || res[i].ticketStatus==2){
              this.testData.ticketStatus='Rejected';
            }
            this.testData.ticketResolvedBy = res[i].ticketResolvedBy;    
            this.ticketList.push(this.testData);
            this.testData = { "sno": "", "ticketId": "","ticketSubject":"", "ticketdateTime": "","ticketFrom":"","ticketFromId":"", "ticketToId": "","instituteCode":"","ticketStatus":"","ticketResolvedBy":"" };
          }
        console.log(this.ticketList)
      }
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.ticketList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100)
     
    },
    error => {
      Swal.fire({
        'icon':'error',
        'text':error.error
      }
      )
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  fileToUpload: File | null = null;
  handleFileInput(files: FileList, index) {
    this.documentUploadArray[index] = { "Action":'' };
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
          'File size allowed upto 500KB only !',
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
        'Only PDF file can be uploaded',
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
    this.fileUpload = true;
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
        'Select PDF to be uploaded !',
        '',
        'error'
      )
    }
  }
  getDocumentByFolderId(){
    var data={"folderId": this.randonNumber}
    this.imageName=[];
    this.outSideService.getDocumentByFolderId(data).subscribe((res) => {
     this.image2=res;
     if(res.length>0){
      this.fileUpload = false;
      this.isVisible = true;
     }
    })
  }
  deleteFile(uploadFileName:any){
    debugger
    var data={"folderId": this.randonNumber,"fileName": uploadFileName}
    Swal.fire({
      'icon':'warning',
      'text': "Do you want to proceed ?",
      'allowEscapeKey': false,
      'allowOutsideClick': false,
      'showCancelButton': true,
      'confirmButtonColor': "#DD6B55",
      'confirmButtonText': "Yes",
      'cancelButtonText': "No",
      'showLoaderOnConfirm': true,
    }
    ).then((isConfirm) => {
    if (isConfirm.value === true) {
      debugger
        this.outSideService.deleteTicketDocument(data).subscribe((res)=>{
          if(res){
            Swal.fire(
              'File delete successfully!',
              '',
              'success'
            ) 
          }
          this.getDocumentByFolderId()
    },
    error => {
      Swal.fire({
        'icon':'error',
        'text':error.error
      }
      )
    })
  }
  return false;
  });
  }
  getAllModifyTransferAsTypeList(event:any){
    this.ticketType=event;
    this.getInitiatedTicket()
      }
  openPreviewmodal(ticketid:any) {
  
  
    var data = {
      "ticketId":ticketid
    }
    this.outSideService.getInitiatedTicketByTicketId(data).subscribe((res)=>{
      if(res){
        debugger
      console.log(res); 
      this.docList=res['docList'];
      this.ticketDetails=res['ticketDetails'];
      if(res['ticketDetails'].ticketStatus==0 || res['ticketDetails'].ticketStatus=='0'){
        this.ticketStatusForPreview='In Process';
      }else if(res['ticketDetails'].ticketStatus=='1' || res['ticketDetails'].ticketStatus==1){
        this.ticketStatusForPreview='Resolved';
      }
      else if(res['ticketDetails'].ticketStatus=='2' || res['ticketDetails'].ticketStatus==2){
        this.ticketStatusForPreview='Rejected';
      }
      }
   },
    error => {
      Swal.fire({
        'icon':'error',
        'text':error.error
      }
      )
    })
  this.modalService.open(this.PreviewBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
  }
  assignTomodal(ticketid:any) {
    this.ticketId=ticketid;
    var data = {
      "ticketId":ticketid
    }
    this.outSideService.getInitiatedTicketByTicketId(data).subscribe((res)=>{
      if(res){
        debugger
      console.log(res); 
      this.docList=res['docList'];
      this.ticketDetails=res['ticketDetails'];
      if(res['ticketDetails'].ticketStatus==0 || res['ticketDetails'].ticketStatus=='0'){
        this.ticketStatusForAssignTo='In Process';
      }else if(res['ticketDetails'].ticketStatus=='1' || res['ticketDetails'].ticketStatus==1){
        this.ticketStatusForAssignTo='Resolved';
      }
      else if(res['ticketDetails'].ticketStatus=='2' || res['ticketDetails'].ticketStatus==2){
        this.ticketStatusForAssignTo='Rejected';
      }
      }
   },
    error => {
      Swal.fire({
        'icon':'error',
        'text':error.error
      }
      )
    })
  this.modalService.open(this.AssignToBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
  }
  openResolvemodal(ticketid:any) {
    this.ticketId=ticketid
    var data = {
      "ticketId":ticketid
    }
    this.outSideService.getInitiatedTicketByTicketId(data).subscribe((res)=>{
      if(res){
      this.docList=res['docList'];
      this.ticketDetails=res['ticketDetails'];
      if(res['ticketDetails'].ticketStatus==0 || res['ticketDetails'].ticketStatus=='0'){
        this.ticketStatusForResolve='In Process';
      }else if(res['ticketDetails'].ticketStatus=='1' || res['ticketDetails'].ticketStatus==1){
        this.ticketStatusForResolve='Resolved';
      }
      else if(res['ticketDetails'].ticketStatus=='2' || res['ticketDetails'].ticketStatus==2){
        this.ticketStatusForResolve='Rejected';
      }
      }
   },
    error => {
      Swal.fire({
        'icon':'error',
        'text':error.error
      }
      )
    })
  this.modalService.open(this.ResolveBox, { size: 'xl', backdrop: 'static', keyboard: false ,centered: true});
  }
  assignToFormSubmit(){
    if( this.businessTypeId==2 ||  this.businessTypeId=='2'){
      this.assignTo = {
        "ticketId":this.ticketId,
        "assignFrom":"2",
        "ticketToId":this.assignToForm.value.assignTo,
        "remarks":this.assignToForm.value.assignToRemarks
        }
    }else{
      this.assignTo = {
        "ticketId":this.ticketId,
        "assignFrom":"1",
        "ticketToId":this.assignToForm.value.assignTo,
        "remarks":this.assignToForm.value.assignToRemarks
        }
    }
  Swal.fire({
    'icon':'warning',
    'text': "Do you want to proceed ?",
    'allowEscapeKey': false,
    'allowOutsideClick': false,
    'showCancelButton': true,
    'confirmButtonColor': "#DD6B55",
    'confirmButtonText': "Yes",
    'cancelButtonText': "No",
    'showLoaderOnConfirm': true,
  }
  ).then((isConfirm) => {
  if (isConfirm.value === true) {
      this.outSideService.assignTicketTo(this.assignTo).subscribe((res)=>{
        if(res){
          Swal.fire(
            'Remark saved successfully!',
            '',
            'success'
          ) 
        this.getInitiatedTicket();
        this.modalService.dismissAll() 
        }
  },
    error => {
      Swal.fire({
        'icon':'error',
        'text':error.error
      }
      )
    })
  }
  return false;
  });
  }
  resolveFormSubmit(){
    if( this.businessTypeId==2 ||  this.businessTypeId=='2'){
      this.resolveTicket = {
      "ticketId": this.ticketId,
      "resolveType":"2",
      "resolveBy":this.loginUserNameForChild,
      "ticketStatus":this.resolveForm.value.ticketType,
      "description":this.resolveForm.value.resolveRemarks
        }
    }else{
      this.resolveTicket = {
        "ticketId": this.ticketId,
        "resolveType":"1",
        "resolveBy":this.loginUserNameForChild,
        "ticketStatus":this.resolveForm.value.ticketType,
        "description":this.resolveForm.value.resolveRemarks
        }
    }
debugger
  Swal.fire({
    'icon':'warning',
    'text': "Do you want to proceed ?",
    'allowEscapeKey': false,
    'allowOutsideClick': false,
    'showCancelButton': true,
    'confirmButtonColor': "#DD6B55",
    'confirmButtonText': "Yes",
    'cancelButtonText': "No",
    'showLoaderOnConfirm': true,
  }
  ).then((isConfirm) => {
  if (isConfirm.value === true) {
      this.outSideService.resolveTicketByTicketId(this.resolveTicket).subscribe((res)=>{
        if(res){
          Swal.fire(
            'Remark saved successfully!',
            '',
            'success'
          ) 
        this.getInitiatedTicket();
        this.modalService.dismissAll() 
        }
  },
    error => {
      Swal.fire({
        'icon':'error',
        'text':error.error
      }
      )
    })
  }
  return false;
  });
  }

  downloadDocument(data:any,folderIds:any) {
    const folderId = folderIds;
    const fileName = data;
console.log(folderId)
console.log(fileName)
    this.outSideService.downloadDocument(folderId, fileName).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }




  submit(){
  var data={
      "teacherId": this.tempTeacherId,
      "teacherEmployeeCode":this.kvCode,
      "ticketId":"",
      "ticketTo":this.kvsTicketForm.value.ticketInitiateTo,
      "ticketToId":this.kvCode,
      "instituteCode":this.kvCode,
      "ticketFrom": this.loginUserNameForChild,
      "ticketFromId": this.tempTeacherId,
      "ticketSubject":this.kvsTicketForm.value.subject,
      "ticketDescription":this.kvsTicketForm.value.description,
      "ticketDocUploadYn":"1",
      "ticketStatus":"1",
      "folderId":this.randonNumber
  }
debugger
  console.log(data)
    Swal.fire({
      'icon':'warning',
      'text': "Do you want to proceed ?",
      'allowEscapeKey': false,
      'allowOutsideClick': false,
      'showCancelButton': true,
      'confirmButtonColor': "#DD6B55",
      'confirmButtonText': "Yes",
      'cancelButtonText': "No",
      'showLoaderOnConfirm': true,
    }
    ).then((isConfirm) => {
    if (isConfirm.value === true) {
        this.outSideService.initiateTicket(data).subscribe((res)=>{
          if(res){
            Swal.fire(
              'Ticket raised successfully!',
              '',
              'success'
            ) 
          this.getInitiatedTicket();
          }
    },
    error => {
      Swal.fire({
        'icon':'error',
        'text':error.error
      }
      )
    })
  }
  return false;
  });
  }


}
