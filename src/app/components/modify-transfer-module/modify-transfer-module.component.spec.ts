import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTransferModuleComponent } from './modify-transfer-module.component';

describe('ModifyTransferModuleComponent', () => {
  let component: ModifyTransferModuleComponent;
  let fixture: ComponentFixture<ModifyTransferModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyTransferModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTransferModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
