import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionWiseStationDetailComponent } from './region-wise-station-detail.component';

describe('RegionWiseStationDetailComponent', () => {
  let component: RegionWiseStationDetailComponent;
  let fixture: ComponentFixture<RegionWiseStationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionWiseStationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionWiseStationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
