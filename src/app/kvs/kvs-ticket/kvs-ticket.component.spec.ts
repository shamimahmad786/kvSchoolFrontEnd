import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsTicketComponent } from './kvs-ticket.component';

describe('KvsTicketComponent', () => {
  let component: KvsTicketComponent;
  let fixture: ComponentFixture<KvsTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
