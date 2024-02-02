import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsTransferMiscellaneusComponent } from './kvs-transfer-miscellaneus.component';

describe('KvsTransferMiscellaneusComponent', () => {
  let component: KvsTransferMiscellaneusComponent;
  let fixture: ComponentFixture<KvsTransferMiscellaneusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsTransferMiscellaneusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsTransferMiscellaneusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
