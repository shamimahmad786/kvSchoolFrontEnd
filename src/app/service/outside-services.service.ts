import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Response } from 'src/app/beans/response';
// import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutsideServicesService {

  constructor(private _http: HttpClient) { }

  fetchTeacherByTeacherId(data){
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "getTeacherByTeacherId", data, {headers})
  }

  fetchSpouseByEmpCode(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });    
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getSpouseByEmpCode", data, {headers})
  }

  getTeacherBySchool(udise_code: any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    // let url = environment.BASE_URL_DATA + "getTeacherBySchool/" + JSON.stringify(udise_code);
    // return this._http.post(url);    
    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherBySchool",udise_code, {headers});
  }

  saveSingleTeacher(data: any): Observable<Response> {
    debugger
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "saveProfileV2", data, {headers});
  }
  

  fileUpload(data: any){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token
      // 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',

    });
    return this._http.post<any>(environment.BASE_URL_FILE_MANAGEMENT + "fileUpload", data, {headers});
  }

  
  
  getTransferProfileBySchool(data: any){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURPLUS_TRANSFER + "getTransferProfileBySchool", data, {headers});
  }

  getUploadedDocument(){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_FILE_MANAGEMENT + "getUploadedDocument", {headers});
  }
  downloadUploadDocumentById(data:any){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_FILE_MANAGEMENT + "downloadUploadDocumentById",data, {headers});
  }


  getTransferStationByEmployee(data)
  {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferStationByEmployee", data, { headers })
  }
  getSpouseDetailsV2(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getSpouseDetailsV2", data, { headers });
  }

  saveTeacherConfirmationV2(data: any): Observable<Response>{
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "saveTeacherConfirmationV2", data, {headers});
  }

  getTeacherConfirmationV2(data: any){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherConfirmationV2", data, {headers});
  }

  getMasterDataByStateCode(data: any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getMaster", data);
  }


  getMasterData(data: any): Observable<Response> {
    // alert("call for get master");
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getMaster", data);
  }

  getVerified(data: any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "verifyTeacher", data, {headers});
  }

  saveCustomQues(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_QUESTION+ "saveQuestion", data, {headers})
  }

  getCustomQues(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_QUESTION+ "getAllQuestionByBusinessUnit", data, {headers})
  }

  saveSurveyMaster(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY+ "saveSurveyMaster", data, {headers})
  }

  getSurveyMasterList(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY+ "getSurveyMasterBySchCode", data, {headers})
  }

  saveSurveyMstQues(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY+ "saveSurveyMasterQues", data, {headers})
  }

  getSurveyMstQues(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY+ "getSurveyMasterQues", data, {headers});
  }

  removeSurveyMstQuesBySurveyId(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY+ "deleteSurveyMasterQues", data, {headers})
  }

  saveKvTeacher(data: any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "saveTeacher", data, {headers});
  }

  fetchKvTeacherByKvCode(data: any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getKvTeacherByKvCode", data, {headers})
  }
  getDroboxMaster(){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DROPED_BOX+ "getDroboxMaster", {headers})
  }

  searchEmployee(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "searchEmployee",data, {headers})
  }

  searchEmployeeForImport(data:any){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DROPED_BOX+ "searchEmployeeForImport",data, {headers})
  }

  getReportByID(data: any): Observable<any> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_DASHBOARD + "getReportById", data, {headers})
  }


  getEmployeetransferDetails(data: any): Observable<Response> { 
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferINByKvCode", data, {headers})
  }
  sendEmplooyeeJoiningDate(data: any): Observable<Response> { 
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "updateTransferINByKvCode", data, {headers})
  }
  sendEmplooyeeRelevingDate(data: any): Observable<Response> { 
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "updateTransferOutByKvCode", data, {headers})
  }

  getKvTeacherByUdiseCode(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getKvTeacherByUdiseCode", data, {headers})
  } 


  getDropedEmployeeByKvCode(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DROPED_BOX + "getDropedEmployeeByKvCode", data, {headers})
  }
  dropEmployeeToDropbox(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DROPED_BOX + "dropEmployeeToDropbox", data, {headers})
  }
  importEmployeeFromDropbox(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DROPED_BOX + "importEmployeeFromDropbox", data, {headers})
  }


  revokeEmployeeFromDropbox(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DROPED_BOX + "revokeEmployeeFromDropbox", data, {headers})
  }




  fetchAllMaster(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getAllMaster", data, {headers})
  }

  fetchKvSchoolDetails(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getSchoolDetailsByKVCode", data, {headers})
  }

  fetchKvSubjectListByTchType(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getSubjectByTeacherTypeId", data, {headers})
  }

  saveTchExperience(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_EXPERIENCE+ "saveExperience", data, {headers})
  }

  saveWorkExperienceV2(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_EXPERIENCE+ "saveWorkExperienceV2", data, {headers})
  }

  
  fetchTchExpByTchId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_EXPERIENCE+ "getExperienceByTeacherIdV2", data, {headers})
  }

  getTeacherLeaveMaster(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_LEAVE_MANAGEMENT+ "getTeacherLeaveMaster", data, {headers})
  }



  saveTeacherLeave(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_LEAVE_MANAGEMENT+ "saveTeacherLeave", data, {headers})
  }

  deleteTeacherLeave(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_LEAVE_MANAGEMENT+ "deleteTeacherLeave", data, {headers})
  }
  fetchPromotionByTchId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_PROMOTION+ "getPromotionByTeacherId", data, {headers})
  }

  savePromotion(data){    
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_PROMOTION+ "savePromotion", data, {headers})
  }

  fetchQualByType(data){    
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getQualificationByType", data, {headers})
  }

  fetchSubByQual(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getSubjectByQualification", data, {headers})
  }

  saveTchAcadQual(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "saveEducationalQualification", data, {headers})
  }

  saveTchProfQual(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "saveProfessionalQualification", data, {headers})
  }

  fetchAcdQual(data){    
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "getEducationalQualificationByTeacherId", data, {headers})
  }

  fetchProfQual(data){  
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });  
    
    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "getProfesionalQualificationByTeacherId", data, {headers})
  }

  saveAwards(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "saveAwards", data, {headers})
  }

  fetchAwardsByTchId(data){   
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    }); 
    
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "getAwardsByTeacherId", data, {headers})
  }

  fetchAwardsList(data){    
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getAwards",data, {headers})
  }

  saveTraining(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "saveTraning", data, {headers})
  }

  fetchTrainingList(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "getTraningByTeacherId", data, {headers})
  }

  fetchStateMaster(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getState", data, {headers})
  }

  fetchDistrictByStateId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getDistrictByStateId", data, {headers})
  }
  getTransferRegionByEmployee(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferRegionByEmployee", data, { headers })
  }
  fetchTchDuplicateMobile(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherDublicateMobile", data, {headers})
  }

  createUserOnVerify(data){
    
    // return this._http.post<any>('https://pgi.udiseplus.gov.in/UserService/api/user/create-kvuser', data)
    // return this._http.post<any>('https://kvsdemo.udiseplus.gov.in/UserService/api/user/create-kvuser', data)
    return this._http.post<any>(environment.LOGIN_URL_JWT + "createKvUser", data)
  }

  fetchCorrectionInitiatedDetails(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherProfileQueryInitiate", data, {headers})

  }

  fetchKvRegion(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getKVRegions", data, {headers})
  }

  fetchStationByRegionId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    // return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getMaster", data, {headers})
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-station-by-region", data, {headers})
  }

  fetchKvSchoolByStationCode(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getSchoolByStation", data, {headers})
  }

  updateSysTchCode(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "updateTeacherSystemGeneratedCode", data, {headers})
  }

  deleteExpByWorkExpId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_EXPERIENCE+ "deleteByWorkExperienceId", data, {headers})
  }

  updateFlagByTeacherId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "updateFlagByTeachId", data, {headers})

  }
  sentReport(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    
    return this._http.post<any>(environment.BASE_URL_REPORT + "sentReport", data, {headers})
  }

  getUpdatedFlag(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getUpdatdFlag", data, {headers})
  }

  getFormStatusV2(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getFormStatusV2", data, { headers });
  }

deteleEducationalQualification(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
  return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "deteleEducationalQualification", data, {headers})
}
deleteProfessionalQualification(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "deleteProfessionalQualification", data, {headers})
}
deletePromotion(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
    return this._http.post<any>(environment.BASE_URL_DATA_PROMOTION+ "deletePromotion", data, {headers})
}
deleteByWorkExperienceId(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "deleteByWorkExperienceId", data, {headers})
}
deleteAwards(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "deleteAwards", data, {headers})
}
deleteTraning(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "deleteTraning", data, {headers})
}

fetchDashboardData(data){  

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });  
    return this._http.post<any>(environment.BASE_URL_DATA_DASHBOARD+ "getDashboard", data, {headers})

}
getRoDashboard(data,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
    'username':userName,
  });  
  return this._http.post<any>(environment.BASE_URL_DATA_DASHBOARD+ "getRoDashboard", data, {headers})
}

checkEmployeeCodeByEmpCode(data){
  

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });  
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "checkEmployeeCode", data, {headers})

}

dropTeacherBySchoolByTchId(data){
  

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "dropTeacherBySchool", data, {headers})
}

getOutboxTeacherByUdisecode(data){
  
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "getOutboxTeacherByUdisecode", data, {headers})
}

changeTeacherSchool(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "changeTeacherSchool", data, {headers})
}



fetchConfirmedTchDetails(data){

    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "getConfirmedTeacherDetailsV2", data, {headers})

}



fetchInitiatedTransferByUdisecode(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "getInitiatedTransferByUdisecode", data, {headers})

}

fetchTransferBasicProfileByTchId(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });    
  
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferBasicProfileByTeacherId", data, {headers})

}

fetchUploadedDoc(data){
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "getDocumentByTeacherId", data)
}

saveInitiatedTeacherTransfer(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });    
  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "transfer/saveTransferDCTCPoints", data, {headers})
}

fetchInitiateTeacherTransfer(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });    
  
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getInitiateTeacherTransfer", data, {headers})
}

initiateTeacherTransfer(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });    
  
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "initiateTeacherTransfer", data, {headers})
}


fetchSchoolPreferenceByStationCode(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });    

return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getSchoolByMultipleStation", data, {headers})
}


deleteUploadedDoc(data){

  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "deleteDocumentByTeacherIdAndName", data)

}

uploadDocument(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "uploadDocument",  data,{headers});
}

getTcDcPointByTeacherIdAndInityear(data) {
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization': token,
    'Content-Type': 'text/plain; charset=utf-8',

  });
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER_V2 + "getTcDcPointByTeacherIdAndInityear", data, { headers });
}

getTransferId(data) {
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization': token,
    'Content-Type': 'text/plain; charset=utf-8',

  });
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferId", data, { headers });
}

getPDF(data) {
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization': token,
    // 'Content-Type': 'text/plain; charset=utf-8',

  });
  return this._http.post<any>(environment.BASE_URL_DATA_REPORT + "getTeacherBasicDetailPdf", data, { headers });
}

resetPassword(data){
  debugger
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  // return this._http.post<any>('http://10.25.26.251:8090/meuser/api/user/', data);
  
  return this._http.post<any>(environment.LOGIN_URL_JWT + "resetPassword", data,{headers})

  // return this._http.post<any>('https://pgi.udiseplus.gov.in/UserService/api/user/resetPassword', data);
  // return this._http.post<any>('https://kvsdemo.udiseplus.gov.in/UserService/api/user/resetPassword', data);
}

resetTeacherById(data){
  
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  // return this._http.post<any>('http://10.25.26.251:8090/meuser/api/user/', data);
  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+"resetProfileV2" , data,{headers});

  // return this._http.post<any>('https://pgi.udiseplus.gov.in/UserService/api/user/resetPassword', data);
  // return this._http.post<any>('https://kvsdemo.udiseplus.gov.in/UserService/api/user/resetPassword', data);
}


getUniversalSurplus(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_SURPLUS_TRANSFER+ "getUniversalSurplus", data, {headers});
}


saveSurplusDataBySchool(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_SURPLUS_TRANSFER+ "saveSurplusDataBySchool", data, {headers});
}

updateFormStatusFlag(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });    

  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "updatdFlag", data, {headers})

}

fetchTransferRegion(data){
  
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getTransferRegion", data, {headers})
}

fetchTransferStation(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getTransferStation", data, {headers})
}


// 10.25.26.251:8014/api/dashboard/getDashboardBasicCountDetails
dashboardReportData(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_DASHBOARD+ "getDashboardBasicCountDetails", data, {headers})
}



getDashboardOnMoreClick(data){    
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_DASHBOARD + "getDashboardOnMoreClick",data,{headers})
}

getProfileImage(data){
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "getProfileImage", data)
}

deleteInitiatedTeacherTransfer(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "resetTransfer",data,{headers})


}

fetchIntraStationSchool(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getMaster", data, {headers})

}

fetchSanctionedData(data){
  // http://10.25.26.251:8014/api/transfer
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "sanction/getSanctionData", data, {headers})
}

saveSanctionedFormData(data){
  // http://10.25.26.251:8014/api/transfer/sanction/saveSanctionData
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "sanction/saveSanctionData", data, {headers})
}



getMainDashboard(){
  return this._http.get<any>(environment.BASE_URL_DATA_MASTER+ "getMaster1/1")
}


// New Uploaded Service By abhinesh

saveTransProfile(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',

  });
  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "saveTransProfile", data, {headers});
}

saveStationChoice(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',

  });
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "saveStationChoice", data, {headers});
} 

getTransferData(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',

  });
  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "getTransProfile", data, {headers});
}

getTransferData1(data) {
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization': token,
    'Content-Type': 'text/plain; charset=utf-8',

  });

  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "getTransProfileV2", data, { headers });
}

getTransferDataMiscelenius(data) {
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization': token,
    'Content-Type': 'text/plain; charset=utf-8',

  });

  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "getTransProfileV2", data, { headers });
}

saveTransferDCTCPoints(data) {
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization': token,
    'Content-Type': 'text/plain; charset=utf-8',

  });

  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "transfer/saveTransferDCTCPoints", data, { headers });
}
saveTransferConfirmation(data) {
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization': token,
    'Content-Type': 'text/plain; charset=utf-8',

  });
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFERPROCESS + "saveTransferConfirmation", data, { headers });
}
confirmTransferBySchool(data) {
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization': token,
    'Content-Type': 'text/plain; charset=utf-8',

  });
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFERPROCESS + "confirmTransferBySchool", data, { headers });
}
//  Unicoff

addRegionMaster(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-region", data, {headers})

}
editRegionMaster(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-region", data, {headers})

}
addStationMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-station", data, {headers})

}
editStationMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-station", data, {headers})

}
addStationCategoryMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-station-category", data, {headers})

}
editStationCategoryMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-station-category", data, {headers})

}
addSchoolMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-school", data, {headers})

}
editSchoolMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-school", data, {headers})

}
addRegionStationMapping(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "save/region-stations", data, {headers})

}
addStationCategoryMapping(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "save/station-category", data, {headers})

}
addSchoolStationMapping(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "save/schools-station", data, {headers})

}
fetchRegionList(){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-region", {headers})

}
fetchStationList(data,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
    'username':userName,
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-station", data, {headers})

}

fetchReportList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_DASHBOARD+ "getListOfReport", data, {headers})

}


getSchoolStationHistory(data,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
    'username':userName,
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/get-school-station-histor", data, {headers})
}
checkPasswordChanged(data)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.LOGIN_URL_JWT+ "checkPasswordChanged", data, {headers})
}

fetchUnmappedStationList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-unmaped-station", data, {headers})

}



fetchSchoolList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-school", data, {headers})
}
fetchSchoolUnmappedList(data,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
    'username':userName,
  }); 
  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-unmapped-school", data, {headers})
}


fetchStationCategoryList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-category", data, {headers})
}
searchRegionStationMList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/region-station-mapping-list", data, {headers})
}

getSchoolListByRegion(data,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
    'username':userName,
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_REPORTCONTROLER+ "getSchoolListByRegion", data, {headers})
}
getStationSchoolCountByRegion(data,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
    'username':userName,
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_REPORTCONTROLER+ "getStationSchoolCountByRegion", data, {headers})
}

getStationWiseSchoolCount(data,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
    'username':userName,
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_REPORTCONTROLER+ "getStationWiseSchoolCount", data, {headers})
}




searchStationCategoryMList(data,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
    'username':userName,
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/all-station-category-mapping-list", data, {headers})
}

searchSchoolStationMList(data,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
    'username':userName,
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/get-all-school-station-list", data, {headers})
}

getAllSchoolStationlistbyRegion(data,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
    'username':userName,
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/get-all-school-station-list-by-region", data, {headers})
}

getEmployeeDetailV2(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "getEmployeeDetailV2", data, {headers})
}


addStaffTypeMaster(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-staff-type", data, {headers})

}
fetchStaffTypeList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-staff-type", data, {headers})
}
editStaffTypeMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-staff-type", data, {headers})

}
addDesignationMaster(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-designation", data, {headers})

}
fetchDesignationList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-designations", data, {headers})
}
editDesignationMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-designation", data, {headers})

}
addSubjectMaster(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-subject", data, {headers})

}
fetchSubjectList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-subjects", data, {headers})
}
editSubjectMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-subject", data, {headers})
}
addStaffTypePostMapping(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "save/staff-type-post", data, {headers})

}
fetchStaffTypePostMapping(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/staff-type-post-mapping-list", data, {headers})

}
addSubjectPostMapping(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "master/save-post-subject", data, {headers})

}
getTicketByInstitute(data){
  debugger
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "getTicketByInstitute",  data,{headers});
}
uploadTicketDocument(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "uploadTicketDocument",  data,{headers});
}
uploadXlxDocument(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_FILETRANSFER + "uploadDoc",  data,{headers});
}
getTempTransferData(){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_FILETRANSFER + "getTempTransferData",{headers});
}
confirmTransferData(){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_FILETRANSFER + "confirmTransferData",{headers});
}
cleanUploadedExcel(){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_FILETRANSFER + "cleanUploadedExcel",{headers});
}

getDocumentByFolderId(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "getDocumentByFolderId",  data,{headers});
}
deleteTicketDocument(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "deleteTicketDocument",  data,{headers});
}
getInitiatedTicketByTicketId(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "getInitiatedTicketByTicketId",  data,{headers});
}

downloadDocument(folderId: string, fileName: string): Observable<Blob> {
  var baseUrl = environment.BASE_URL_DATA_API_TICKET;
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
  const url = `${baseUrl}downloadDocument?folderId=${folderId}&fileName=${fileName}`;
  return this._http.get(url, { responseType: 'blob' });
}

initiateTicket(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "initiateTicket",  data,{headers});
}
resolveTicketByTicketId(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "resolveTicketByTicketId",  data,{headers});
}
assignTicketTo(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
  }); 
    return this._http.post<any>(environment.BASE_URL_DATA_API_TICKET + "assignTicketTo",  data,{headers});
}
// fetchSubjectPostMapping(data){

//   var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
//   var headers = new HttpHeaders({
//     'Authorization':token,
//     'Content-Type': 'text/plain; charset=utf-8',
//   }); 

//   return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "master/fetch-post-subject-mapping-list", data, {headers})

// }
fetchSubjectPostMapping(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "master/fetch-post-subject-mapping-list-with-staff-details", data, {headers})

}
fetchSanctionPostList(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch-list-of-school-sanctioned-post", data, {headers})

}

schoolCodeExistOrNot(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "school-code-exist-in-sanctioned-post", data, {headers})

}
saveSanctionedData(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-school-sanctioned-post-v2", data, {headers})

}
updateSanctionedData(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-school-sanctioned-post-detail", data, {headers})
}

getMasterDetail(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "list-of-all-master-edit-allowed", data, {headers})
}
updateMasterDetail(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-master-edit-allowed", data, {headers})
}
//download report
downloadExcel(data,url){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "excel/report/"+url,data,{responseType: 'blob'})
}

downloadPdf(data,url){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "pdf/download/"+url,data,{responseType: 'blob'})
}
getkvsDashboardReport(){
  return this._http.post<any>(environment.BASE_URL_DATA_DASHBOARD+ "getkvsDashboardReport","")
}

getSubjectByPost(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "getSubjectByPost",data,{headers})
}

fetchSanctionPost(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "fetchSanctionPost",data,{headers})
}

getStationCategoryByRegion(data,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
    'username':userName,
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "fetch/get-station-category-by-region",data,{headers})
}

freezeSanctionPost(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "freeze-sanction-post",data,{headers})
}
updateFreezeMaster(data:any)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "freeze-master",data,{headers})
}

getFreezeMaster(data:any)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "fetch/get-freeze-master","",{headers})
}
fetchFreezeStatus(data:any)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "fetch/get-freeze-master-by-id",data,{headers})
}
fetchTcDcData(data:any)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_TEACHER+ "transfer/getTeacherTransferDetails",data,{headers})
}
fetchAllSactionedPostMapping(data:any)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "fetch/school-region-mapping-list",data,{headers})
}

schoolTransferVerify(data:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_TRANSFER+ "schoolTransferVerify",data,{headers})
}
getChilduserList(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_USERMANAGEMENT+ "getChildUser",data,{headers})
}

childActiveDeactiveAction(data:any, userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_USERMANAGEMENT+ "updateUser",data,{headers})
}
createInstitutionUser(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.LOGIN_URL_JWT+ "createUsers",data,{headers})
}

getregionSchool(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_USERMAPPING+ "getRegionSchool",data,{headers})
}
getRegionSchoolEmployee(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_USERMAPPING+ "getRegionSchoolEmployee",data,{headers})
}
saveControllerOffice(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_KVCONTROLER+ "saveControllerOffice",data,{headers})
}
searchEmployeeForTransfer(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_TRANSFERPROCESS+ "searchEmployeeForTransfer",data,{headers})
}
getTransferGround(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER+ "getTransferGround",data,{headers})
}
adminTransfer(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_TRANSFERPROCESS+ "adminTransfer",data,{headers})
}

getModifiedTransferDetails(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_TRANSFERPROCESS+ "getModifiedTransferDetails",data,{headers})
}

transferModification(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_TRANSFERPROCESS+ "transferModification",data,{headers})
}


transferCancelation(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_TRANSFERPROCESS+ "transferCancelation",data,{headers})
}

getTransferedList(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_TRANSFERPROCESS+ "getTransferedList",data,{headers})
}

getControllerOffice(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_KVCONTROLER+ "getControllerOffice",data,{headers})
}
getControllerOfficeHistory(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_KVCONTROLER+ "getControllerOfficeHistory",data,{headers})
}
stationCategoryMappingListByStationCode(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  });
  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/station-category-mapping-list-by-station-code", data, {headers}) 
}
// exportToPdf(data:any){
//   var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
//   var headers = new HttpHeaders({
//     'Authorization':token,
//     'Content-Type': 'text/plain; charset=utf-8',
//   }); 
//   return this._http.get(environment.BASE_URL_REPORT+ "sentReport",data,{headers})
// }

unlockEmloyee(data:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.LOGIN_URL_JWT+ "correctPassword",data,{headers})
}
schoolResetPassword(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  // return this._http.post<any>('http://10.25.26.251:8090/meuser/api/user/', data);
  return this._http.post<any>(environment.LOGIN_URL_JWT + "schoolResetPassword", data)

  // return this._http.post<any>('https://pgi.udiseplus.gov.in/UserService/api/user/resetPassword', data);
  // return this._http.post<any>('https://kvsdemo.udiseplus.gov.in/UserService/api/user/resetPassword', data);
}
downloadDoc(url) {
  
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  // return this._http.post<any>('http://10.25.26.251:8090/meuser/api/user/', data);
  alert(url)
  return this._http.get<any>(url, {headers})
  
}
}
