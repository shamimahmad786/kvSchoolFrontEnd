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
  docList: any[] = [];
  deleteDocUpdate4: boolean = true;
  imageName: any=[];
  isVisible: boolean = false;
  formData: FormData;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService,private modalService: NgbModal) { }
  dataSource:any;
  // displayedColumns:any = ['sno','regionname','stationname','fromdate','todate','status'];
  displayedColumns:any = ['sno','Type','Description','OrderDate','Year','Action'];

  testData ={ "sno": "", "transferOrderNumber": "","fileType":"", "description": "", "transferOrderDate": "","inityear":""};
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
      'transferOrderDate':  new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'fileUpload': new FormControl(''),
    });
 
    this.getDocument();
  }
  getDocument(){
    var data={
     "teacherEmployeeCode":this.loginUserNameForChild
     }
     this.outSideService.getUploadedDocument().subscribe((res)=>{
      console.log(res)
       this.docList=[];
       if(res.length>0){
           for (let i = 0; i < res.length; i++) {
             this.testData.sno = '' + (i + 1) + '';
             this.testData.transferOrderNumber = res[i].transferOrderNumber;   
             if( res[i].fileType=='1'){
              this.testData.fileType ='Promotion Transfer Order';
             }
             if( res[i].fileType=='2'){
              this.testData.fileType ='Admin Transfer Order';
             }
             if( res[i].fileType=='3'){
              this.testData.fileType ='Request Transfer Order';
             }
             if( res[i].fileType=='4'){
              this.testData.fileType ='cancel Transfer Order';
             }
            
             this.testData.description = res[i].description;
             this.testData.transferOrderDate = res[i].transferOrderDate;    


             this.testData.inityear = res[i].inityear;  
   
             this.docList.push(this.testData);
             this.testData = { "sno": "", "transferOrderNumber": "","fileType":"", "description": "", "transferOrderDate": "","inityear":""};
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
   applyFilter(filterValue: string) {
     filterValue = filterValue.trim();
     filterValue = filterValue.toLowerCase(); 
     this.dataSource.filter = filterValue;
   }
  fileToUpload: File | null = null;
  handleFileInput(files: FileList, index) {
    debugger
    this.documentUploadArray[index] = { "Action":'' };
    console.log( this.documentUploadArray)
    this.fileUpload = true;
    this.fileName = files.item(0).name;
    var splitted = this.fileName.split('.', 2)
    this.fileNameWithoutExt=splitted[0];
    if (splitted[1].toUpperCase() == 'PDF' || splitted[1].toUpperCase() == 'pdf' ) {
      if (files.item(0).size <= 512000) {
        //alert("set file");
        this.fileToUpload = files.item(0);
         if (index == '4') {
          this.enableUploadButton4 = true;
          this.fileUpload = false;
        }
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
downloadDocument(){}
  // getDocumentByFolderId(){
  //   var data={"folderId": this.randonNumber}
  //   this.image2=[];
  //   this.imageName=[];
  //   this.outSideService.getDocumentByFolderId(data).subscribe((res) => {
  //    this.image2=res;
  //    if(res.length>0){
  //     this.fileUpload = false;
  //     this.isVisible = true;
  //    }
  //   })
  // }
  submit(){
    const formData = new FormData();
      alert( this.fileToUpload.size);
      formData.append('file', this.fileToUpload);
      formData.append('inityear', this.transferRelatedDocForm.value.transferYear);
      formData.append('type', this.transferRelatedDocForm.value.transferType);
      formData.append('orderName',  this.transferRelatedDocForm.value.transferOrderNumber); 
      formData.append('orderDate',  this.transferRelatedDocForm.value.transferOrderDate); 
      formData.append('description', this.transferRelatedDocForm.value.description);

    this.outSideService.fileUpload(formData).subscribe((res)=>{
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
}
