import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresionBarComponent } from './progresion-bar.component';

describe('ProgresionBarComponent', () => {
  let component: ProgresionBarComponent;
  let fixture: ComponentFixture<ProgresionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgresionBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
