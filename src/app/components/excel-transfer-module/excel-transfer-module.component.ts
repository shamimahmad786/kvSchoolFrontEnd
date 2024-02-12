import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
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
  isLoading : boolean = false;
  hideConfirmButton: boolean = false;
  errorShowDiv: boolean = false;
  isVisible: boolean = false;
  displayedColumns = ['Sno','name','kvname','regionname','stationname','kv_name_alloted','region_name_alloted','station_name_alloted','admintransfer','post','category','transferOrderNumber','trasndferOrderDate','status','remark'];
  testData =  {  "sno": "", "employeecode": "", "name":"" , "transfer_type":"","presentKvName":"","presentKvCode":"","presentStationName":"","presentStationCode":"","presentRegionName":"","presentRegionCode":"","regionNameAlloted":"","allotStnCode":"","stationNameAlloted":"","is_admin_transfer":"","kv_name_alloted":"","allot_kv_code":"","last_promotion_position_type":"","transferred_under_cat":"","transferOrderNumber":"","status":"","statusFinal":"","remark":"","trasndferOrderDate":"","allottedRegionCode": ""};
  transferGroundList: any;
  totalLength: any;
  bugsCount: any;
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
      'fileUpload': new FormControl(''),
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
    this.excelTransferForm.patchValue({
      fileUpload: '',
    })
    
    this.fileUpload = true;
    const formData = new FormData();
    if (this.fileToUpload != null) {
      formData.append('file', this.fileToUpload);
      if(this.randonNumber=='' || this.randonNumber==null || this.randonNumber=='undefined' || this.randonNumber==undefined)  {
        this.randonNumber= Math.floor(100000 + Math.random() * 900000)
      } 
      const data={"file":formData};
      console.log(formData)
      this.isLoading=true;
      this.outSideService.uploadXlxDocument(formData).subscribe((res) => {
        console.log(res)
       
        if(res.status=="1"){
          this.hideConfirmButton=true;
          this.isLoading = false;
          Swal.fire(
            res.message,
            '',
            'success'
          )
        }
        else{
          this.isLoading = false;
          this.bugsCount=res.bugsCount
          this.errorShowDiv=true;
          Swal.fire({
            'icon':'error',
            'text':res.message
          }
          )
        }
        this.fileUpload = false;
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
      console.log("all excel  data---")
      console.log(res)
    this.excelTransferData=res;
    if(res.length>0){
      for (let i = 0; i < res.length; i++) {
        this.testData.sno = '' + (i + 1) + '';
        this.testData.employeecode = res[i].empCode;
        this.testData.name = res[i].empName;
        this.testData.transfer_type = res[i].transferType;
        this.testData.presentKvName = res[i].kvNamePresent;
        this.testData.presentKvCode = res[i].presentKvCode;
        this.testData.presentStationName = res[i].stationNamePresent;
        this.testData.presentStationCode = res[i].presentStationCode;
        this.testData.presentRegionName = res[i].regionNamePresent;
        this.testData.presentRegionCode = res[i].regionCode;
        this.testData.regionNameAlloted = res[i].regionNameAlloted;
    //    this.testData.presentRegionCode = res[i].regionCodeAlloted;
        this.testData.allotStnCode = res[i].allotStnCode;
        this.testData.stationNameAlloted = res[i].stationNameAlloted;
        this.testData.allottedRegionCode = res[i].regionCodeAlloted;
        this.testData.transferOrderNumber = res[i].transferOrderNumber;
        this.testData.trasndferOrderDate = res[i].trasndferOrderDate;
        this.testData.status= res[i].status;
        this.testData.remark= res[i].remarks;
        if(res[i].status=='1' || res[i].status==1){
          this.testData.statusFinal='Sucess';
        }
        if(res[i].status=='0' || res[i].status==0){
          this.testData.statusFinal='Fail';
        }
       if(res[i].transferType=='AM'){
        this.testData.is_admin_transfer = 'Admin Modify';
       }
       if(res[i].transferType=='A'){
        this.testData.is_admin_transfer = 'Admin Transfer';
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
         this.testData.transferred_under_cat=this.transferUderCat(res[i]['transferredUnderCatId']);
        // if(res[i].transferredUnderCat=='-1' || res[i].transferredUnderCat==null){
        //   this.testData.transferred_under_cat='NA' 
        // }
        // if(res[i].transferredUnderCat=='40'){
        //   this.testData.transferred_under_cat='PWD' 
        // }
        // if(res[i].transferredUnderCat=='30'){
        //   this.testData.transferred_under_cat='Hard Station' 
        // }
        // if(res[i].transferredUnderCat=='20'){
        //   this.testData.transferred_under_cat='Single Parent' 
        // }
        // if(res[i].transferredUnderCat=='12'){
        //   this.testData.transferred_under_cat='CG Spouse' 
        // }
        // if(res[i].transferredUnderCat=='8'){
        //   this.testData.transferred_under_cat='Women' 
        // }
        // if(res[i].transferredUnderCat=='98'){
        //   this.testData.transferred_under_cat='Below 40 Transfer' 
        // }
        // if(res[i].transferredUnderCat=='0'){
        //   this.testData.transferred_under_cat='Tenure Complte' 
        // }
        // if(res[i].transferredUnderCat=='35'){
        //   this.testData.transferred_under_cat='DFP/MGD' 
        // }
        // if(res[i].transferredUnderCat=='25'){
        //   this.testData.transferred_under_cat='LTR' 
        // }
        // if(res[i].transferredUnderCat=='15'){
        //   this.testData.transferred_under_cat='KVS Spouse' 
        // }
        // if(res[i].transferredUnderCat=='10'){
        //   this.testData.transferred_under_cat='State Spouse' 
        // }
        // if(res[i].transferredUnderCat=='6'){
        //   this.testData.transferred_under_cat='RJCM/NJCM' 
        // }
        // if(res[i].transferredUnderCat=='99'){
        //   this.testData.transferred_under_cat='Displacement without choice' 
        // }
//--------------------Transfer under Cat end------------------------------------------------------
        this.excelTransferMangement.push(this.testData);
        this.totalLength = this.excelTransferMangement.length;
        this.testData = {  "sno": "", "employeecode": "", "name":"" , "transfer_type":"","presentKvName":"","presentKvCode":"","presentStationName":"","presentStationCode":"","presentRegionName":"","presentRegionCode":"","regionNameAlloted":"","allotStnCode":"","stationNameAlloted":"","is_admin_transfer":"","kv_name_alloted":"","allot_kv_code":"","last_promotion_position_type":"","transferred_under_cat":"","transferOrderNumber":"","status":"","statusFinal":"","remark":"","trasndferOrderDate":"", "allottedRegionCode": ""};
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
  clearExcelTransferdata(){
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
        this.outSideService.cleanUploadedExcel().subscribe((res)=>{
          // alert(res);
          if(res.status=="1"){
            Swal.fire(
              res.message,
              '',
              'success'
            ) 
          }else{
            Swal.fire(
              res.message,
              '',
              'error'
            )
          }
          this.getTempTransferData();
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
  exportexcel(){
    console.log( this.excelTransferMangement)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('StationMaster');
    const excelData = [];
    const ws1 = workSheet.addRow(['','','', 'TRANSFER EXCEL', '']);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 25;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 30;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 30;
    const dobCol3 = workSheet.getColumn(4);
    dobCol3.width = 30;
    const dobCol4 = workSheet.getColumn(5);
    dobCol4.width = 30;
    const dobCol5 = workSheet.getColumn(6);
    dobCol5.width = 30;
    const dobCol6 = workSheet.getColumn(7);
    dobCol6.width = 30;
    const dobCol7 = workSheet.getColumn(8);
    dobCol7.width = 30;
    const dobCol8 = workSheet.getColumn(9);
    dobCol8.width = 10;
    const dobCol9 = workSheet.getColumn(10);
    dobCol9.width = 25;
    const dobCol10 = workSheet.getColumn(11);
    dobCol10.width = 20;
    const dobCol11 = workSheet.getColumn(12);
    dobCol11.width = 10;
    workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 13, bold: true };
    for (let i = 1; i < 11; i++) {
      const col = ws1.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb:  '9c9b98' },   
      };
    }
   const ws = workSheet.addRow(['Employee Name', 'PrerentKv', 'Present Region', 'Present Station','Alloted KV','Alloted Region','Alloted Station','Transfer Type','Post','Order Number','Order Date','Status']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 11; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.excelTransferMangement.forEach((item) => {
      if(item.status==0 || item.status=='0'){
        const row1 = workSheet.addRow([item.name+' ('+item.presentKvCode+')', item.presentKvName +' ('+item.presentKvCode+')', item.presentRegionName +' ('+item.presentRegionCode+')', item.presentStationName +' ('+item.presentStationCode+')', item.kv_name_alloted +' ('+item.allot_kv_code+')', item.regionNameAlloted +' ('+item.allottedRegionCode+')', item.stationNameAlloted +' ('+item.allotStnCode+')', item.transfer_type ,item.last_promotion_position_type,item.transferOrderNumber,item.trasndferOrderDate,item.statusFinal]);
        for (let i = 1; i < 13; i++) {
          const col = row1.getCell(i);
          col.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb:  'cc2121' },
          };
        }
      }
      else{
        const row = workSheet.addRow([item.name+' ('+item.presentKvCode+')', item.presentKvName +' ('+item.presentKvCode+')', item.presentRegionName +' ('+item.presentRegionCode+')', item.presentStationName +' ('+item.presentStationCode+')', item.kv_name_alloted +' ('+item.allot_kv_code+')', item.regionNameAlloted +' ('+item.allottedRegionCode+')', item.stationNameAlloted +' ('+item.allotStnCode+')', item.transfer_type ,item.last_promotion_position_type,item.statusFinal]);
      }
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'DemoTransferExcel.xlsx');
    });
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
  
        this.outSideService.confirmTransferData().subscribe((res)=>{
          // alert(res);
          if(res.status==1){
            Swal.fire(
              res.message,
              '',
              'success'
            ) 
          }
          this.getTempTransferData();
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


 transferUderCat(id:any){
let catData={"id1":"Request Transfer","id2":"Request On LTR","id3":"Request On MDG","id4":"Request On DFP","id5":"Request On PwD","id6":"Request On Spouse Ground","id7":"Surplus","id8":"Displacement","id9":"ADMN Ground Under PARA7(E)","id10":"ADMN Ground Under 40 Years Of Age","id11":"Direct Recruitment","id12":"Promotion","id13":"Request On SP","id14":"Request On Widow/Widower","id15":"Mutual Transfer","id16":"Request On Any Other Ground","id17":"No Taker Vacancy Availed","id18":"Any Other Administrative Ground","id19":"Transfer Modification","id20":"Public Interest"};
if(id==1){
  return catData.id1;
}else if(id==2){
  return catData.id2;
}else if(id==3){
  return catData.id3;
}else if(id==4){
  return catData.id4;
}else if(id==5){
  return catData.id5;
}else if(id==6){
  return catData.id6;
}else if(id==7){
  return catData.id7;
}else if(id==8){
  return catData.id8;
}else if(id==9){
  return catData.id9;
}else if(id==10){
  return catData.id10;
}else if(id==11){
  return catData.id11;
}else if(id==12){
  return catData.id12;
}else if(id==13){
  return catData.id13;
}else if(id==14){
  return catData.id14;
}else if(id==15){
  return catData.id15;
}else if(id==16){
  return catData.id16;
}else if(id==17){
  return catData.id17;
}else if(id==18){
  return catData.id18;
}else if(id==19){
  return catData.id19;
}else if(id==20){
  return catData.id20;
}

  }

}
