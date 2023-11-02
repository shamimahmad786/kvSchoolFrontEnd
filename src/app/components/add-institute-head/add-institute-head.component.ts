import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
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
  childBussinessUnitTypeId:any;
  businessUnitTypeCode:any;
  constructor(private outSideService: OutsideServicesService,private router: Router) { }

  ngOnInit(): void {
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
        'firstname': new FormControl('', Validators.required),
        'Email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        'Mobile': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[8976][0-9]{9}")]),
      });
    }
    else{
      this.addInstituteForm = new FormGroup({
        'instituteType': new FormControl('', Validators.required),
        'instituteCode': new FormControl('', Validators.required),
        'firstname': new FormControl('', Validators.required),
        'userName': new FormControl('', Validators.required),
        'Email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        'Mobile': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[8976][0-9]{9}")]),
      });
    }
  if(this.businessUnitTypeId=="2"){
    this.instituteType=[{
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
}
  get f() { return this.addInstituteForm.controls; }
  //***************** Get Region*******************************************/
  getStationByRegionId(event:any){
    console.log(event.target.value)

  if(event.target.value=="3" || event.target.value=="2"){
  this.outSideService.fetchKvRegion(event.target.value).subscribe(res => {
    this.regionList = res.response.rowValue;
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
  if(event.target.value=="5" || event.target.value=="31"){

    if(event.target.value=="31"){
      this.schoolType="3";
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
  //***************** make User Name On Basis Of Station name*******************************************/
  getUserNameForInstitute(event:any){
    // alert(event);
      var instituteUserNameSplit = event.split("/")
      var instituteUserName ='ro_'+instituteUserNameSplit[1].toLowerCase();
      if(instituteUserName.indexOf('ziet') !=-1){
       var zietUserNameSplit= instituteUserName.split(" ");
       instituteUserName=zietUserNameSplit[0]+"_"+zietUserNameSplit[1];
      }
      this.addInstituteForm.patchValue({
        userName:instituteUserName,
      })
  }
  getUserNameForSchool(event:any){
    var schoolUserNameSplit = event.split("/")
    var schoolUserName ='kv_'+schoolUserNameSplit[0].toLowerCase();
    this.addInstituteForm.patchValue({
      userName:schoolUserName,
    })
  }
  onSubmit(){
    this.addInstituteFormubmitted=true
    if(this.businessUnitTypeId=="5"){
      var data ={
        "username":this.addInstituteForm.controls['userName'].value,
        "email":this.addInstituteForm.controls['Email'].value,
        "mobile":this.addInstituteForm.controls['Mobile'].value,
        "firstname":this.addInstituteForm.controls['firstname'].value,
        "parentuser": this.loginUserNameForChild,
        "businessUnitTypeId":this.childBussinessUnitTypeId,
        "businessUnitTypeCode":this.businessUnitTypeCode,
       }
    }
    else{
      var data ={
        "username":this.addInstituteForm.controls['userName'].value,
        "email":this.addInstituteForm.controls['Email'].value,
        "firstname":this.addInstituteForm.controls['firstname'].value,
        "mobile":this.addInstituteForm.controls['Mobile'].value,
        "parentuser": this.loginUserNameForChild,
        "businessUnitTypeId":this.addInstituteForm.controls['instituteType'].value,
        "businessUnitTypeCode":this.addInstituteForm.controls['instituteCode'].value,
       }
    }
       debugger   
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

  }

}
