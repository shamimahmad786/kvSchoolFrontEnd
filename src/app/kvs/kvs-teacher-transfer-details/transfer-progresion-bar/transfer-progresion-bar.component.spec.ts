import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferProgresionBarComponent } from './transfer-progresion-bar.component';

describe('TransferProgresionBarComponent', () => {
  let component: TransferProgresionBarComponent;
  let fixture: ComponentFixture<TransferProgresionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferProgresionBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferProgresionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
