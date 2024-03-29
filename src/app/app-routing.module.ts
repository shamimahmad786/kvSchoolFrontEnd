import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './credentials/change-password/change-password.component';
import { AuthGuard } from './guard/AuthGuard';
import { KvsTeacherProfileComponent } from './kvs/kvs-teacher-profile/kvs-teacher-profile.component';
import { KvsTeacherTransferComponent } from './kvs/kvs-teacher-transfer/kvs-teacher-transfer.component';
import { KvsTeachersDeatilComponent } from './kvs/kvs-teachers-deatil/kvs-teachers-deatil.component';
import { KvsTransferEditComponent } from './kvs/kvs-transfer-edit/kvs-transfer-edit.component';
import { KvsIdentifySurplusComponent } from './kvs/surplus/kvs-identify-surplus/kvs-identify-surplus.component';
import { KvsSurplusListingComponent } from './kvs/surplus/kvs-surplus-listing/kvs-surplus-listing.component';
import { KvsSurplusStaffComponent } from './kvs/surplus/kvs-surplus-staff/kvs-surplus-staff.component';
import { ProfileComponent } from './profile/profile.component';
import { NationalReportComponent } from './reports/national-report/national-report.component';
import { SchoolReportComponent } from './reports/school-report/school-report.component';
import { SurveyMasterComponent } from './survey/surveyMaster/survey-master/survey-master.component';
import { MainPageComponent } from './tDashboard/main-page/main-page.component';
import { NationalDashboardComponent } from './tDashboard/national-dashboard/national-dashboard.component';
import { RegionDashboardComponent } from './tDashboard/region-dashboard/region-dashboard.component';
import { StationDashboardComponent } from './tDashboard/station-dashboard/station-dashboard.component';
import { TDashboardComponent } from './tDashboard/t-dashboard/t-dashboard.component';
import { CustomFormSelectionComponent } from './teacherEntryForm/stateOrUserSpecificForm/custom-form-selection/custom-form-selection.component';
import { TeacherEntryFormComponent } from './teacherEntryForm/teacher-entry-form/teacher-entry-form.component';
import { TeacherComponent } from './teacherEntryForm/teacher.component';
import { TeacherDropboxComponent } from './teacherEntryForm/teacherDropbox/teacher-dropbox/teacher-dropbox.component';
import { TeacherInboxComponent } from './teacherEntryForm/teacherDropbox/teacher-dropbox/teacher-inbox/teacher-inbox.component';
import { TeacheroutboxComponent } from './teacherEntryForm/teacherDropbox/teacher-dropbox/teacheroutbox/teacheroutbox.component';
import { TeachersDetailComponent } from './teacherEntryForm/teachersDetail/teachers-detail/teachers-detail.component';
import { UpdateMobileEmailComponent } from './teacherEntryForm/teacherUpdateMobileEmail/update-mobile-email/update-mobile-email.component';
import { ReportGridComponent } from './reports/report-grid/report-grid.component';
import { KvTchSanctionedPostComponent } from './kvs/sanctionedPost/kv-tch-sanctioned-post/kv-tch-sanctioned-post.component';
import { LoginComponent } from './login/login.component';
import { FreezeMastersComponent } from './components/freeze-masters/freeze-masters.component';
import { SchoolReviewComponent } from './kvs/school-review/school-review/school-review.component';
import { KvsJoiningComponent } from './kvs/kvs-joining/kvs-joining.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserMasterComponent } from './components/user-master/user-master.component';
import { AddInstituteHeadComponent } from './components/add-institute-head/add-institute-head.component';
import { ControlerManagementComponent } from './components/controler-management/controler-management.component';
import { UserMappingComponent } from './components/user-mapping/user-mapping.component';
import { KvSchoolMappingComponent } from './components/kv-school-mapping/kv-school-mapping.component';
import { RegionWiseSchoolComponent } from './reports/region-wise-school/region-wise-school.component';
import { StationWiseSchoolDetailComponent } from './reports/station-wise-school-detail/station-wise-school-detail.component';
import { RegionWiseStationDetailComponent } from './reports/region-wise-station-detail/region-wise-station-detail.component';
import { SchoolDetailComponent } from './reports/school-detail/school-detail.component';
import { AdminTransferModuleComponent } from './components/admin-transfer-module/admin-transfer-module.component';
import { ModifyTransferModuleComponent } from './components/modify-transfer-module/modify-transfer-module.component';
import { BasicProfileComponent } from './teacherEntryForm/basic-profile/basic-profile.component';
import { PersonalInfoComponent } from './teacherEntryForm/personal-info/personal-info.component';
import { WorkExperienceComponent } from './teacherEntryForm/work-experience/work-experience.component';
import { PreviewConfirmComponent } from './teacherEntryForm/preview-confirm/preview-confirm.component';
import { MiscellaneousFormComponent } from './teacherEntryForm/miscellaneous-form/miscellaneous-form.component';
import { ProgresionBarComponent } from './teacherEntryForm/progresion-bar/progresion-bar.component';
import { KvsTicketComponent } from './kvs/kvs-ticket/kvs-ticket.component';
import { ExcelTransferModuleComponent } from './components/excel-transfer-module/excel-transfer-module.component';
import { TransferReportComponent } from './teacher/transfer-report/transfer-report.component';
import { TransferReportChildComponent } from './teacher/transfer-report-child/transfer-report-child.component';
import { KvsTeacherTransferDetailsComponent } from './kvs/kvs-teacher-transfer-details/kvs-teacher-transfer-details.component';
import { KvsTransferMiscellaneusComponent } from './kvs/kvs-teacher-transfer-details/kvs-transfer-miscellaneus/kvs-transfer-miscellaneus.component';
import { KvsTransferStationChoiceComponent } from './kvs/kvs-teacher-transfer-details/kvs-transfer-station-choice/kvs-transfer-station-choice.component';
import { KvsTransferPreviewUndertakingComponent } from './kvs/kvs-teacher-transfer-details/kvs-transfer-preview-undertaking/kvs-transfer-preview-undertaking.component';
import { TransferRelatedDocComponent } from './components/transfer-related-doc/transfer-related-doc.component';
import { DropboxEmployeeComponent } from './kvs/dropbox-employee/dropbox-employee.component';
import { KvsTicketNicComponent } from './kvs/kvs-ticket-nic/kvs-ticket-nic.component';
import { LeaveManagementComponent } from './teacherEntryForm/leave-management/leave-management.component';
import { SearchemployeeComponent } from './searchemployee/searchemployee.component';

const routes: Routes = [
  {path:'', component: MainPageComponent},
  {path:'mainPage', component: MainPageComponent},
  {path:'tDashboard', component: TDashboardComponent},
  {path:'login', component:LoginComponent},
  {path:'forgetPassword', component:ForgetPasswordComponent},
  {path:'restPassword', component:ResetPasswordComponent},
  {path: 'teacher', component:TeacherComponent,canActivate: [AuthGuard], children:[
      {path:'', component: ProfileComponent},
      {path:'profile', component: ProfileComponent},
      {path:'globalTransferModule', component: AdminTransferModuleComponent},
      {path:'modifyTransferModule', component: ModifyTransferModuleComponent},
      {path:'nationalDashboard', component: NationalDashboardComponent},
      {path:'regionDashboard', component: RegionDashboardComponent},
      {path:'stationDashboard', component: StationDashboardComponent},
      {path: 'teacherHome', component:TeacherEntryFormComponent} ,
      {path: 'basicProfile', component:BasicProfileComponent} ,     
      {path: 'dropBox', component:DropboxEmployeeComponent} , 
      {path: 'personalInfo', component:PersonalInfoComponent} ,    
      {path: 'workExperience', component:WorkExperienceComponent} ,  
      {path: 'leaveMangement', component:LeaveManagementComponent} , 
      {path: 'miscellaneous', component:MiscellaneousFormComponent} ,
      {path: 'previewConfirm', component:PreviewConfirmComponent} ,
      {path: 'customForm', component:CustomFormSelectionComponent},
      {path: 'teachersDetail', component:TeachersDetailComponent},
      {path: 'teachersDropbox', component:TeacherDropboxComponent},  
      {path: 'progresionBar', component:ProgresionBarComponent},
      {path: 'teacherInbox', component:TeacherInboxComponent},
      {path: 'teacherOutbox', component:TeacheroutboxComponent},
      {path: 'updateEmailMobile', component:UpdateMobileEmailComponent},
      {path: 'surveyMaster', component:SurveyMasterComponent},
      {path: 'kvsTchProfile', component:KvsTeacherProfileComponent},
      {path: 'kvsTchTransfer', component:KvsTeacherTransferComponent},   
      {path: 'kvsTchMiscellaneous', component:KvsTransferMiscellaneusComponent},   
      {path: 'kvsTchStationChoice', component:KvsTransferStationChoiceComponent},   
      {path: 'kvsTchPreviewUndertaking', component:KvsTransferPreviewUndertakingComponent},  
      {path: 'employeeJoining', component:KvsJoiningComponent},  
      {path: 'searchEmployee', component:SearchemployeeComponent},  
      {path: 'kvsTicket', component:KvsTicketComponent}, 
      {path: 'kvsTicketNic', component:KvsTicketNicComponent},
      {path: 'excel-transfer', component:ExcelTransferModuleComponent},
      {path: 'transfer-report', component:TransferReportComponent},    
      {path: 'transfer-related-doc', component:TransferRelatedDocComponent},  
      {path: 'sub-transfer-report', component:TransferReportChildComponent},
      {path: 'kvsTchDetails', component:KvsTeachersDeatilComponent},
      {path: 'schoolReview', component:SchoolReviewComponent},
      {path: 'transferEdit', component:KvsTransferEditComponent},
      {path: 'surplusListing', component:KvsSurplusListingComponent},
      {path: 'identifySurplus', component:KvsIdentifySurplusComponent},
      {path: 'surplusStaff', component:KvsSurplusStaffComponent},
      {path: 'nationalReport', component:NationalReportComponent},
      {path: 'regionWiseSchool', component:RegionWiseSchoolComponent},
      {path: 'stationWiseSchool', component:StationWiseSchoolDetailComponent},
      {path: 'regionWiseStationDetail', component:RegionWiseStationDetailComponent},
      {path: 'schoolDetail', component:SchoolDetailComponent},
      {path: 'schoolReport', component:SchoolReportComponent},
      {path:'changePassword', component:ChangePasswordComponent},
      {path:'freezeMaster', component:FreezeMastersComponent},
      {path:'userMaster', component:UserMasterComponent},
      {path:'reportGrid', component:ReportGridComponent},    
      {path:'teacher-transfer-dashboard', component:KvsTeacherTransferDetailsComponent},
      {path:'kvSanctionedPost', component:KvTchSanctionedPostComponent},
      {path:'addInstituteHead', component:AddInstituteHeadComponent},
      {path:'user-mapping', component:UserMappingComponent},
      {path:'kv-mapping', component:KvSchoolMappingComponent},
      {path:'controler-management', component:ControlerManagementComponent},
      {path: 'regionMaster', loadChildren: () => import('./components/region-master/region-master.module').then(m => m.RegionMasterModule) },
      {path: 'stationMaster', loadChildren: () => import('./components/station-master/station-master.module').then(m => m.StationMasterModule) },
      {path: 'schoolMaster', loadChildren: () => import('./components/school-master/school-master.module').then(m => m.SchoolMasterModule) },
      {path: 'stationCategoryMaster', loadChildren: () => import('./components/station-category-master/station-category-master.module').then(m => m.StationCategoryMasterModule) },
      {path: 'regionStationMapping', loadChildren: () => import('./components/region-station-mapping/region-station-mapping.module').then(m => m.RegionStationMappingModule) },
      {path: 'schoolStationMapping', loadChildren: () => import('./components/school-station-mapping/school-station-mapping.module').then(m => m.SchoolStationMappingModule) },
      {path: 'stationCategoryMapping', loadChildren: () => import('./components/station-category-mapping/station-category-mapping.module').then(m => m.StationCategoryMappingModule) },
      { path: 'stafftypeMaster', loadChildren: () => import('./components/stafftype-master/stafftype-master.module').then(m => m.StafftypeMasterModule) },
      { path: 'subjectMaster', loadChildren: () => import('./components/subject-master/subject-master.module').then(m => m.SubjectMasterModule) },
      { path: 'designationMaster', loadChildren: () => import('./components/designation-master/designation-master.module').then(m => m.DesignationMasterModule) },
      { path: 'stafftypePostMapping', loadChildren: () => import('./components/stafftype-post-mapping/stafftype-post-mapping.module').then(m => m.StafftypePostMappingModule) },
      { path: 'postSubjectMapping', loadChildren: () => import('./components/post-subject-mapping/post-subject-mapping.module').then(m => m.PostSubjectMappingModule) },
      { path: 'sanctioned-post', loadChildren: () => import('./components/sanctioned-post/sanctioned-post.module').then(m => m.SanctionedPostModule) },
      { path: 'sanctioned-all-post', loadChildren: () => import('./components/sanctioned-all-post/sanctioned-all-post.module').then(m => m.SanctionedAllPostModule) },
      { path: 'school-reset-password', loadChildren: () => import('./components/school-reset-password/school-reset-password.module').then(m => m.SchoolResetPasswordModule) },
    ]},  
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
