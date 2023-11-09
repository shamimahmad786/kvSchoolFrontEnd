import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationWiseSchoolDetailComponent } from './station-wise-school-detail.component';

describe('StationWiseSchoolDetailComponent', () => {
  let component: StationWiseSchoolDetailComponent;
  let fixture: ComponentFixture<StationWiseSchoolDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationWiseSchoolDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationWiseSchoolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
