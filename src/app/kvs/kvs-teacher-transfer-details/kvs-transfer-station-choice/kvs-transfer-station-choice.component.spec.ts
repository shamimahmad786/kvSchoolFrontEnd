import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsTransferStationChoiceComponent } from './kvs-transfer-station-choice.component';

describe('KvsTransferStationChoiceComponent', () => {
  let component: KvsTransferStationChoiceComponent;
  let fixture: ComponentFixture<KvsTransferStationChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsTransferStationChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsTransferStationChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
