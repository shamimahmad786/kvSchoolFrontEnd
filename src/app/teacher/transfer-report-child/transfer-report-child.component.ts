import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { json } from '@rxweb/reactive-form-validators';
import { Workbook } from 'exceljs';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { ReportService } from 'src/app/service/report-service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { StateGroup } from 'src/app/reports/report-grid/report-grid.component';
import { startWith, takeUntil } from 'rxjs/operators';
import { ColDef, RowGroupingDisplayType } from 'ag-grid-community';
declare const srvTime: any;

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
@Component({
  selector: 'app-transfer-report-child',
  templateUrl: './transfer-report-child.component.html',
  styleUrls: ['./transfer-report-child.component.css'],
})
export class TransferReportChildComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  loginUserNameForService: any;
  reportList: any = [];
  transferReportListById: any = [];
  id: any;
  reportId: any;
  reportName: any;
  reportType: any;
  teacher_id: any;
  emp_code: any;
  empName: any;
  gender: any;
  dob: any;
  postCode: any;
  subjectId: any;
  regionCode: any;
  stationSchoolCountByRegion: any = [];
  resdata: any = [];
  reportResponse: any;
  reportIdAction: any;
  userMappingRegionCode: any;
  returnTypeSrvTime: any;
  allResultDaata: any = new Array();
  reportValue: any;
  stationStatus: boolean = false;
  schoolStatus: boolean = false;
  natiowise: boolean = false;
  rowData: any = new Array();
  rowanyData: any = new Array();
  rowanyDataForStation: any = new Array();
  columnDefs: any = [];
  regionData: any = [];
  stationData: any = [];
  schoolData: any = [];
  menuHeader: any = [];
  regionName: any;
  stationName: any;
  schoolName: any;
  kvName: any;
  previousData: any;
  stationCode: any;
  schoolCode: any;
  reportFullName: any;
  firstTimeLoad: any;
  rows: any;
  columns: any;
  teachingMaleCount: number = 0;
  teachingFeMaleCount: number = 0;
  nonTeachingMaleCount: number = 0;
  nonTeachingFeMaleCount: number = 0;
  teachingUnspecifiedCount: number = 0;
  nonTeachingUnspecifiedCount: number = 0;
  regionNameinArray: any;
  stationNameInArray: any;
  newRegionArray: any;
  newStationArray: any;
  kvSchoolDetails: any;
  protected _onDestroy = new Subject<void>();
  yPoint: any;
  allResData: any;
  regionWiseArray: any = new Array();
  stationWiseArray: any = new Array();

  public regionCtrl: FormControl = new FormControl();
  public regionFilterCtrl: FormControl = new FormControl();
  public filteredRegion: ReplaySubject<any[]> = new ReplaySubject<any[]>();
  @ViewChild('regionSelect', { static: true }) regionSelect: MatSelect;

  public stationCtrl: FormControl = new FormControl();
  public stationFilterCtrl: FormControl = new FormControl();
  public filteredStation: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('stationSelect', { static: true }) stationSelect: MatSelect;

  public schoolCtrl: FormControl = new FormControl();
  public schoolFilterCtrl: FormControl = new FormControl();
  public filteredSchool: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('schoolSelect', { static: true }) schoolSelect: MatSelect;
  regionWiseData: string;
  stationWiseData: any;
  kvCode: any;
  businessUnitTypeCode: any;
  regionCodeFromService: any;
  sno: any;
  retirement: any;
  transfer: any;
  death: any;
  others: any;
  promotion: any;
  resignation: any;
  aa: any;
  allNewResultData: any;

  constructor(
    private _formBuilder: FormBuilder,
    private reportService: ReportService,
    private pdfService: MasterReportPdfService,
    private outSideService: OutsideServicesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private modalService: NgbModal
  ) {}

  protected filterRegion() {
    if (!this.regionData) {
      return;
    }
    let search = this.regionFilterCtrl.value;
    if (!search) {
      this.filteredRegion.next(this.regionData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredRegion.next(
      this.regionData.filter(
        (region) => region.regionName.toLowerCase().indexOf(search) > -1
      )
    );
  }

  protected filterStation() {
    if (!this.stationData) {
      return;
    }
    let search = this.stationFilterCtrl.value;
    if (!search) {
      this.filteredStation.next(this.stationData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredStation.next(
      this.stationData.filter(
        (station) => station.stationName.toLowerCase().indexOf(search) > -1
      )
    );
  }

  ngOnInit(): void {
    for (
      let i = 0;
      i <
      JSON.parse(sessionStorage.getItem('authTeacherDetails'))
        ?.applicationDetails.length;
      i++
    ) {
      this.kvCode = JSON.parse(
        sessionStorage.getItem('authTeacherDetails')
      )?.applicationDetails[i].business_unit_type_code;
      this.businessUnitTypeCode = JSON.parse(
        sessionStorage.getItem('authTeacherDetails')
      )?.applicationDetails[0].business_unit_type_id;
    }
    this.firstTimeLoad = 'Yes';
    this.route.queryParams.subscribe((params) => {
      this.reportIdAction = params['reportId'];
    });
    // this.reportId = JSON.parse(
    //   JSON.stringify(this.reportService.pullReportBasicData())
    // ).reportId;
    // this.reportType = JSON.parse(
    //   JSON.stringify(this.reportService.pullReportBasicData())
    // ).reportType;
    // this.reportValue = JSON.parse(
    //   JSON.stringify(this.reportService.pullReportBasicData())
    // ).reportValue;

    this.regionFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRegion();
      });

    this.stationFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterStation();
      });

    setTimeout(() => {
      var data = {
        reportId: this.reportIdAction,
        region: 'All',
        station: '',
        school: '',
      }; // <<<---using ()=> syntax
      this.getReportData(data);
      this.getRegionData();
    }, 1000);

    this.menuHeader = [{ label: 'Region(All)', icon: 'keyboard_arrow_right' }];

    this.getReportName(this.reportId);
    if (this.businessUnitTypeCode == 5) {
      this.natiowise = true;
      this.getSchoolDetailsByKvCode();
    }
  }
  getSchoolDetailsByKvCode() {
    this.outSideService.fetchKvSchoolDetails(this.kvCode).subscribe((res) => {
      this.kvSchoolDetails = res.response;
      console.log(this.kvSchoolDetails);
      for (let i = 0; i < this.kvSchoolDetails.rowValue.length; i++) {
        this.stationCode = this.kvSchoolDetails.rowValue[i].station_code;
        this.regionCodeFromService =
          this.kvSchoolDetails.rowValue[i].region_code;
      }
    });
  }
  getRegionData() {
    this.reportService.fetchKvRegion(1).subscribe((res) => {
      this.regionData = res.response.rowValue;
      this.regionData.splice(0, 0, { region_code: 'All', region_name: 'All' });
      this.regionData.splice(1, 1, {
        region_code: '99',
        region_name: 'Region Wise',
      });
      this.stateGroups = [
        {
          names: this.regionData,
        },
      ];
      if (this.businessUnitTypeCode == 5) {
        for (let i = 0; i < this.regionData.length; i++) {
          if (this.regionData[i]['region_code'] == this.regionCodeFromService) {
            this.regionCtrl.setValue(this.regionData[i]);
          }
        }
        this.stationStatus = true;
        this.regionChange(this.regionCodeFromService, 'Yes');
      } else {
        this.regionCtrl.setValue(this.regionData[0]);
      }

      this.filteredRegion.next(this.regionData.slice());
    });
  }

  getReportName(data) {
    if (data == '1') {
      this.reportFullName = 'Detailed Kendriya Vidyalaya profile report';
    } else if (data == '2') {
      this.reportFullName = 'List of school';
    } else if (data == '3') {
      this.reportFullName = 'List of Region';
    } else if (data == '4') {
      this.reportFullName = 'List of Station';
    } else if (data == '5') {
      this.reportFullName = 'Sanctioned Post for Region';
    }
  }

  ngAfterViewInit(): void {}

  applyFilterHBSource(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  generatePDF() {
    this.returnTypeSrvTime = srvTime();
    setTimeout(() => {
      this.pdfService.generateReportPDF(this.resdata, this.returnTypeSrvTime);
    }, 1000);
  }

  exportexcel() {
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('TransferReport');
    const excelData = [];
    const ws1 = workSheet.addRow(['', '', 'TRANSFER REPORT', '']);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 10;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 40;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 40;
    const dobCol3 = workSheet.getColumn(3);
    dobCol3.width = 28;
    const dobCol4 = workSheet.getColumn(1);
    dobCol4.width = 28;
    const dobCol5 = workSheet.getColumn(2);
    dobCol5.width = 40;
    const dobCol6 = workSheet.getColumn(3);
    dobCol6.width = 28;
    const dobCol7 = workSheet.getColumn(3);
    dobCol7.width = 28;
    const dobCol8 = workSheet.getColumn(1);
    dobCol8.width = 28;
    const dobCol9 = workSheet.getColumn(2);
    dobCol9.width = 28;
    const dobCol10 = workSheet.getColumn(3);
    dobCol10.width = 28;

    workSheet.getRow(1).font = {
      name: 'Arial',
      family: 4,
      size: 13,
      bold: true,
    };
    for (let i = 1; i < 11; i++) {
      const col = ws1.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '9c9b98' },
      };
    }
    const ws = workSheet.addRow([
      'S.NO',
      'Employee Name',
      'Region Address',
      'Present Region Name',
      'Present Station Name (Code)',
      'Allotted KV Name (Code)',
      'Alloted Region Name (Code)',
      'Transfer type',
      'Post Name',
      'Category',
    ]);
    workSheet.getRow(2).font = {
      name: 'Arial',
      family: 4,
      size: 10,
      bold: true,
    };
    for (let i = 1; i < 11; i++) {
      const col = ws.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'd6d6d4' },
      };
    }

    this.stationSchoolCountByRegion.forEach((item) => {
      const row = workSheet.addRow([
        item.sno,
        item.empname,
        item.presentKvCode,
        item.presentRegionName,
        item.presentStationNameCode,
        item.allotedKvNameCode,
        item.regionNameCode,
        item.transferType,
        item.postName,
        item.transferred_under_cat_id,
      ]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'TransferReport.xlsx');
    });
  }
  cancelModal() {
    this.modalService.dismissAll();
  }
  stateForm = this._formBuilder.group({
    stateGroup: '',
  });

  stationForm = this._formBuilder.group({
    stationGroup: '',
  });

  schoolForm = this._formBuilder.group({
    schoolGroup: '',
  });

  stateGroups: StateGroup[] = [
    {
      names: this.regionData,
    },
  ];

  stationGroups: StateGroup[] = [
    {
      names: this.stationData,
    },
  ];

  schoolGroups: StateGroup[] = [
    {
      names: this.schoolData,
    },
  ];

  stateGroupOptions: Observable<StateGroup[]>;
  stationGroupOptions: Observable<StateGroup[]>;
  schoolGroupOptions: Observable<StateGroup[]>;

  getReportData(data: any) {
    debugger
    this.allResultDaata=[]; 
    this.rowData = [];
    this.outSideService.getReportByID(data).subscribe((res) => {
      this.allResData = res;
      this.rows = res.rowValue;
      this.allResultDaata = res.rowValue;
      if (this.reportIdAction == '1004' && this.allResultDaata.length > 0) {
        this.teachingMaleCount = 0;
        this.teachingFeMaleCount = 0;
        this.nonTeachingMaleCount = 0;
        this.nonTeachingFeMaleCount = 0;
        this.teachingUnspecifiedCount = 0;
        this.nonTeachingUnspecifiedCount = 0;
        this.rowData = [];
        this.columnDefs = [];
        if (this.regionWiseData == 'Station Wise') {
          var groupByEnrolementDate = function (xs: any, key: any) {
            return xs.reduce(function (rv: any, x: any) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };
          var groubedByEnrolmentDateResult = groupByEnrolementDate(
            this.allResultDaata,
            'station_name'
          );
          this.stationWiseArray = Object.entries(groubedByEnrolmentDateResult);
          for (let i = 0; i < this.stationWiseArray.length; i++) {
            this.newStationArray = this.stationWiseArray[i];
            this.stationNameInArray = this.stationWiseArray[i][0];
            this.teachingMaleCount = 0;
            this.teachingFeMaleCount = 0;
            this.nonTeachingMaleCount = 0;
            this.nonTeachingFeMaleCount = 0;
            this.teachingUnspecifiedCount = 0;
            this.nonTeachingUnspecifiedCount = 0;
            for (let j = 0; j < this.newStationArray[1].length; j++) {
              if (
                this.newStationArray[1][j]['teaching_nonteaching'] == 1 &&
                this.newStationArray[1][j]['teacher_gender'] == 1
              ) {
                this.teachingMaleCount =
                  this.teachingMaleCount + this.newStationArray[1][j]['count'];
                // alert( this.teachingMaleCount)
              }
              if (
                this.newStationArray[1][j]['teaching_nonteaching'] == 1 &&
                this.newStationArray[1][j]['teacher_gender'] == 2
              ) {
                this.teachingFeMaleCount =
                  this.teachingFeMaleCount +
                  this.newStationArray[1][j]['count'];
              }
              if (
                this.newStationArray[1][j]['teaching_nonteaching'] == 1 &&
                this.newStationArray[1][j]['teacher_gender'] == null
              ) {
                this.teachingUnspecifiedCount =
                  this.teachingUnspecifiedCount +
                  this.newStationArray[1][j]['count'];
              }

              if (
                this.newStationArray[1][j]['teaching_nonteaching'] == 2 &&
                this.newStationArray[1][j]['teacher_gender'] == 1
              ) {
                this.nonTeachingMaleCount =
                  this.nonTeachingMaleCount +
                  this.newStationArray[1][j]['count'];
              }
              if (
                this.newStationArray[1][j]['teaching_nonteaching'] == 2 &&
                this.newStationArray[1][j]['teacher_gender'] == 2
              ) {
                this.nonTeachingFeMaleCount =
                  this.nonTeachingFeMaleCount +
                  this.newStationArray[1][j]['count'];
              }
              if (
                this.newStationArray[1][j]['teaching_nonteaching'] == 2 &&
                this.newStationArray[1][j]['teacher_gender'] == null
              ) {
                this.nonTeachingUnspecifiedCount =
                  this.nonTeachingUnspecifiedCount +
                  this.newStationArray[1][j]['count'];
              }
              this.rowanyDataForStation = [
                {
                  Station: this.stationNameInArray,
                  TeachingMale: this.teachingMaleCount,
                  TeachingFemale: this.teachingFeMaleCount,
                  TeachingUnspecified: this.teachingUnspecifiedCount,
                  NonTeachingMale: this.nonTeachingMaleCount,
                  NonTeachingFemale: this.nonTeachingFeMaleCount,
                  NonTeachingUnspecified: this.nonTeachingUnspecifiedCount,
                },
              ];
            }

            this.rowData.push(this.rowanyDataForStation[0]);
          }

          console.log('row data----------');
          console.log(this.rowData);

          this.columnDefs = [
            {
              headerName: 'Teaching',
              children: [
                { headerName: 'Station', field: 'Station' },
                { headerName: 'Male', field: 'TeachingMale' },
                { headerName: 'Female', field: 'TeachingFemale' },
                { headerName: 'Unspecified', field: 'TeachingUnspecified' },
              ],
            },
            {
              headerName: 'Non Teaching',
              children: [
                { headerName: 'Male', field: 'TeachingMale' },
                { headerName: 'Male', field: 'NonTeachingMale' },
                { headerName: 'Female', field: 'NonTeachingFemale' },
                { headerName: 'Unspecified', field: 'NonTeachingUnspecified' },
              ],
            },
          ];
        } else if (this.regionWiseData == 'Region Wise') {
          var groupByEnrolementDate = function (xs: any, key: any) {
            return xs.reduce(function (rv: any, x: any) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };
          var groubedByEnrolmentDateResult = groupByEnrolementDate(
            this.allResultDaata,
            'region_name'
          );
          this.regionWiseArray = Object.entries(groubedByEnrolmentDateResult);
          console.log(this.regionWiseArray);
          for (let i = 0; i < this.regionWiseArray.length; i++) {
            this.newRegionArray = this.regionWiseArray[i];
            this.regionNameinArray = this.regionWiseArray[i][0];
            this.teachingMaleCount = 0;
            this.teachingFeMaleCount = 0;
            this.nonTeachingMaleCount = 0;
            this.nonTeachingFeMaleCount = 0;
            this.teachingUnspecifiedCount = 0;
            this.nonTeachingUnspecifiedCount = 0;
            for (let j = 0; j < this.newRegionArray[1].length; j++) {
              if (
                this.newRegionArray[1][j]['teaching_nonteaching'] == 1 &&
                this.newRegionArray[1][j]['teacher_gender'] == 1
              ) {
                this.teachingMaleCount =
                  this.teachingMaleCount + this.newRegionArray[1][j]['count'];
                // alert( this.teachingMaleCount)
              }
              if (
                this.newRegionArray[1][j]['teaching_nonteaching'] == 1 &&
                this.newRegionArray[1][j]['teacher_gender'] == 2
              ) {
                this.teachingFeMaleCount =
                  this.teachingFeMaleCount + this.newRegionArray[1][j]['count'];
              }
              if (
                this.newRegionArray[1][j]['teaching_nonteaching'] == 1 &&
                this.newRegionArray[1][j]['teacher_gender'] == null
              ) {
                this.teachingUnspecifiedCount =
                  this.teachingUnspecifiedCount +
                  this.newRegionArray[1][j]['count'];
              }

              if (
                this.newRegionArray[1][j]['teaching_nonteaching'] == 2 &&
                this.newRegionArray[1][j]['teacher_gender'] == 1
              ) {
                this.nonTeachingMaleCount =
                  this.nonTeachingMaleCount +
                  this.newRegionArray[1][j]['count'];
              }
              if (
                this.newRegionArray[1][j]['teaching_nonteaching'] == 2 &&
                this.newRegionArray[1][j]['teacher_gender'] == 2
              ) {
                this.nonTeachingFeMaleCount =
                  this.nonTeachingFeMaleCount +
                  this.newRegionArray[1][j]['count'];
              }
              if (
                this.newRegionArray[1][j]['teaching_nonteaching'] == 2 &&
                this.newRegionArray[1][j]['teacher_gender'] == null
              ) {
                this.nonTeachingUnspecifiedCount =
                  this.nonTeachingUnspecifiedCount +
                  this.newRegionArray[1][j]['count'];
              }
              this.rowanyData = [
                {
                  Region: this.regionNameinArray,
                  TeachingMale: this.teachingMaleCount,
                  TeachingFemale: this.teachingFeMaleCount,
                  TeachingUnspecified: this.teachingUnspecifiedCount,
                  NonTeachingMale: this.nonTeachingMaleCount,
                  NonTeachingFemale: this.nonTeachingFeMaleCount,
                  NonTeachingUnspecified: this.nonTeachingUnspecifiedCount,
                },
              ];
            }

            this.rowData.push(this.rowanyData[0]);
          }

          console.log('row data----------');
          console.log(this.rowData);
          this.columnDefs = [
            {
              headerName: 'Teaching',
              children: [
                { headerName: 'Region', field: 'Region' },
                { headerName: 'Male', field: 'TeachingMale' },
                { headerName: 'Female', field: 'TeachingFemale' },
                { headerName: 'Unspecified', field: 'TeachingUnspecified' },
              ],
            },
            {
              headerName: 'Non Teaching',
              children: [
                { headerName: 'Male', field: 'TeachingMale' },
                { headerName: 'Male', field: 'NonTeachingMale' },
                { headerName: 'Female', field: 'NonTeachingFemale' },
                { headerName: 'Unspecified', field: 'NonTeachingUnspecified' },
              ],
            },
          ];
        } else if (
          this.regionWiseData != 'Region Wise' &&
          this.regionWiseData != 'Station Wise'
        ) {
          for (let i = 0; i < this.allResultDaata.length; i++) {
            if (
              this.allResultDaata[i]['teaching_nonteaching'] == 1 &&
              this.allResultDaata[i]['teacher_gender'] == 1
            ) {
              this.teachingMaleCount =
                this.teachingMaleCount + this.allResultDaata[i]['count'];
              // alert( this.teachingMaleCount)
            }
            if (
              this.allResultDaata[i]['teaching_nonteaching'] == 1 &&
              this.allResultDaata[i]['teacher_gender'] == 2
            ) {
              this.teachingFeMaleCount =
                this.teachingFeMaleCount + this.allResultDaata[i]['count'];
            }
            if (
              this.allResultDaata[i]['teaching_nonteaching'] == 1 &&
              this.allResultDaata[i]['teacher_gender'] == null
            ) {
              this.teachingUnspecifiedCount =
                this.teachingUnspecifiedCount + this.allResultDaata[i]['count'];
            }

            if (
              this.allResultDaata[i]['teaching_nonteaching'] == 2 &&
              this.allResultDaata[i]['teacher_gender'] == 1
            ) {
              this.nonTeachingMaleCount =
                this.nonTeachingMaleCount + this.allResultDaata[i]['count'];
            }
            if (
              this.allResultDaata[i]['teaching_nonteaching'] == 2 &&
              this.allResultDaata[i]['teacher_gender'] == 2
            ) {
              this.nonTeachingFeMaleCount =
                this.nonTeachingFeMaleCount + this.allResultDaata[i]['count'];
            }
            if (
              this.allResultDaata[i]['teaching_nonteaching'] == 2 &&
              this.allResultDaata[i]['teacher_gender'] == null
            ) {
              this.nonTeachingUnspecifiedCount =
                this.nonTeachingUnspecifiedCount +
                this.allResultDaata[i]['count'];
            }
          }

          this.columnDefs = [
            {
              headerName: 'Teaching',
              children: [
                { headerName: 'Male', field: 'TeachingMale' },
                { headerName: 'Female', field: 'TeachingFemale' },
                { headerName: 'Unspecified', field: 'TeachingUnspecified' },
              ],
            },
            {
              headerName: 'Non Teaching',
              children: [
                { headerName: 'Male', field: 'NonTeachingMale' },
                { headerName: 'Female', field: 'NonTeachingFemale' },
                { headerName: 'Unspecified', field: 'NonTeachingUnspecified' },
              ],
            },
          ];

          this.rowData = [
            {
              TeachingMale: this.teachingMaleCount,
              TeachingFemale: this.teachingFeMaleCount,
              TeachingUnspecified: this.teachingUnspecifiedCount,
              NonTeachingMale: this.nonTeachingMaleCount,
              NonTeachingFemale: this.nonTeachingFeMaleCount,
              NonTeachingUnspecified: this.nonTeachingUnspecifiedCount,
            },
          ];
        }
      } else if (this.reportIdAction == '1005' && this.allResultDaata.length > 0) {
         this.rowData = [];
         this.columnDefs = [];
         if (this.regionWiseData == 'Station Wise') {
          var groupByEnrolementDate = function (xs: any, key: any) {
            return xs.reduce(function (rv: any, x: any) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };
          var groubedByEnrolmentDateResult = groupByEnrolementDate(
            this.allResultDaata,
            'station_name'
          );
          this.stationWiseArray = Object.entries(groubedByEnrolmentDateResult);
          for (let i = 0; i < this.stationWiseArray.length; i++) {
            this.newStationArray = this.stationWiseArray[i];
            this.stationNameInArray = this.stationWiseArray[i][0];
            this.retirement = 0;
            this.transfer = 0;
            this.death = 0;
            this.others = 0;
            this.promotion = 0;
            this.resignation = 0;
            for (let j = 0; j < this.newStationArray[1].length; j++) {
              if ( this.newStationArray[1][j]['employeedropid'] == 1)
              {
               this.retirement = this.newStationArray[1][j]['count'];
               // alert( this.teachingMaleCount)
             }
             if (this.newStationArray[1][j]['employeedropid'] == 2 ) {
               this.transfer = this.newStationArray[1][j]['count'];
             }
             if (this.newStationArray[1][j]['employeedropid'] == 3 ) {
               this.death = this.newStationArray[1][j]['count'];
             }
   
             if (this.newStationArray[1][j]['employeedropid'] == 4 ) {
               this.others =this.newStationArray[1][j]['count'];
             }
             if (this.newStationArray[1][j]['employeedropid'] == 5 ) {
               this.promotion = this.newStationArray[1][j]['count'];
             }
             if (this.newStationArray[1][j]['employeedropid'] == 6 ) {
               this.resignation = this.newStationArray[1][j]['count'];
             }
              this.rowanyDataForStation = [
                {
                  Station: this.stationNameInArray,
                  retirement: this.retirement,
                  transfer:this.transfer,
                  death: this.death, 
                  promotion:  this.promotion,
                  resignation:  this.resignation,
                  others: this.others,
                },
              ];
            }

            this.rowData.push(this.rowanyDataForStation[0]);
          }

          console.log('row data----------');
          console.log(this.rowData);
          this.columnDefs = [
            { headerName: 'Station', field: 'Station' },
            {headerName: "Retirement", field: "retirement",},
            {headerName: "Transfer", field: "transfer",},
            {headerName: "Death", field: "death",},
            {headerName: "Promotion", field: "promotion",},
            {headerName: "Resignation", field: "resignation",},
            {headerName: "Others", field: "others",},
          ];

        }

       else if (this.regionWiseData == 'Region Wise') {
          var groupByEnrolementDate = function (xs: any, key: any) {
            return xs.reduce(function (rv: any, x: any) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, {});
          };
          var groubedByEnrolmentDateResult = groupByEnrolementDate(
            this.allResultDaata,
            'region_name'
          );
          this.regionWiseArray = Object.entries(groubedByEnrolmentDateResult);
          console.log(this.regionWiseArray);
          for (let i = 0; i < this.regionWiseArray.length; i++) {
            this.newRegionArray = this.regionWiseArray[i];
            this.regionNameinArray = this.regionWiseArray[i][0];
            this.retirement = 0;
            this.transfer = 0;
            this.death = 0;
            this.others = 0;
            this.promotion = 0;
            this.resignation = 0;
            for (let j = 0; j < this.newRegionArray[1].length; j++) {

              if ( this.newRegionArray[1][j]['employeedropid'] == 1)
               {
                this.retirement = this.newRegionArray[1][j]['count'];
                // alert( this.teachingMaleCount)
              }
              if (this.newRegionArray[1][j]['employeedropid'] == 2 ) {
                this.transfer = this.newRegionArray[1][j]['count'];
              }
              if (this.newRegionArray[1][j]['employeedropid'] == 3 ) {
                this.death = this.newRegionArray[1][j]['count'];
              }
    
              if (this.newRegionArray[1][j]['employeedropid'] == 4 ) {
                this.others =this.newRegionArray[1][j]['count'];
              }
              if (this.newRegionArray[1][j]['employeedropid'] == 5 ) {
                this.promotion = this.newRegionArray[1][j]['count'];
              }
              if (this.newRegionArray[1][j]['employeedropid'] == 6 ) {
                this.resignation = this.newRegionArray[1][j]['count'];
              }
            
              this.rowanyData = [
                {
                  Region: this.regionNameinArray,
                  retirement: this.retirement,
                  transfer:this.transfer,
                  death: this.death, 
                  promotion:  this.promotion,
                  resignation:  this.resignation,
                  others: this.others,
                },
              ];
            }
            this.rowData.push(this.rowanyData[0]);
          }

          console.log('row data----------');
          console.log(this.rowData);
          this.columnDefs = [
            { headerName: 'Region', field: 'Region' },
            {headerName: "Retirement", field: "retirement",},
            {headerName: "Transfer", field: "transfer",},
            {headerName: "Death", field: "death",},
            {headerName: "Promotion", field: "promotion",},
            {headerName: "Resignation", field: "resignation",},
            {headerName: "Others", field: "others",},
          ];
        }
     else if(this.regionWiseData != 'Region Wise' && this.regionWiseData != 'Station Wise'){
        for (let i = 0; i < this.allResultDaata.length; i++) {
            this.sno=1;
          if ( this.allResultDaata[i]['employeedropid'] == 1)
           {
            this.retirement = this.allResultDaata[i]['count'];
            // alert( this.teachingMaleCount)
          }
          if (this.allResultDaata[i]['employeedropid'] == 2 ) {
            this.transfer = this.allResultDaata[i]['count'];
          }
          if (this.allResultDaata[i]['employeedropid'] == 3 ) {
            this.death = this.allResultDaata[i]['count'];
          }

          if (this.allResultDaata[i]['employeedropid'] == 4 ) {
            this.others = this.allResultDaata[i]['count'];
          }
          if (this.allResultDaata[i]['employeedropid'] == 5 ) {
            this.promotion = this.allResultDaata[i]['count'];
          }
          if (this.allResultDaata[i]['employeedropid'] == 6 ) {
            this.resignation = this.allResultDaata[i]['count'];
          }
        }

        this.columnDefs = [
          {headerName: "Retirement", field: "retirement",},
          {headerName: "Transfer", field: "transfer",},
          {headerName: "Death", field: "death",},
          {headerName: "Promotion", field: "promotion",},
          {headerName: "Resignation", field: "resignation",},
          {headerName: "Others", field: "others",},
        ];
     
        this.rowData = [
          {
            retirement: this.retirement,
            transfer:this.transfer,
            death: this.death, 
            promotion:  this.promotion,
            resignation:  this.resignation,
            others: this.others,
          },
        ];
      }

      } else if (this.reportIdAction == '1002') {
        this.rowData = this.allResultDaata.map((item, index) => ({
          ...item,
          sno: index + 1,
        }));

        this.columnDefs = [
          { headerName: 'S.No.', field: 'sno' },
          { headerName: 'KV Name', field: 'kv_name_present' },
          { headerName: 'Present Region Name', field: 'region_name_present' },
          { headerName: 'Present Station Name', field: 'station_name_present' },
          { headerName: 'Alloted KV Name', field: 'kv_name_alloted' },
          { headerName: 'Alloted Region Name', field: 'region_name_alloted' },
          { headerName: 'Transfer Type', field: 'transfer_type' },
          { headerName: 'Post Name', field: 'post_name' },
          { headerName: 'Category', field: 'transferred_under_cat_id' },
        ];
      } else if (this.reportIdAction == '1003') {
        this.rowData = this.allResultDaata.map((item, index) => ({
          ...item,
          sno: index + 1,
        }));

        this.columnDefs = [
          { headerName: 'S.No.', field: 'sno' },
          { headerName: 'KV Name', field: 'kv_name_present' },
          { headerName: 'Present Region Name', field: 'region_name_present' },
          { headerName: 'Present Station Name', field: 'station_name_present' },
          { headerName: 'Alloted KV Name', field: 'kv_name_alloted' },
          { headerName: 'Alloted Region Name', field: 'region_name_alloted' },
          { headerName: 'Transfer Type', field: 'transfer_type' },
          { headerName: 'Post Name', field: 'post_name' },
          { headerName: 'Category', field: 'transferred_under_cat_id' },
        ];
      }
    });
  }

  regionChange(event, change: any) {
    debugger;
    console.log(event);
    this.regionWiseData = event.region_name;
    if (event.region_name != 'All' && event.region_name != 'Region Wise') {
      this.stationStatus = true;
      this.schoolStatus = false;
    } else {
      this.stationStatus = false;
      this.schoolStatus = false;
    }
    this.firstTimeLoad = change;
    this.regionName = event.region_name;
    if (this.regionName == 'All') {
      this.menuHeader = [
        {
          label: 'Region(' + event.region_name + ')',
          icon: 'keyboard_arrow_right',
        },
      ];

      this.stationData = [];
      this.schoolData = [];
    } else {
      this.menuHeader = [
        {
          label: 'Region(' + event.region_name + ')',
          icon: 'keyboard_arrow_right',
        },
        { label: 'Station(All)', icon: 'keyboard_arrow_right' },
      ];
    }
    if (this.firstTimeLoad == 'Yes') {
      var data = { regionCode: event };
      this.outSideService.fetchStationByRegionId(data).subscribe((res) => {
        this.stationData = res.rowValue;
        if (this.stationData.length > 0) {
          this.stationData.splice(0, 0, {
            station_code: 'All',
            station_name: 'All',
          });
          this.stationData.splice(1, 1, {
            station_code: '99999',
            station_name: 'Station Wise',
          });
        }

        this.filteredStation.next(this.stationData.slice());
        this.stationGroups = [
          {
            names: this.stationData,
          },
        ];

        if (this.businessUnitTypeCode == 5) {
          for (let i = 0; i < this.stationData.length; i++) {
            if (this.stationData[i]['station_code'] == this.stationCode) {
              this.stationCtrl.setValue(this.stationData[i]);
            }
          }
          this.schoolStatus = true;
          this.getSchoolByStation(this.stationCode, 'Yes');
        } else {
          this.stationCtrl.setValue(this.stationData[0]);
        }
      });
    } else {
      debugger;
      var data12 = { regionCode: event.region_code };
      this.outSideService.fetchStationByRegionId(data12).subscribe((res) => {
        this.stationData = res.rowValue;

        console.log('STATION DATATAAAAAAAAAAA', this.stationData);
        if (this.stationData.length > 0) {
          this.stationData.splice(0, 0, {
            station_code: 'All',
            station_name: 'All',
            region_code: event.region_code,
          });
          this.stationData.splice(1, 1, {
            station_code: '99999',
            station_name: 'Station Wise',
            region_code: event.region_code,
          });
        }

        this.filteredStation.next(this.stationData.slice());
        this.stationGroups = [
          {
            names: this.stationData,
          },
        ];
        this.stationCtrl.setValue(this.stationData[0]);
      });
    }
    var data1 = {
      reportId: this.reportIdAction,
      region: event.region_code,
      station: 'All',
      school: '',
    };

    this.regionCode = event.region_code;
    this.getReportData(data1);
  }

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    floatingFilter: true,
    resizable: true,
  };

  public groupDisplayType: RowGroupingDisplayType = 'multipleColumns';
  gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
    },
    // debug: true,
    columnDefs: this.columnDefs,
    suppressAggFuncInHeader: true,
    rowData: null,
  };

  public autoGroupColumnDef: ColDef = {
    minWidth: 220,
  };

  onGridReady(params) {}

  getSchoolByStation(event, change: any) {
    this.regionWiseData = event.station_name;
    if (event.station_name != 'All' && event.station_name != 'Station Wise') {
      this.schoolStatus = true;
    } else {
      this.schoolStatus = false;
    }
    this.firstTimeLoad = change;
    this.stationName = event.stationName;
    if (this.stationName == 'All') {
      this.menuHeader = [
        {
          label: 'Region(' + this.regionName + ')',
          icon: 'keyboard_arrow_right',
        },
        {
          label: 'Station(' + event.stationName + ')',
          icon: 'keyboard_arrow_right',
        },
      ];
    } else {
      this.menuHeader = [
        {
          label: 'Region(' + this.regionName + ')',
          icon: 'keyboard_arrow_right',
        },
        {
          label: 'Station(' + event.stationName + ')',
          icon: 'keyboard_arrow_right',
        },
        { label: 'School(All)', icon: 'keyboard_arrow_right' },
      ];
    }
    debugger;
    if (this.firstTimeLoad == 'Yes') {
      this.stationForm.get('stationGroup').valueChanges.pipe(startWith(''));
      this.outSideService.fetchKvSchoolByStationCode(event).subscribe((res) => {
        this.schoolData = res.response;
        this.filteredSchool.next(this.schoolData.slice());

        this.schoolGroups = [
          {
            names: this.schoolData,
          },
        ];
        if (this.businessUnitTypeCode == 5) {
          for (let i = 0; i < this.schoolData.length; i++) {
            if (this.schoolData[i]['kvCode'] == this.kvCode) {
              this.schoolCtrl.setValue(this.schoolData[i]);
            }
          }
          // this.schoolStatus=true;
          // this.getSchoolByStation(this.stationCode,'Yes')
        }
        this.stationCode = event;
        var data1 = {
          reportId: this.reportIdAction,
          region: this.regionCodeFromService,
          station: this.stationCode,
          school: this.kvCode,
        };
        this.stationCode = event;
        this.getReportData(data1);
      });
    } else {
      this.stationForm.get('stationGroup').valueChanges.pipe(startWith(''));
      this.outSideService
        .fetchKvSchoolByStationCode(event.station_code)
        .subscribe((res) => {
          this.schoolData = res.response;
          this.filteredSchool.next(this.schoolData.slice());

          this.schoolGroups = [
            {
              names: this.schoolData,
            },
          ];
          this.stationCode = event.statinCode;
          if (this.firstTimeLoad != 'Yes') {
            var data1 = {
              reportId: this.reportIdAction,
              region: event.region_code,
              station: event.station_code,
              school: 'All',
            };
            this.stationCode = event.station_code;
            this.getReportData(data1);
          }
        });
    }
  }

  getStaffBySchool(event, change: any) {
    debugger;
    this.firstTimeLoad = change;
    if (event.kvName == 'All') {
      this.menuHeader = [
        {
          label: 'Region(' + this.regionName + ')',
          icon: 'keyboard_arrow_right',
        },
        {
          label: 'Station(' + this.stationName + ')',
          icon: 'keyboard_arrow_right',
        },
        { label: 'School(All)', icon: 'keyboard_arrow_right' },
      ];
    } else {
      this.menuHeader = [
        {
          label: 'Region(' + this.regionName + ')',
          icon: 'keyboard_arrow_right',
        },
        {
          label: 'Station(' + this.stationName + ')',
          icon: 'keyboard_arrow_right',
        },
        { label: 'School(' + event.kvName + ')', icon: 'keyboard_arrow_right' },
      ];
    }

    const datas = {
      reportId: this.reportId,
      reportType: 'SCH',
      reportValue: event.udiseSchCode,
      previous: this.stationCode,
    };

    if (this.firstTimeLoad != 'Yes') {
      var data1 = {
        reportId: this.reportIdAction,
        region: this.regionCode,
        station: this.stationCode,
        school: event.udiseSchCode,
      };

      this.getReportData(data1);
    }
  }
}
