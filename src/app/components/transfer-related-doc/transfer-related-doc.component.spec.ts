import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRelatedDocComponent } from './transfer-related-doc.component';

describe('TransferRelatedDocComponent', () => {
  let component: TransferRelatedDocComponent;
  let fixture: ComponentFixture<TransferRelatedDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferRelatedDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferRelatedDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
