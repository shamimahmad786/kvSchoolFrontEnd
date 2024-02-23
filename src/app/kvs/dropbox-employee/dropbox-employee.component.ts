import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dropbox-employee',
  templateUrl: './dropbox-employee.component.html',
  styleUrls: ['./dropbox-employee.component.css']
})
export class DropboxEmployeeComponent implements OnInit {
  dropSearchForm: FormGroup;
  showFirstButtonColor: boolean = true;
  showsecondButtonColor: boolean = false;
  activePaneOne: boolean = true;
  activePaneTwo: boolean = false;
  dropBoxArray: any = [];
  searchDropData: any = [];
  kvCode: any;
  dropBoxReasion:any;
  searchData: any;
  manualEmpCodeSearch: any = [];
  totalLength: any;
  tagInput: string = '';
  tags: string[] = [];

  
dropBoxColumns = ['sno','teacherName','teachingType','Designation', 'dropBoxType','dropboxDescription','action'];
searchDropBoxColumns = ['sno','teacherName','kvName','teachingType','Designation', 'dropBoxType','status','Action'];
dropBoxData =  { "sno": "","teacherName": "","teacherId":"", "teachingType": "","lastPromotionPositionType":"","dropBoxType": "","dropboxDescription":""}
searchDropBoxData ={ "sno": "","teacherName": "","teacherId":"","kvCode":"","statusMsg":"","kvName":"","dropBoxFlag":"","className":"" ,"teachingType": "","lastPromotionPositionType":"","dropBoxType": ""}

 // displayedColumnsOut = ['sno','name','postName', 'subjectName','transferGround','relivingdate','To','action'];
 DropSource : MatTableDataSource<any>;
 dataSource : MatTableDataSource<any>;
 @ViewChild('dropPaginator') dropPaginator: MatPaginator;
 @ViewChild('paginator') paginator: MatPaginator;
 @ViewChild('dropSort') dropSort: MatSort;
  
 @ViewChild('dropSearchSort') dropSearchSort: MatSort;

  constructor(private outSideService: OutsideServicesService) { }

  ngOnInit(): void {
    this.dropSearchForm = new FormGroup({
      'employeeCode': new FormControl(''),
    });
    this.getDroboxMaster();
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    } 
  }
  getDroboxMaster(){
    this.outSideService.getDroboxMaster().subscribe((res) => {
      this.dropBoxReasion=res;
      if(res){
        this.getDropBxEmployee();
      }
    })
  }
  getDropBxEmployee(){
    var data={"kvCode": this.kvCode}
    this.outSideService.getDropedEmployeeByKvCode(data).subscribe((res) => {
      
    console.log("get dropbox employee details")
    console.log(res)
    this.setToJoingMatTable(res);
    })
  }

  setToJoingMatTable(data) {
    this.dropBoxArray = [];
    for (let i = 0; i < data.length; i++) {
      this.dropBoxData.sno = '' + (i + 1) + '';
      this.dropBoxData.teacherName = data[i].teacherName;
      this.dropBoxData.teacherId = data[i].teacherEmployeeCode;
      if(data[i].teachingNonteaching=="1"){
        this.dropBoxData.teachingType= "Teaching";
      }
      if(data[i].teachingNonteaching=="2"){
        this.dropBoxData.teachingType= "Non-Teaching";
      }
      for (let j = 0; j < this.dropBoxReasion.length; j++) {
        if(this.dropBoxReasion[j]['dropboxId']==data[i]['employeeDropId']){
          this.dropBoxData.dropBoxType=this.dropBoxReasion[j]['dropboxType']
        }
      }
      this.dropBoxData.lastPromotionPositionType=data[i].lastPromotionPositionType;
      this.dropBoxData.dropboxDescription = data[i].dropboxDescription;
      this.dropBoxArray.push(this.dropBoxData);
      this.dropBoxData = { "sno": "","teacherName": "","teacherId":"", "teachingType": "","dropBoxType": "","lastPromotionPositionType":"","dropboxDescription":""}
    }
    console.log("trandgdsdsds")
    console.log(this.dropBoxArray)
    setTimeout(() => {
      this.DropSource  = new MatTableDataSource(this.dropBoxArray);
      this.DropSource .paginator = this.dropPaginator;
      this.DropSource .sort = this.dropSort;  
    }, 100)
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === ',' && this.tagInput.trim() !== '') { 
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      var format1 = /[0-9]/;
      if( this.tagInput.match(format1) ){
        event.preventDefault(); // Prevent adding comma to the input
        const newTags = this.tagInput.split(',').map(tag => tag.trim());
        this.tags = [...this.tags, ...newTags];
        console.log(this.tags)
        this.tagInput = ''; // Clear the input field after adding tags
      }
    }
   
  }
  removeTag(tagToRemove: string) {
    this.tags = this.tags.filter(tag => tag !== tagToRemove);
    console.log(this.tags)
  }
  clear(){
    this.tags=[];
    this.searchDropData=[];
    this.totalLength ='';
    this.dataSource = new MatTableDataSource(this.searchDropData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.dropSearchSort;
    this.dropSearchForm.patchValue({
      employeeCode: '',
  });
}
  navColor(nav:any){
    if(nav=='dropList')
    {
      this.showFirstButtonColor=true;
      this.showsecondButtonColor=false;
      this.activePaneOne=true;
      this.activePaneTwo=false;
      this.getDroboxMaster();
    }else{
      this.showFirstButtonColor=false;
      this.showsecondButtonColor=true;
      this.activePaneOne=false;
      this.activePaneTwo=true;
      this.clear();
    } 
  }

  applyFilterSBSource(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.DropSource.filter = filterValue;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
    this.totalLength = this.dataSource.filteredData.length;
  }
  revokeEmployee(empCode:any){
    {
      const data={"teacherEmployeeCode":empCode}
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
           this.outSideService.revokeEmployeeFromDropbox(data).subscribe((res)=>{
             if(res){
              this.getDroboxMaster()
               Swal.fire(
                 'Employee revoked Successfully!',
                 '',
                 'success'
               )
             }
         this.submit();
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
  submit(){
    if(this.tags.length<1){
      this.manualEmpCodeSearch=[];
      this.manualEmpCodeSearch.push(this.dropSearchForm.value.employeeCode.trim())
      this.searchData={
        "empCode": this.manualEmpCodeSearch,
      }
    }
    else{
      this.searchData={
        "empCode":this.tags,
      }
      this.dropSearchForm.patchValue({
        employeeCode: this.tags[0],
    });
    }
   
    if(this.dropSearchForm.value.employeeCode=='' || this.dropSearchForm.value.employeeCode==null ){
      this.searchDropData=[];
        this.totalLength ='';
        this.dataSource = new MatTableDataSource(this.searchDropData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.dropSearchSort;
        this.dropSearchForm.patchValue({
          employeeCode: '',
      });
        return ;
      }
      else{
        console.log(this.searchData)
        this.searchDropData=[];
        this.outSideService.searchEmployeeForImport(this.searchData).subscribe(res => {
          console.log("emp transfer  data---------------")
         // this.transferStatusOneComplite=false;
          console.log(res)
          for (let i = 0; i < res.length; i++) {
            this.searchDropBoxData.sno = '' + (i + 1) + '';
            this.searchDropBoxData.teacherName = res[i].teacherName;
            this.searchDropBoxData.teacherId = res[i].teacherEmployeeCode;
            this.searchDropBoxData.kvCode = res[i].kvCode;
            this.searchDropBoxData.kvName = res[i].kvName;
            this.searchDropBoxData.dropBoxFlag = res[i].dropBoxFlag;
            if(res[i].dropBoxFlag=='0' && res[i].kvCode==this.kvCode ){
              this.searchDropBoxData.statusMsg="Employee Imported";
              this.searchDropBoxData.className='make-green';
            }
            if((res[i].dropBoxFlag=='0' ||  res[i].dropBoxFlag==null) && res[i].kvCode!=this.kvCode ){
              this.searchDropBoxData.statusMsg="Contact to KV to complete relieve process";
              this.searchDropBoxData.className='make-red';
            }
            
            if(res[i].dropBoxFlag==null && res[i].kvCode==this.kvCode ){
              this.searchDropBoxData.statusMsg="Contact to KV to complete relieve process";
              this.searchDropBoxData.className='make-red';
            }

            // for (let j = 0; j < this.searchData['empCode'].length; j++) {
            //   if(res[i].dropBoxFlag== '0' && this.dropBoxReasion[j]['dropboxId']==res[i]['employeedropid']){
            //     this.searchDropBoxData.dropBoxType=this.dropBoxReasion[j]['dropboxType']
            //   }
            // }

            if(res[i].teachingNonteaching=="1"){
              this.searchDropBoxData.teachingType= "Teaching";
            }
            if(res[i].teachingNonteaching=="2"){
              this.searchDropBoxData.teachingType= "Non-Teaching";
            }
            for (let j = 0; j < this.dropBoxReasion.length; j++) {
              if(this.dropBoxReasion[j]['dropboxId']==res[i]['employeedropid']){
                this.searchDropBoxData.dropBoxType=this.dropBoxReasion[j]['dropboxType']
              }
            }
            this.searchDropBoxData.lastPromotionPositionType=res[i].lastPromotionPositionType;
            this.searchDropData.push(this.searchDropBoxData);
            this.totalLength = this.searchDropData.length;
            this.searchDropBoxData = { "sno": "","teacherName": "","teacherId":"","kvCode":"","statusMsg":"","kvName":"","dropBoxFlag":"","className":"" ,"teachingType": "","lastPromotionPositionType":"","dropBoxType": ""}
          }
          console.log("trandgdsdsds")
    console.log(this.searchDropData)
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.searchDropData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.dropSearchSort;
          }, 100)
         },
        error => { 
          Swal.fire({
            'icon':'error',
            'text':'You are not Authorized.'
          })
        })

      }
  }
  importEmployee(empCode: Event){
    const data={"allotKvCode":this.kvCode ,"username":empCode,"teacherEmployeeCode":empCode}
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
         this.outSideService.importEmployeeFromDropbox(data).subscribe((res)=>{
           if(res){
            
             Swal.fire(
               'Employee Imported successfully!',
               '',
               'success'
             )
           }
       this.submit();
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
