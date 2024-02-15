import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/AuthService'
import { Router, ActivatedRoute } from '@angular/router';
import * as crypto from 'crypto-js';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
 import * as $ from 'jquery';
import { OutsideServicesService } from '../service/outside-services.service';
declare const encriptedText: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
   secretKey = "1111111111111111";
   changePasswordForm: FormGroup;
   changePasswordFormsubmitted= false;
   msg:any;
   captcharest:any;
   paramSessionId: any;
   paramUrlType:any;
   constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router, private auth :AuthService) { }
  ngOnInit(): void {
    this.generate()
      this.changePasswordForm = new FormGroup({
        'newPassword': new FormControl('', Validators.required),
        'confirmPassword': new FormControl('', Validators.required),
        'otpCaptcha': new FormControl('', Validators.required),
      });
      this.route.queryParams.subscribe(params => {
      this.paramSessionId = params['sessionId'];
      this.paramUrlType= params['type']
    });
     
    }
   get f() { return this.changePasswordForm.controls; }
  //********************************  Function use For Captcha genration   ******************************/
  generate() {
    let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    console.log(alphabets.length);
    let first = alphabets[Math.floor(Math.random() * alphabets.length)];
    let second = Math.floor(Math.random() * 10);
    let third = Math.floor(Math.random() * 10);
    let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
    let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
    let sixth = Math.floor(Math.random() * 10);
    this.captcharest = first.toString()+second.toString()+third.toString()+fourth.toString()+fifth.toString()+sixth.toString();
    const captchaText = <HTMLCanvasElement> document.getElementById('captchareset');
    var ctx = captchaText.getContext("2d");
    ctx.font = "bold 60px Courier";
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    ctx.fillText(this.captcharest, captchaText.width/6, captchaText.height/1.7);
    let output = document.getElementById('output');
    output.innerHTML = "";
    }
    onBlur(){
      this.msg='';
      if(this.changePasswordForm.controls['newPassword'].value!=this.changePasswordForm.controls['confirmPassword'].value){
        this.changePasswordForm.patchValue({
          newPassword: '',
          confirmPassword:'',
          otp:'',
          otpCaptcha:'',
        })
        this.generate();
        this.msg="New Password and Confirm Password are not same....";
        return;
      }
    }
  //********************************  Change Password and Reset Password Form Submit  ******************************/
  onSubmit() {
      this.changePasswordFormsubmitted = true;
      this.msg='';
      if (this.changePasswordForm.invalid) {
        this.generate();
        return;
    }
    if(this.changePasswordForm.controls['newPassword'].value!=this.changePasswordForm.controls['confirmPassword'].value){
      this.changePasswordForm.patchValue({
        newPassword: '',
        confirmPassword:'',
        otp:'',
        otpCaptcha:'',
      })
      this.generate();
      this.msg="New Password and Confirm Password are not same....";
      return;
    }
    if (this.changePasswordForm.controls['otpCaptcha'].value != this.captcharest ) {
       this.changePasswordForm.patchValue({
          otpCaptcha: '',
        })
        this.generate()
        return;
    }
    const key = crypto.enc.Utf8.parse(this.secretKey);
    const iv = crypto.enc.Utf8.parse(this.secretKey);
    var data = {"password":this.changePasswordForm.controls['confirmPassword'].value};
    var  encrypted = crypto.AES.encrypt(data.toString(), key, {
      keySize: 16,
      iv: iv,
      mode: crypto.mode.ECB,
      padding: crypto.pad.Pkcs7
     });

     if(this.paramUrlType!='' && this.paramUrlType=='cp')
     {
      this.auth.generatePassword(data,this.paramSessionId).subscribe((res) => {
        this.generate()
        console.log(JSON.stringify(res));
      if(res['success']){
        Swal.fire({
          'icon':'success',
          'text':'Password Created Successfully.'
        })
          this.router.navigate(['/mainPage']); 
      }
      if(!res['success']){
        Swal.fire({
          'icon':'error',
          'text':res['message']
        })
      }
        },
        error => { 
          this.generate()
          Swal.fire({
            'icon':'error',
            'text':'You are not Authorized.'
          })
      });
     }
    else{
      this.auth.resetPassword(data,this.paramSessionId).subscribe((res) => {
        this.generate()

        if(res['status']=="1"){
          Swal.fire({
            'icon':'success',
            'text':'Password Changed Successfully.'
          })
            this.router.navigate(['/mainPage']); 
        }
        if(res['status']=="0"){
          Swal.fire({
            'icon':'error',
            'text':res['message']
          })
        }
        },
        error => { 
          this.generate()
          Swal.fire({
            'icon':'error',
            'text':'You are not Authorized.'
          })
      });
    }
  }
}
