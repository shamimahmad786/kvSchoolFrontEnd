import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionWiseSchoolComponent } from './region-wise-school.component';

describe('RegionWiseSchoolComponent', () => {
  let component: RegionWiseSchoolComponent;
  let fixture: ComponentFixture<RegionWiseSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionWiseSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionWiseSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
