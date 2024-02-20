import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
var md5 = require('md5');

export class AuthInterceptorService implements HttpInterceptor {
 

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      var  x_headers;
    var    typeCheck;
    debugger;
     var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
     console.log(token)

     if(req.url.indexOf('api') !== -1){
    if (JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token != undefined) {
        let modifiedReq     
        if(req.url.indexOf('uploadDocument') !== -1 || req.url.indexOf('uploadDoc') !== -1 ||  req.url.indexOf('getTeacherBasicDetailPdf') !== -1 || req.url.indexOf('fileUpload') !== -1){
             modifiedReq = req.clone(
                {
                    setHeaders: {
                        'Authorization': token,
                     'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name
                    }
                });
        }    else{
            if(typeof(req.body) =="object"){
                typeCheck='1';
               x_headers=md5(JSON.stringify(req.body));
            }else{
                typeCheck='0';
               x_headers=md5(req.body);  

            }
             
             modifiedReq = req.clone(
                {
                    setHeaders: {
                        'Content-Type': (req.url.indexOf('unee-api/v1') !==-1)?'application/json; charset=utf-8':'text/plain; charset=utf-8',
                        'loginType':'s',
                        'X-HEADERS':x_headers,
                        'TYPE-CHECK':typeCheck,
                        // 'systemTeacherCode':sessionStorage.systemTeacherCode,
                        'Authorization': token,
                     'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name
                    }
                });
        }        
 
                        return next.handle(modifiedReq).pipe(
                            (
                                catchError((error: HttpErrorResponse) => {
                                    let msg = '';
                                    return throwError(error);
                                })
                            ))   
     }else{
        if(req.url.indexOf('sign-in') !== -1 || req.url.indexOf('getkvsDashboardReport') !== -1 ||  req.url.indexOf('assets') !== -1 ||  req.url.indexOf('restPassword') !== -1 ||  req.url.indexOf('changePassword') !== -1  || req.url.indexOf('generatePassword') !== -1 || req.url.indexOf('forgetPasswordMail') !== -1 || req.url.indexOf('getOtpForAuthentication') !== -1 || req.url.indexOf('otpSignin') !== -1 || req.url.indexOf('getTeacherBasicDetailPdf') !== -1 ){
                    return next.handle(req);
       
        }else{
                sessionStorage.removeItem('authTeacherDetails')
                sessionStorage.removeItem('mappingData')
                sessionStorage.removeItem('shiftYn')
                sessionStorage.removeItem('shiftAvailable')
                sessionStorage.removeItem('singleKvTeacher')
                sessionStorage.removeItem('systemTeacherCode')
                // window.location.href = environment.LOGOUT_URL;
                window.location.href = "http://localhost:4200";
        }
     }
    }else{
        return next.handle(req);
    }
     
       
    }
}