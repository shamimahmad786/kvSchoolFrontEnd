import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelTransferModuleComponent } from './excel-transfer-module.component';

describe('ExcelTransferModuleComponent', () => {
  let component: ExcelTransferModuleComponent;
  let fixture: ComponentFixture<ExcelTransferModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelTransferModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelTransferModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
