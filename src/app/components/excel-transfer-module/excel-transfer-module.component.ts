import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-excel-transfer-module',
  templateUrl: './excel-transfer-module.component.html',
  styleUrls: ['./excel-transfer-module.component.css']
})
export class ExcelTransferModuleComponent implements OnInit {
  excelTransferForm: FormGroup;
  documentUploadArray: any[] = [];
  fileUpload: boolean = true;
  fileName: any;
  fileNameWithoutExt: any;
  enableUploadButton4: boolean = false;
  businessTypeId: any;
  loginUserNameForChild: any;
  excelTransferMangement:any=[];
  excelTransferData:any=[];
  kvicons: any;
  kvCode: any;
  formDataList:any;
  dataSource:any;
  tempTeacherId: any;
  randonNumber: any;
  deleteDocUpdate4: boolean;
  isVisible: boolean = false;
  displayedColumns = ['Sno','name','kvname','regionname','stationname','kv_name_alloted','region_name_alloted','station_name_alloted','admintransfer','post','category'];
  testData =  {  "sno": "", "employeecode": "", "name":"" , "transfer_type":"","presentKvName":"","presentKvCode":"","presentStationName":"","presentStationCode":"","presentRegionName":"","presentRegionCode":"","regionNameAlloted":"","allotStnCode":"","stationNameAlloted":"","is_admin_transfer":"","kv_name_alloted":"","allot_kv_code":"","last_promotion_position_type":"","transferred_under_cat":""};
  transferGroundList: any;
  totalLength: any;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService,private modalService: NgbModal,private formData: FormDataService) { }
  userMappingSource : MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('userMappingSort') userMappingSort: MatSort; 
  ngOnInit(): void {
    this.formDataList = this.formData.formData();
    this.transferGroundList = this.formDataList.transferGround;
    this.businessTypeId=JSON.parse(sessionStorage.getItem('authTeacherDetails')).applicationDetails[0].business_unit_type_id;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.excelTransferForm = this.fb.group({
     
    });
    this.tempTeacherId = sessionStorage.getItem('kvTeacherId');
    this.getTempTransferData();
  }
  fileToUpload: File | null = null;
  handleFileInput(files: FileList, index) {
    this.documentUploadArray[index] = { "Action":'' };
    this.fileUpload = false;
    this.fileName = files.item(0).name;
    var splitted = this.fileName.split('.', 2)
    this.fileNameWithoutExt=splitted[0];
    debugger
    if (splitted[1].toUpperCase() == 'XLSX' || splitted[1].toUpperCase() == 'xlsx' ) {
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
        'Only xlsx file can be uploaded',
        '',
        'error'
      )
      if (index == '4') {
        this.enableUploadButton4 = true;
      }
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
    this.totalLength = this.dataSource.filteredData.length;
  }
  documentUpload(index) {
    debugger
    this.fileUpload = true;
    const formData = new FormData();
    if (this.fileToUpload != null) {
      formData.append('file', this.fileToUpload);
      if(this.randonNumber=='' || this.randonNumber==null || this.randonNumber=='undefined' || this.randonNumber==undefined)  {
        this.randonNumber= Math.floor(100000 + Math.random() * 900000)
      } 
      const data={"file":formData};
      console.log(formData)
      this.outSideService.uploadXlxDocument(formData).subscribe((res) => {
        console.log(res)
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
      this.getTempTransferData()
     
      })
    } else {
      Swal.fire(
        'Select xlsx to be uploaded !',
        '',
        'error'
      )
    }
  }
  getTempTransferData(){
    this.excelTransferData=[];
    this.excelTransferMangement=[];
    this.outSideService.getTempTransferData().subscribe((res) => {
    this.excelTransferData=res;
    if(res.length>0){
      for (let i = 0; i < res.length; i++) {
        this.testData.sno = '' + (i + 1) + '';
        this.testData.employeecode = res[i].empCode;
        this.testData.name = res[i].empName;
        this.testData.transfer_type = res[i].transferType;
        this.testData.presentKvName = res[i].kvNamePresent;
        this.testData.presentKvCode = res[i].presentKvCode;
        this.testData.presentStationName = res[i].station_name_present;
        this.testData.presentStationCode = res[i].stationNamePresent;
        this.testData.presentRegionName = res[i].regionNamePresent;
        this.testData.presentRegionCode = res[i].regionCode;
        this.testData.regionNameAlloted = res[i].regionNameAlloted;
        this.testData.presentRegionCode = res[i].regionCodeAlloted;
        this.testData.allotStnCode = res[i].allotStnCode;
        this.testData.stationNameAlloted = res[i].stationNameAlloted;
       if(res[i].transferType=='AM'){
        this.testData.is_admin_transfer = 'Admin Modify';
       }
       if(res[i].transferType=='A'){
        this.testData.is_admin_transfer = 'Admin';
       }
       if(res[i].transferType=="NA"){
        this.testData.is_admin_transfer = 'Previous transfer pending';
       }
        this.testData.kv_name_alloted =  res[i].kvNameAlloted +' ('+res[i].allotKvCode +')'  ;
        this.testData.allot_kv_code = res[i].allotKvCode;
        this.testData.last_promotion_position_type = res[i].postName;
        if(res[i].transfer_type=='A' || res[i].transfer_type=='AM'){
          for (let j = 0; j < this.transferGroundList.length; j++) {
            if(this.transferGroundList[j]['transferGroundId']==res[i]['transferredUnderCatId']){
              this.testData.transferred_under_cat=this.transferGroundList[j]['transferGroundType']
            }
          }
        }
        if(res[i].transferredUnderCat=='-1' || res[i].transferredUnderCat==null){
          this.testData.transferred_under_cat='NA' 
        }
        if(res[i].transferredUnderCat=='40'){
          this.testData.transferred_under_cat='PWD' 
        }
        if(res[i].transferredUnderCat=='30'){
          this.testData.transferred_under_cat='Hard Station' 
        }
        if(res[i].transferredUnderCat=='20'){
          this.testData.transferred_under_cat='Single Parent' 
        }
        if(res[i].transferredUnderCat=='12'){
          this.testData.transferred_under_cat='CG Spouse' 
        }
        if(res[i].transferredUnderCat=='8'){
          this.testData.transferred_under_cat='Women' 
        }
        if(res[i].transferredUnderCat=='98'){
          this.testData.transferred_under_cat='Below 40 Transfer' 
        }
        if(res[i].transferredUnderCat=='0'){
          this.testData.transferred_under_cat='Tenure Complte' 
        }
        if(res[i].transferredUnderCat=='35'){
          this.testData.transferred_under_cat='DFP/MGD' 
        }
        if(res[i].transferredUnderCat=='25'){
          this.testData.transferred_under_cat='LTR' 
        }
        if(res[i].transferredUnderCat=='15'){
          this.testData.transferred_under_cat='KVS Spouse' 
        }
        if(res[i].transferredUnderCat=='10'){
          this.testData.transferred_under_cat='State Spouse' 
        }
        if(res[i].transferredUnderCat=='6'){
          this.testData.transferred_under_cat='RJCM/NJCM' 
        }
        if(res[i].transferredUnderCat=='99'){
          this.testData.transferred_under_cat='Displacement without choice' 
        }
//--------------------Transfer under Cat end------------------------------------------------------
        this.excelTransferMangement.push(this.testData);
        this.totalLength = this.excelTransferMangement.length;
        this.testData = {  "sno": "", "employeecode": "", "name":"" , "transfer_type":"","presentKvName":"","presentKvCode":"","presentStationName":"","presentStationCode":"","presentRegionName":"","presentRegionCode":"","regionNameAlloted":"","allotStnCode":"","stationNameAlloted":"","is_admin_transfer":"","kv_name_alloted":"","allot_kv_code":"","last_promotion_position_type":"","transferred_under_cat":""};
      }
      console.log(this.excelTransferMangement)
  }
  setTimeout(() => {
    this.dataSource = new MatTableDataSource(this.excelTransferMangement);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.userMappingSort;
  }, 100)
  },  
  error => { 
    Swal.fire({
      'icon':'error',
      'text':'You are not Authorized.'
    })
  })
  }
  saveExcelTransferdata(){

  if(this.excelTransferData.length>0){
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
        this.outSideService.confirmTransferData().subscribe((res)=>{
          if(res){
            Swal.fire(
              'Data Upload successfully!',
              '',
              'success'
            ) 
          }
          //this.fileName = '';
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
  }else{
    Swal.fire(
      'Please upload excel file!',
      '',
      'error'
    ) 
  }
    }
  submit(){
  }
}
