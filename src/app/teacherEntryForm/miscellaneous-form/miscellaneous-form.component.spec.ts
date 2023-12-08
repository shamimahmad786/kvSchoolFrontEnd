import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousFormComponent } from './miscellaneous-form.component';

describe('MiscellaneousFormComponent', () => {
  let component: MiscellaneousFormComponent;
  let fixture: ComponentFixture<MiscellaneousFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscellaneousFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
