import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-institute-head',
  templateUrl: './add-institute-head.component.html',
  styleUrls: ['./add-institute-head.component.css']
})
export class AddInstituteHeadComponent implements OnInit {
  instituteType: any = [];
  addInstituteForm: FormGroup;
  addInstituteFormubmitted=false;
  regionList: any;
  loginUserNameForChild: any;
  businessUnitTypeId: any;
  schoolType:any;
  businessUnitTypeCode:any;
  childBussinessUnitTypeId:any;
  childBussinessUnitTypeCode:any;
  employeeCode: any;
  emplyeeData: any;
  profileTeacherName: any;
  getDistrictByStateId: any;
  applicationId: any
  subjectListNameCode: any[] = [];
  subjectList: any;
  teacherTypeData: any;
  teacherTypeDataNameCode: any = [];
  constructor(private outSideService: OutsideServicesService,private router: Router) { }

  ngOnInit(): void {

    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      console.log(JSON.parse(sessionStorage.getItem("authTeacherDetails")));
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.businessUnitTypeId= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_id;
      this.businessUnitTypeCode= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_code;
    }
    if(this.businessUnitTypeId=="2"){
      this.schoolType="3";
    } else if(this.businessUnitTypeId=="3"){
      this.schoolType="1";
    }else if(this.businessUnitTypeId=="5"){
      this.childBussinessUnitTypeId="6";
    }
    if(this.businessUnitTypeId=="5"){
      this.addInstituteForm = new FormGroup({
        'userName': new FormControl('', Validators.required),
        'firstname': new FormControl('', [Validators.required]),
        'Email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        'Mobile': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[8976][0-9]{9}")]),
        'Designation': new FormControl('', Validators.required),
        'staffType' : new FormControl('', Validators.required),
      });
    }
    else{
      this.addInstituteForm = new FormGroup({
        'instituteType': new FormControl('', Validators.required),
        'instituteCode': new FormControl('', Validators.required),
      //  'firstname': new FormControl('', Validators.required),
        'userName': new FormControl('', Validators.required),
        'Email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        'Mobile': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[8976][0-9]{9}")]),
      });
    }
  if(this.businessUnitTypeId=="2"){
    this.instituteType=[
    {
        "name": "Head Office",
        "value": "4"
     }, 
     {
      "name": "Region Office(RO)",
      "value": "3"
     },{
    "name": "ZIET",
    "value": "2"
    }]
   }
  if(this.businessUnitTypeId=="3"){
  this.instituteType=[{
  "name": "School",
  "value": "5"
  },{"name":"RO Office","value":"31"}]
}
this.getAllMaster();
}
  get f() { return this.addInstituteForm.controls; }
  //***************** Get Region*******************************************/
  getStationByRegionId(event:any){
    console.log(event.target.value);
    debugger;
    this.schoolType="";

  if(event.target.value=="3" || event.target.value=="2" ){
  this.outSideService.fetchKvRegion(event.target.value).subscribe(res => {
    this.regionList = res.response.rowValue;
    // alert(this.businessUnitTypeId);
    console.log("region list")
    console.log(this.regionList)
  },
  error => { 
    Swal.fire({
      'icon':'error',
      'text':'You are not Authorized.'
    })
  });
  }
  if(event.target.value=="5" || event.target.value=="31" || event.target.value=="4"){

    if(event.target.value=="31"){
      this.schoolType="3";
    }else if(event.target.value=="4"){
      this.schoolType="4";
    }else{
      this.schoolType="1";
    }
    this.regionList=[];
    this.addInstituteForm.patchValue({
      userName:'',
    })
    var data={
      "regionCode":this.businessUnitTypeCode,
      "schoolType":this.schoolType
    }
    this.outSideService.getregionSchool(data,this.loginUserNameForChild).subscribe(res => {
    this.regionList=res
    console.log(res)
    },
    error => { 
      Swal.fire({
        'icon':'error',
        'text':'You are not Authorized.'
      })
    });
    }
    this.addInstituteForm.patchValue({
      userName:'',
    })
  }


  teacherTypeSelect(event) {
    console.log('Staff type test', event.target.value)
    debugger;
    if (event.target.value != 22 && event.target.value != 23 && event.target.value != 10 && event.target.value != 12 && event.target.value != 24 && event.target.value != 11 && event.target.value != '22' && event.target.value != '23' && event.target.value != '11' && event.target.value != '24') {
      this.addInstituteForm.patchValue({
          staffType: '2'
      });
    } else {
      this.addInstituteForm.patchValue({
          staffType: '1'
      });
    }

  }

  getAllMaster() {
    debugger;

    this.outSideService.fetchAllMaster(6).subscribe((res) => {
      this.teacherTypeData = res.response.postionType;
      this.teacherTypeDataNameCode = [];
      for (let i = 0; i < this.teacherTypeData.length; i++) {

        var concatElement;
        concatElement = this.teacherTypeData[i].organizationTeacherTypeName;
        concatElement = concatElement + "(" + this.teacherTypeData[i].orgTeacherTypeCode + ")";
        var data = {
          'nameCode': concatElement,
          'teacherTypeId': this.teacherTypeData[i].teacherTypeId
        }
        this.teacherTypeDataNameCode.push(data)
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



  getSubjectByTchType(data) {
    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      this.subjectList = res.response.rowValue;
      console.log(this.subjectList);
      this.subjectListNameCode = [];
      for (let i = 0; i < this.subjectList.length; i++) {
        var conElement;
        conElement = this.subjectList[i].subject_name;
        conElement = conElement + "(" + this.subjectList[i].subject_code + ")";
        var data = {
          'subNameCode': conElement,
          'subjectCode': this.subjectList[i].subject_id
        }
        this.subjectListNameCode.push(data);
      }
    })
  }




  getEmployeeData(){
    var data={
     "teacherEmployeeCode":this.employeeCode
    }
      this.outSideService.getEmployeeDetailV2(data).subscribe((res)=>{
      this.emplyeeData=res.response;
      if(res){
        this.addInstituteForm.patchValue({
          fullName:  this.emplyeeData['teacherName'],
          gender: this.emplyeeData['teacherGender'],
          dob: this.emplyeeData['teacherDob'],
          empCode:this.emplyeeData['teacherEmployeeCode'],
          mobile: this.emplyeeData['teacherMobile'],
          email: this.emplyeeData['teacherEmail'],
          prmntAddress: this.emplyeeData['teacherPermanentAddress'],
          prmntState: this.emplyeeData['teacherParmanentState'],
          prmntDistrict: this.emplyeeData['teacherPermanentDistrict'] ,
          prmntPinCode: this.emplyeeData['teacherPermanentPin'],
          crspndncAddress: this.emplyeeData['teacherCorrespondenceAddress'],
          crspndncState: this.emplyeeData['teacherCorrespondenceState'],
          crspndncDistrict: this.emplyeeData['teacherCorrespondenceDistrict'],
          crspndncPinCode: this.emplyeeData['teacherCorrespondencePin'],
          disabilityYN: this.emplyeeData['teacherDisabilityYn'],
          disabilityType: this.emplyeeData['teacherDisabilityType'],
          presentPostName:this.emplyeeData['lastPromotionPositionType'],
          lastPromotionPositionDate: this.emplyeeData['lastPromotionPositionDate'],
          presentSubjectName: this.emplyeeData['workExperienceAppointedForSubject'],
          staffType: this.emplyeeData['teachingNonteaching'],
          spouseStatusF:this.emplyeeData['spouseStatus'],
          spouseEmpCode:this.emplyeeData['spouseEmpCode'],
          spouseName:this.emplyeeData['spouseName'],
          spousePost:this.emplyeeData['spousePost'],
          spouseStationName:this.emplyeeData['spouseStationName'],
          spouseStationCode:this.emplyeeData['spouseStationCode'],
          maritalStatusF:this.emplyeeData['maritalStatus'],
          specialRecruitmentYn: this.emplyeeData['specialRecruitmentYn'],
      });
      sessionStorage.setItem('kvTeacherId',this.emplyeeData['teacherId'])
      this.profileTeacherName= this.emplyeeData['teacherName']
      this.getDistrictByStateId(this.emplyeeData['teacherParmanentState'],'P');
      this.getDistrictByStateId(this.emplyeeData['teacherCorrespondenceState'],'C');


      
      var data = {
        "applicationId": this.applicationId,
        "teacherTypeId": this.emplyeeData['lastPromotionPositionType']
      }
     
    
      }
      // this.getDocumentByTeacherId();
      // this.getFormStatusV2();
  },
)
  }




  //***************** make User Name On Basis Of Station name*******************************************/
  getUserNameForInstitute(event:any){


      var instituteUserNameSplit = event.split("/")
      var instituteUserName ='ro_'+instituteUserNameSplit[1].toLowerCase();
      if(instituteUserName.indexOf('ziet') !=-1){
       var zietUserNameSplit= instituteUserName.split(" ");
      //  instituteUserName=zietUserNameSplit[0]+"_"+zietUserNameSplit[1];
      var instituteUserName ='ziet_'+instituteUserNameSplit[2].toLowerCase();
      }
      this.addInstituteForm.patchValue({
        userName:instituteUserName,
      })
  }
  getUserNameForSchool(event:any){
  
    var schoolUserNameSplit = event.split("/")
    var schoolUserName ='kv_'+schoolUserNameSplit[0].toLowerCase();
    if(schoolUserNameSplit[1].indexOf("HQ") !=-1){
       schoolUserName ='hq_'+schoolUserNameSplit[0].toLowerCase();
    }
    this.addInstituteForm.patchValue({
      userName:schoolUserName,
    })
  }

  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32); 
  }

  omit_special_char_mobile(event)
  {   
     var k;  
     k = event.charCode;
     return((k > 47 && k < 58)); 
  }

  omit_special_char_empCode(event)
  {   
     var k;  
     k = event.charCode;
     return((k > 47 && k < 58)); 
  }

  onSubmit(){
    debugger
    if (this.addInstituteForm.invalid) {
     this.addInstituteFormubmitted = true;
     this.addInstituteForm.markAllAsTouched();
    }else{
    this.addInstituteFormubmitted=true
    if(this.businessUnitTypeId=="5"){
      var data ={
        "username":this.addInstituteForm.controls['userName'].value,
        "email":this.addInstituteForm.controls['Email'].value,
        "mobile":this.addInstituteForm.controls['Mobile'].value,
        "firstname":this.addInstituteForm.controls['firstname'].value,
        "designation":this.addInstituteForm.controls['Designation'].value,
        "parentuser": this.loginUserNameForChild,
        "businessUnitTypeId":this.childBussinessUnitTypeId,
        "businessUnitTypeCode":this.businessUnitTypeCode,
        "staffType":this.addInstituteForm.value.staffType,
        
       }


       this.outSideService.createInstitutionUser(data,this.loginUserNameForChild).subscribe(res => {
        console.log(res)
        if(res['success']){
          Swal.fire({
        'icon':'success',
        'text':res['message']
      })
      this.router.navigate(['/teacher/userMaster'])
      }
      if(!res['success']){
        Swal.fire({
      'icon':'error',
      'text':res['errorMessage']
       })
        }
       },
       error => { 
        Swal.fire({
          'icon':'error',
           'text':'You are not Authorized.'
        })
       });
    }else{
     

      if(this.addInstituteForm.controls['instituteCode'].value.indexOf("ZIET") !=-1){
           this.childBussinessUnitTypeId=5
           this.childBussinessUnitTypeCode=this.addInstituteForm.controls['instituteCode'].value.split("/")[2];
      }

      var datas ={
        "username":this.addInstituteForm.controls['userName'].value,
        "email":this.addInstituteForm.controls['Email'].value,
        "firstname":'',
        "mobile":this.addInstituteForm.controls['Mobile'].value,
        "parentuser": this.loginUserNameForChild,
        "businessUnitTypeId":this.childBussinessUnitTypeId,
        "businessUnitTypeCode":this.childBussinessUnitTypeCode,
       }

       this.outSideService.createInstitutionUser(datas,this.loginUserNameForChild).subscribe(res => {
        console.log(res)
        if(res['success']){
          Swal.fire({
        'icon':'success',
        'text':res['message']
      })
      this.router.navigate(['/teacher/userMaster'])
      }
      if(!res['success']){
        Swal.fire({
      'icon':'error',
      'text':res['errorMessage']
       })
        }
       },
       error => { 
        Swal.fire({
          'icon':'error',
           'text':'You are not Authorized.'
        })
       });
    }
  }
  }
}


