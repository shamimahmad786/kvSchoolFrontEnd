import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
var md5 = require('md5');

export class AuthInterceptorService implements HttpInterceptor {
    x_headers: any;
    typeCheck: any;

    intercept(req: HttpRequest<any>, next: HttpHandler) {

    // alert(req.url);
     var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
     console.log(token)
     if(req.url.indexOf('api') !== -1){
    if (JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token != undefined && JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token != undefined) {
        let modifiedReq     
        if(req.url.indexOf('uploadDocument') !== -1 || req.url.indexOf('uploadDoc') !== -1){
             modifiedReq = req.clone(
                {
                    setHeaders: {
                        'Authorization': token,
                     'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name
                    }
                });
        }    else{
            if(typeof(req.body) =="object"){
                this.typeCheck='1';
                this.x_headers=md5(JSON.stringify(req.body));
            }else{
                this.typeCheck='0';
                this.x_headers=md5(req.body);  

            }
             
             modifiedReq = req.clone(
                {
                    setHeaders: {
                        'Content-Type': (req.url.indexOf('unee-api/v1') !==-1)?'application/json; charset=utf-8':'text/plain; charset=utf-8',
                        'loginType':'s',
                        'X-HEADERS':this.x_headers,
                        'TYPE-CHECK':this.typeCheck,
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
        if(req.url.indexOf('sign-in') !== -1 || req.url.indexOf('getkvsDashboardReport') !== -1 ||  req.url.indexOf('assets') !== -1 ||  req.url.indexOf('restPassword') !== -1 ||  req.url.indexOf('changePassword') !== -1  || req.url.indexOf('generatePassword') !== -1 || req.url.indexOf('forgetPasswordMail') !== -1 || req.url.indexOf('getOtpForAuthentication') !== -1 || req.url.indexOf('otpSignin') !== -1 ){
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
     
        // if (JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token != undefined) {
        //     if (req.url.indexOf('getProfileImage') !== -1 || req.url.indexOf('uploadProfileImage') !== -1 || req.url.indexOf('deleteDocumentByTeacherIdAndName') !== -1 ||
        //         req.url.indexOf('getDocumentByTeacherId') !== -1 || req.url.indexOf('uploadDocument') !== -1 || req.url.indexOf('create-kvuser') !== -1
        //         || req.url.indexOf('get-usercradential') !== -1 || req.url.indexOf('renamePassword') !== -1 || req.url.indexOf('getKey') !== -1 || req.url.indexOf('translate') !== -1) {

        //         if (req.url.indexOf('create-kvuser') !== -1) {
        //             const modifiedReq = req.clone(
        //                 {
        //                     setHeaders: {
        //                         'Content-Type': 'text/plain; charset=utf-8',
        //                         'loginType':'s',
        //                         'systemTeacherCode':sessionStorage.systemTeacherCode,
        //                         'Authorization': token,
        //                      'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name
        //                     }
        //                 });
        //             return next.handle(modifiedReq).pipe(
        //                 (
        //                     catchError((error: HttpErrorResponse) => {
        //                         let msg = '';
        //                         return throwError(error);
        //                     })
        //                 ))
        //         }

        //         if (req.url.indexOf('uploadProfileImage') !== -1 || req.url.indexOf('getProfileImage') !== -1 || 
        //         req.url.indexOf('getDocumentByTeacherId') !== -1 || req.url.indexOf('uploadDocument') !== -1
        //             || req.url.indexOf('deleteDocumentByTeacherIdAndName') !== -1) {
        //             const modifiedReq = req.clone(
        //                 {
        //                     setHeaders: {
        //                         'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name,
        //                         'loginType':'s',
        //                         'Authorization': token
        //                     }
        //                 });
        //             return next.handle(modifiedReq).pipe(
        //                 (
        //                     catchError((error: HttpErrorResponse) => {
        //                         let msg = '';
        //                         return throwError(error);
        //                     })
        //                 ))
                        
        //         }
                
            

        //         return next.handle(req).pipe(
        //             (
        //                 catchError((error: HttpErrorResponse) => {
        //                     let msg = '';
        //                     return throwError(error);
        //                 })
        //             ))
        //     } else if( req.url.indexOf("uploadDocument") !== -1 || req.url.indexOf("saveTeacherConfirmationV2") !== -1 || req.url.indexOf("deleteDocumentByTeacherIdAndName") !== -1  || req.url.indexOf("saveTeacher") !== -1 ||  req.url.indexOf("updatdFlag")  !== -1 || req.url.indexOf("saveTransProfile")  !== -1 ){
        //         var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
        //          const modifiedReq = req.clone(
        //              {
        //                  setHeaders: {
        //                     'Authorization': token,
        //                      'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name,
        //                      'loginType':'s',
        //                      'Content-Type': (req.url.indexOf('unee-api/v1') !==-1)?'application/json; charset=utf-8':'text/plain; charset=utf-8',
        //                  }
        //              });
        //          return next.handle(modifiedReq).pipe(
        //              (
        //                  catchError((error: HttpErrorResponse) => {
        //                      let msg = '';
        //                      return throwError(error);
        //                  })
        //              ))  
        //      } else {
        //         var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
        //         const modifiedReq = req.clone(
        //             {
        //                 setHeaders: {
        //                     'Authorization': token,
        //                     'Content-Type': (req.url.indexOf('unee-api/v1') !==-1)?'application/json; charset=utf-8':'text/plain; charset=utf-8',
        //                      'loginType':'s',
        //                     'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name
        //                 }
        //             });


                    
        //         return next.handle(modifiedReq).pipe(
        //             map((event: HttpEvent<any>) => {
        //                 if (event instanceof HttpResponse) {
        //                     if (event.body.errorMessage == "User Unauthenticated") {

        //                         sessionStorage.removeItem('authTeacherDetails')
        //                         sessionStorage.removeItem('mappingData')
        //                         sessionStorage.removeItem('shiftYn')
        //                         sessionStorage.removeItem('shiftAvailable')
        //                         sessionStorage.removeItem('singleKvTeacher')
        //                         sessionStorage.removeItem('systemTeacherCode')
        //                         window.location.href = environment.LOGOUT_URL;
        //                         alert("User Not Authenticated (Login Again)")
        //                         return null;
        //                     }
        //                 }
        //                 return event;
        //             }),
        //             (
        //                 catchError((error: HttpErrorResponse) => {
        //                     let msg = '';
        //                     return throwError(error);
        //                 })
        //             ))
        //     }
        // } else {
        //     debugger;
        //     if (req.url.indexOf('getkvsDashboardReport') !== -1   || req.url.indexOf('translate') !== -1 || req.url.indexOf('getStationByRegion') !== -1 || req.url.indexOf('getReportData') !== -1 || 
        //     req.url.indexOf('getKVRegion') !== -1 || req.url.indexOf('getSchoolByStation') !== -1) {

        //         const modifiedReq = req.clone(
        //             {
        //                 setHeaders: {
        //                     // 'Authorization': token,
        //                     //  'username': JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name,
        //                     'Content-Type': 'text/plain; charset=utf-8',
        //                     // 'username': 'XYZ',
        //                     // 'systemTeacherCode':sessionStorage.systemTeacherCode,
        //                     // 'loginType':'s',
        //                 }
        //             });
        //             // alert("before modify request")
        //         return next.handle(modifiedReq);

        //     }else if(req.url.indexOf('sign-in') !== -1){
        //         return next.handle(req);
        //     } else if (req.url.indexOf('1') !== -1) {
        //         return next.handle(req).pipe(
        //             (
        //                 catchError((error: HttpErrorResponse) => {
        //                     let msg = '';
        //                     return throwError(error);
        //                 })
        //             ))
        //     }

        //     else {

        //         sessionStorage.removeItem('authTeacherDetails')
        //         sessionStorage.removeItem('mappingData')
        //         sessionStorage.removeItem('shiftYn')
        //         sessionStorage.removeItem('shiftAvailable')
        //         sessionStorage.removeItem('singleKvTeacher')
        //         sessionStorage.removeItem('systemTeacherCode')
        //         window.location.href = environment.LOGOUT_URL;

        //     }

        // }


    }
}