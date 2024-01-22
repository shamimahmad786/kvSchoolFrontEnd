import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportdatamodelComponent } from './reportdatamodel.component';

describe('ReportdatamodelComponent', () => {
  let component: ReportdatamodelComponent;
  let fixture: ComponentFixture<ReportdatamodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportdatamodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportdatamodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
