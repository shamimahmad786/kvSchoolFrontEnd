import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferReportChildComponent } from './transfer-report-child.component';

describe('TransferReportChildComponent', () => {
  let component: TransferReportChildComponent;
  let fixture: ComponentFixture<TransferReportChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferReportChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferReportChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
