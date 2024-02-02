import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsTransferPreviewUndertakingComponent } from './kvs-transfer-preview-undertaking.component';

describe('KvsTransferPreviewUndertakingComponent', () => {
  let component: KvsTransferPreviewUndertakingComponent;
  let fixture: ComponentFixture<KvsTransferPreviewUndertakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsTransferPreviewUndertakingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsTransferPreviewUndertakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
