import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvSchoolMappingComponent } from './kv-school-mapping.component';

describe('KvSchoolMappingComponent', () => {
  let component: KvSchoolMappingComponent;
  let fixture: ComponentFixture<KvSchoolMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvSchoolMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvSchoolMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
