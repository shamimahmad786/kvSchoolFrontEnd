import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsTeacherTransferDetailsComponent } from './kvs-teacher-transfer-details.component';

describe('KvsTeacherTransferDetailsComponent', () => {
  let component: KvsTeacherTransferDetailsComponent;
  let fixture: ComponentFixture<KvsTeacherTransferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsTeacherTransferDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsTeacherTransferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
