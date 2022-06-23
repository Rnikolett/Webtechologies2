import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentEntityComponent } from './appointment-entity.component';

describe('AppointmentEntityComponent', () => {
  let component: AppointmentEntityComponent;
  let fixture: ComponentFixture<AppointmentEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
