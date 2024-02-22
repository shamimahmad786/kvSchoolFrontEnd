import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './utilities/header/header/header.component';
import { SideNavComponent } from './utilities/sideNav/side-nav/side-nav.component';
import { FooterComponent } from './utilities/footer/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormDataService } from './teacherEntryForm/service/internalService/form-data.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TDashboardComponent } from './tDashboard/t-dashboard/t-dashboard.component';
//import { LoginComponent } from './tDashboard/t-dashboard/login/login/login.component';

import { TeacherComponent } from './teacherEntryForm/teacher.component';
import { TeacherEntryFormComponent } from './teacherEntryForm/teacher-entry-form/teacher-entry-form.component';
import { TModuleModule } from './teacherModule/t-module/t-module.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { CustomFormSelectionComponent } from './teacherEntryForm/stateOrUserSpecificForm/custom-form-selection/custom-form-selection.component';
import { TeachersDetailComponent } from './teacherEntryForm/teachersDetail/teachers-detail/teachers-detail.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeacherInboxComponent } from './teacherEntryForm/teacherDropbox/teacher-dropbox/teacher-inbox/teacher-inbox.component';
import { TeacheroutboxComponent } from './teacherEntryForm/teacherDropbox/teacher-dropbox/teacheroutbox/teacheroutbox.component';
import { UpdateMobileEmailComponent } from './teacherEntryForm/teacherUpdateMobileEmail/update-mobile-email/update-mobile-email.component';
import { ExperienceType,AppointedForLevelPipe, BloodGroupPipe, ClassTaughtPipe, DisabilityPipe, GenderPipe, HAcdQualPipe, MainSubjectPipe, MaritalStatusPipe, NationalityPipe, NatureOfApntmntPipe, NatureOfAppointmentPipe, ProfQualPipe, SocialCatPipe, StaffTypePipe, TecahingNonTeaching, TrainingPipe, TransferGroundPipe, TypeOfTeacherPipe, YesNoPipe } from './utilities/myPipe/myPipe';
import { SurveyMasterComponent } from './survey/surveyMaster/survey-master/survey-master.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { KvsTeacherProfileComponent } from './kvs/kvs-teacher-profile/kvs-teacher-profile.component';
import { KvsTeacherTransferComponent } from './kvs/kvs-teacher-transfer/kvs-teacher-transfer.component';
import { KvsTeachersDeatilComponent } from './kvs/kvs-teachers-deatil/kvs-teachers-deatil.component';
import { DatePipe } from '@angular/common';
import { NationalDashboardComponent } from './tDashboard/national-dashboard/national-dashboard.component';
import { RegionDashboardComponent } from './tDashboard/region-dashboard/region-dashboard.component';
import { StationDashboardComponent } from './tDashboard/station-dashboard/station-dashboard.component';
import { MainPageComponent } from './tDashboard/main-page/main-page.component';

import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { KvsTransferEditComponent } from './kvs/kvs-transfer-edit/kvs-transfer-edit.component';
import { KvsSurplusListingComponent } from './kvs/surplus/kvs-surplus-listing/kvs-surplus-listing.component';
import { KvsIdentifySurplusComponent } from './kvs/surplus/kvs-identify-surplus/kvs-identify-surplus.component';
import { KvsSurplusStaffComponent } from './kvs/surplus/kvs-surplus-staff/kvs-surplus-staff.component';
// import { TeacherTransferPdfService } from './kvs/makePdf/teacher-transfer-pdf.service';
import { AuthInterceptorService } from './guard/auth-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { NationalReportComponent } from './reports/national-report/national-report.component';
import { StationReportComponent } from './reports/station-report/station-report.component';
import { SchoolReportComponent } from './reports/school-report/school-report.component';
import { ChangePasswordComponent } from './credentials/change-password/change-password.component';
import { TopCardsComponent } from './reports/top-cards/top-cards.component';
import { TeacherAppPdfService } from './kvs/makePdf/teacher-app-pdf.service';
import { AgGridModule } from 'ag-grid-angular';
import { ApplicationFlowComponent } from './utilities/instructions/application-flow/application-flow.component';
import { TeacherTransferPdfService } from './kvs/makePdf/teacher-transfer-pdf.service';

import {MatListModule} from '@angular/material/list';
// import { MatCardModule } from '@angular/material/card';

import {MatIconModule} from '@angular/material/icon';
import { ReportGridComponent } from './reports/report-grid/report-grid.component';
// import { AgGridModule } from 'ag-grid-angular';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { KvTchSanctionedPostComponent } from './kvs/sanctionedPost/kv-tch-sanctioned-post/kv-tch-sanctioned-post.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { LoginComponent } from './login/login.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { FreezeMastersComponent } from './components/freeze-masters/freeze-masters.component';
import { MaterialModule } from './mat/material/material.module';
import { StationMasterModule } from './components/station-master/station-master.module';
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
import { RegionWiseStationDetailComponent } from './reports/region-wise-station-detail/region-wise-station-detail.component';
import { StationWiseSchoolDetailComponent } from './reports/station-wise-school-detail/station-wise-school-detail.component';
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
import { ReportdatamodelComponent } from './reportdatamodel/reportdatamodel.component';
import { TransferReportChildComponent } from './teacher/transfer-report-child/transfer-report-child.component';
import { KvsTeacherTransferDetailsComponent } from './kvs/kvs-teacher-transfer-details/kvs-teacher-transfer-details.component';
import { KvsTransferMiscellaneusComponent } from './kvs/kvs-teacher-transfer-details/kvs-transfer-miscellaneus/kvs-transfer-miscellaneus.component';
import { TransferProgresionBarComponent } from './kvs/kvs-teacher-transfer-details/transfer-progresion-bar/transfer-progresion-bar.component';
import { KvsTransferStationChoiceComponent } from './kvs/kvs-teacher-transfer-details/kvs-transfer-station-choice/kvs-transfer-station-choice.component';
import { KvsTransferPreviewUndertakingComponent } from './kvs/kvs-teacher-transfer-details/kvs-transfer-preview-undertaking/kvs-transfer-preview-undertaking.component';
import { TransferRelatedDocComponent } from './components/transfer-related-doc/transfer-related-doc.component';
import { DropboxEmployeeComponent } from './kvs/dropbox-employee/dropbox-employee.component';
// import { MAT_DATE_FORMATS } from '@angular/material/';
// import { DatePickerModule } from 'angular-material-datepicker';


// import { MatStepperModule} from '@angular/material/stepper';
// import { MatCardModule} from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new MultiTranslateHttpLoader(http, [
//     {prefix: "./assets/translate/core/", suffix:".json"},
//     {prefix: "./assets/translate/shared/", suffix:".json"},
//   ])
// }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    TDashboardComponent,
    LoginComponent,
    TeacherComponent,
    TeacherEntryFormComponent,
    CustomFormSelectionComponent,
    TeachersDetailComponent,
    ProfileComponent,
    TeacherInboxComponent,
    TeacheroutboxComponent,
    UpdateMobileEmailComponent,
    SurveyMasterComponent,
    GenderPipe,
    NationalityPipe,
    MainSubjectPipe,
    YesNoPipe,
    ClassTaughtPipe,
    TrainingPipe,
    NatureOfApntmntPipe,
    TransferGroundPipe,
    AppointedForLevelPipe,
    DisabilityPipe,
    NatureOfAppointmentPipe,
    StaffTypePipe,
    MaritalStatusPipe,
    SocialCatPipe,
    TypeOfTeacherPipe,
    TecahingNonTeaching,
    HAcdQualPipe,
    ProfQualPipe,
    BloodGroupPipe,
    KvsTeacherProfileComponent,
    KvsTeacherTransferComponent,
    KvsTeachersDeatilComponent,
    NationalDashboardComponent,
    RegionDashboardComponent,
    StationDashboardComponent,
    MainPageComponent,
    KvsTransferEditComponent,
    KvsSurplusListingComponent,
    KvsIdentifySurplusComponent,
    KvsSurplusStaffComponent,
    NationalReportComponent,
    StationReportComponent,
    SchoolReportComponent,
    ChangePasswordComponent,
    ApplicationFlowComponent,
    TopCardsComponent,
    ReportGridComponent,
    KvTchSanctionedPostComponent,
    ExperienceType,
    FreezeMastersComponent,
    SchoolReviewComponent,
    KvsJoiningComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    UserMasterComponent,
    AddInstituteHeadComponent,
    ControlerManagementComponent,
    UserMappingComponent,
    KvSchoolMappingComponent,
    RegionWiseSchoolComponent,
    RegionWiseStationDetailComponent,
    StationWiseSchoolDetailComponent,
    SchoolDetailComponent,
    AdminTransferModuleComponent,
    ModifyTransferModuleComponent,
    BasicProfileComponent,
    PersonalInfoComponent,
    WorkExperienceComponent,
    MiscellaneousFormComponent,
    PreviewConfirmComponent,
    ProgresionBarComponent,
    KvsTicketComponent,
    ExcelTransferModuleComponent,
    TransferReportComponent,
    ReportdatamodelComponent,
    TransferReportChildComponent,
    KvsTeacherTransferDetailsComponent,
    KvsTransferMiscellaneusComponent,
    TransferProgresionBarComponent,
    KvsTransferStationChoiceComponent,
    KvsTransferPreviewUndertakingComponent,
    TransferRelatedDocComponent,
    DropboxEmployeeComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    RxReactiveFormsModule,
     HttpClientModule,
    // HttpClient,
    TModuleModule,
    NgbModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([]),
    MatListModule,
    MatIconModule,
    // AgGridModule.withComponents([]),
    MatAutocompleteModule,
    MatToolbarModule,
    NgxMatSelectSearchModule,
    NgxMatSelectSearchModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSortModule,
    MatButtonModule,
    MaterialModule
    // NgbDatepickerModule,
  
    
    // BsDatepickerModule.forRoot()
    // DatePickerModule

    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps:[HttpClient]
    //   }
    // })
  ],
  providers: [TeacherAppPdfService,FormDataService, DatePipe,TeacherTransferPdfService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
