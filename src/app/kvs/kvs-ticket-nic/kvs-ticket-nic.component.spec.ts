import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsTicketNicComponent } from './kvs-ticket-nic.component';

describe('KvsTicketNicComponent', () => {
  let component: KvsTicketNicComponent;
  let fixture: ComponentFixture<KvsTicketNicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsTicketNicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsTicketNicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
