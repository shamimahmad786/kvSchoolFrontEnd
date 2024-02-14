import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from '@angular/material/core';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
declare const srvTime: any;
@Component({
  selector: 'app-transfer-related-doc',
  templateUrl: './transfer-related-doc.component.html',
  styleUrls: ['./transfer-related-doc.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
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
  enableUploadButton4: boolean = true;
  randonNumber: any;
  image2: any[] = [];
  docList: any[] = [];
  deleteDocUpdate4: boolean = true;
  noOfEmployee: boolean = false;
  returnTypeSrvTime: any;
  imageName: any=[];
  isVisible: boolean = false;
  formData: FormData;
  downloadDocUrl: any;
  token: any;
  maxDate:any;
  noOfAssociatedEmployees:any;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService,private modalService: NgbModal) { }
  dataSource:any;
  // displayedColumns:any = ['sno','regionname','stationname','fromdate','todate','status'];
  displayedColumns:any = ['sno','title','transferOrderNumber','Type','Description','noOfAssociatedEmployee','OrderDate','Action'];

  testData ={ "sno": "","docTitle":"", "transferOrderNumber": "","noOfAssociatedEmployee":"","docURLName":"","fileType":"", "description": "", "transferOrderDate": ""};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;      

  ngOnInit(): void {
    this.returnTypeSrvTime = srvTime();
    var date = new Date(this.returnTypeSrvTime),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day1 = ("0" + date.getDate()).slice(-2);
    this.maxDate =  [date.getFullYear(), mnth, day1].join("-");
    this.downloadDocUrl=environment.BASE_URL_FILE_MANAGEMENT;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.teacherName=JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].firstname+' '+JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].lastname;
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.token =JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token;
    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    this.transferRelatedDocForm = this.fb.group({
      'transferTitle':new FormControl('', Validators.required),
      'transferType':new FormControl('', Validators.required),
      'noOfEmployee':new FormControl('', Validators.required),
      'transferOrderNumber': new FormControl('', Validators.required),
      'transferOrderDate':  new FormControl('', Validators.required),
      'description': new FormControl(''),
      'fileUpload': new FormControl(''),
    });
 
    this.getDocument();
  }
  getDocument(){
     this.outSideService.getUploadedDocument().subscribe((res)=>{
      console.log(res)
       this.docList=[];
       if(res.length>0){
           for (let i = 0; i < res.length; i++) {
             this.testData.sno = '' + (i + 1) + '';
             this.testData.docTitle = res[i].documentTitle;
             this.testData.noOfAssociatedEmployee = res[i].noOfAssociatedEmployee;
             this.testData.transferOrderNumber = res[i].transferOrderNumber;   
             this.testData.docURLName = this.downloadDocUrl+"downloadUploadDocumentById?fileId="+res[i].transferOrderNumber+"&docId="+this.token+"&username="+JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
             if( res[i].fileType=='1'){
              this.testData.fileType ='Circular';
             }
             if( res[i].fileType=='2'){
              this.testData.fileType ='Document';
             }
             if( res[i].fileType=='3'){
              this.testData.fileType ='Notification';
             }
             if( res[i].fileType=='4'){
              this.testData.fileType ='Order-Court Order';
             }
             if( res[i].fileType=='5'){
              this.testData.fileType ='Order-Transfer';
             }
             if( res[i].fileType=='6'){
              this.testData.fileType ='Order-Others';
             }
            
             this.testData.description = res[i].description;
             this.testData.transferOrderDate = res[i].transferOrderDate;    


        //     this.testData.inityear = res[i].inityear;  
   
             this.docList.push(this.testData);
             this.testData = { "sno": "","docTitle":"", "transferOrderNumber": "","noOfAssociatedEmployee":"","docURLName":"","fileType":"", "description": "", "transferOrderDate": ""};
           }
       }
       setTimeout(() => {
         this.dataSource = new MatTableDataSource(this.docList);
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
   disableDate() { 
    return false; 
} 
omit_special_char(event)
{   
   var k;  
   k = event.charCode;
   return((k > 47 && k < 58)) ; 
}
   applyFilter(filterValue: string) {
     filterValue = filterValue.trim();
     filterValue = filterValue.toLowerCase(); 
     this.dataSource.filter = filterValue;
   }
  fileToUpload: File | null = null;
  handleFileInput(files: FileList) {
    debugger
  
    console.log( this.documentUploadArray)
    this.fileUpload = true;
    this.enableUploadButton4 = true;
    this.fileName = files.item(0).name;
    var splitted = this.fileName.split('.', 2)
    this.fileNameWithoutExt=splitted[0];
    if (splitted[1].toUpperCase() == 'PDF' || splitted[1].toUpperCase() == 'pdf' ) {
      if (files.item(0).size <= 512000) {
        this.fileToUpload = files.item(0);
          this.enableUploadButton4 = false;
          this.fileUpload = false;
      } else {
        this.fileToUpload = null;
        Swal.fire(
          'File size allowed upto 5MB only !',
          '',
          'error'
        ) 
      }
    } else {
      this.fileToUpload = null;
      Swal.fire(
        'Only PDF file can be uploaded',
        '',
        'error'
      )
    }
  }
  documentUpload() {
    debugger
 
}

transferType(event:any){
if(event.target.value==5){
this.noOfEmployee=true;
}
else{
  this.noOfEmployee=false;
}
}
downloadDocumnet(value:any){
  console.log(value)
  var data={"docId":value}
  this.outSideService.downloadUploadDocumentById(data).subscribe((res)=>{
    console.log(res)
    if(res){
      Swal.fire(
        'Document upload successfully!',
        '',
        'success'
      )
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

  submit(){
    debugger
    const formData = new FormData();
    if(this.transferRelatedDocForm.value.transferType!='5'){
      this.noOfAssociatedEmployees=0;
    }
    else{
      this.noOfAssociatedEmployees = this.transferRelatedDocForm.value.noOfEmployee;
    }
      formData.append('file', this.fileToUpload);
      //formData.append('inityear', this.transferRelatedDocForm.value.transferYear);
      formData.append('documentTitle', this.transferRelatedDocForm.value.transferTitle);
      formData.append('type', this.transferRelatedDocForm.value.transferType);
      formData.append('noOfAssociatedEmployee', this.noOfAssociatedEmployees);
      formData.append('orderName',  this.transferRelatedDocForm.value.transferOrderNumber); 
      formData.append('orderDate',  this.transferRelatedDocForm.value.transferOrderDate); 
      formData.append('description', this.transferRelatedDocForm.value.description);
      this.outSideService.fileUpload(formData).subscribe((res)=>{
      console.log(res)
      if(res){
        this.enableUploadButton4 = true;
        this.transferRelatedDocForm.patchValue({
          transferType: '',
          transferTitle:'',
          noOfEmployee: '',
          transferOrderNumber: '',
          description: '',
          transferOrderDate: '',
          fileUpload:'',
      })
        this.getDocument();

        Swal.fire(
          'Document upload successfully!',
          '',
          'success'
        )
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
}
