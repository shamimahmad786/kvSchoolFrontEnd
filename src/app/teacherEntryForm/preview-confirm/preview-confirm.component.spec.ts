import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewConfirmComponent } from './preview-confirm.component';

describe('PreviewConfirmComponent', () => {
  let component: PreviewConfirmComponent;
  let fixture: ComponentFixture<PreviewConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
