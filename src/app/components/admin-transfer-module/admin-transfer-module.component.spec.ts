import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransferModuleComponent } from './admin-transfer-module.component';

describe('AdminTransferModuleComponent', () => {
  let component: AdminTransferModuleComponent;
  let fixture: ComponentFixture<AdminTransferModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTransferModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTransferModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
