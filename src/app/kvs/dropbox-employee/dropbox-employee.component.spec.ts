import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropboxEmployeeComponent } from './dropbox-employee.component';

describe('DropboxEmployeeComponent', () => {
  let component: DropboxEmployeeComponent;
  let fixture: ComponentFixture<DropboxEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropboxEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropboxEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
