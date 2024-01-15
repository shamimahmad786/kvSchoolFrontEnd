import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { CustomValidator } from 'src/app/utilities/validations/validate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit,OnDestroy{
  schoolForm: FormGroup;
  isSubmitted: boolean = false;
  isEdit: boolean=false;
  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}];
  shiftList=[{'value':'0','type':'Not Applicable'},{'value':'1','type':'First Shift'},{'value':'2','type':'Second Shift'}];
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }

  ngOnInit(): void {
    this.buildSchoolForm();
    if(sessionStorage.getItem('schoolEdit')!=null){
      this.isEdit=true;
      let data= JSON.parse(sessionStorage.getItem('schoolEdit'));
      this.updateData(data);
    }
  }
  buildSchoolForm(){
    this.schoolForm = this.fb.group({
      schoolCode: ['', [Validators.required,Validators.pattern(/^[1-9][0-9]{3}$/)]],
      schoolName: ['',[Validators.required,CustomValidator.IsTextSchool,Validators.minLength(3)]],
      schoolAddress:['',[Validators.required]],
      status:[true,[Validators.required]],
      schoolType:[''],
      shift:['',[Validators.required]],
      id:['']
    });
  }
  updateData(data){
    debugger
    this.schoolForm.patchValue(data);
    this.schoolForm.get('schoolCode').setValue(data.schoolcode);
    this.schoolForm.get('schoolName').setValue(data.schoolname);
    this.schoolForm.get('schoolType').setValue(data.schooltype);
    if(data.shiftType=='Not Applicable'){
      this.schoolForm.get('shift').setValue('0');
    }
    if(data.shiftType=='First Shift'){
      this.schoolForm.get('shift').setValue('1');
    }
    if(data.shiftType=='Second Shift'){
      this.schoolForm.get('shift').setValue('2');
    } 
    this.schoolForm.get('schoolAddress').setValue(data.schooladdress);
    this.schoolForm.get('schoolCode').disable();
  }

  submit(){
    debugger
    if (this.schoolForm.invalid) {
      this.isSubmitted = true;
     this.schoolForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.schoolForm.getRawValue();
      // alert(JSON.stringify(payload));
      debugger
      // schoolType:payload.schoolType,
      let request={
        schoolCode: payload.schoolCode,
        schoolName: payload.schoolName,
        status:payload.status,
        shift:payload.shift,
        schoolAddress:payload.schoolAddress,
        schoolType:1,
        id:payload.id
      }

      

      if(this.isEdit){
            
        this.outSideService.editSchoolMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'School Updated Successfully!',
              '',
              'success'
            )
           this.redirectToList();
          }
        },
        error => {
          console.log(error);
          Swal.fire({
            'icon':'error',
             'text':error.error.message
          }
          )
        })
      }else{
        this.outSideService.addSchoolMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'New School Added Successfully!',
              '',
              'success'
            )
            this.router.navigate(['/teacher/schoolMaster']);
          }
        },
        error => {
          console.log(error);
          Swal.fire({
            'icon':'error',
             'text':error.error
          }
          )
        })
      }
    }
  }
  redirectToList(){
    sessionStorage.removeItem('schoolEdit');
    this.router.navigate(['/teacher/schoolMaster']);
  }
  clear(){
    this.buildSchoolForm();
    this.isSubmitted=false;
    this.schoolForm.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.schoolForm.controls[controlName].hasError(errorName);
  }
  ngOnDestroy(){
    sessionStorage.removeItem('schoolEdit');
  }
}
