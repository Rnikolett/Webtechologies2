import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/model/Appointment';
import { AppointmentService } from 'src/service/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    body: ['', ],
    date: [, [Validators.required]],
  })
  private id = null;
  isItEdit: boolean;
  appointment: Appointment;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, private route: ActivatedRoute,private router:Router) { }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isItEdit = this.id != null;
    if (this.isItEdit) {
      this.appointment = await this.appointmentService.getById(this.id);
      this.appointmentForm.controls['title'].setValue(this.appointment.title);
      this.appointmentForm.controls['body'].setValue(this.appointment.body);
      this.appointmentForm.controls['date'].setValue(this.getFormattedDate(this.appointment.date));
    }
  }

  private getFormattedDate(date) {
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

  getToday() {
    return this.getFormattedDate(new Date())
  }

  async save() {
    const appointment: Appointment = this.appointmentForm.value;
    await this.appointmentService.save(appointment);
    this.router.navigate(["listAppointments"]);
  }

  async edit() {
    const appointment: Appointment = this.appointmentForm.value;
    appointment._id = this.appointment._id;
    await this.appointmentService.updateAppointment(appointment);
    this.router.navigate(["listAppointments"]);
  }

  get date() {
    return this.appointmentForm.get("date");
  }

  get title() {
    return this.appointmentForm.get("title");
  }
}
