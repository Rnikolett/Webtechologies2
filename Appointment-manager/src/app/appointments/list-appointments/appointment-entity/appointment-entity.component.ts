import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/model/Appointment';
import { AppointmentService } from 'src/service/appointment.service';
import { AuthService } from 'src/service/auth.service';

const NEAR_DAY=8
const NEAR = NEAR_DAY * 24 * 60 * 60 * 1000;
@Component({
  selector: 'app-appointment-entity',
  templateUrl: './appointment-entity.component.html',
  styleUrls: ['./appointment-entity.component.css']
})
export class AppointmentEntityComponent implements OnInit {

  @Input()
  appointment: Appointment;
  show: boolean = true;
  showBody: boolean;


  constructor(private appointmentService:AppointmentService,private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.showBody = this.isItFit();
  }

  isItNear() {
    return new Date(this.appointment.date).getTime() - new Date().getTime()  < NEAR;
  }

  isItExpired() {
    return new Date(this.appointment.date).getTime() - new Date().getTime() < 0;
  }

  modify() {
    if (this.authService.loggedIn) {
      const navigationString = "editAppointment";
      const id = this.appointment._id;
      this.router.navigate(["editAppointment", { id: id }]);
    }
  }

  delete() {
    if (this.authService.loggedIn) {
      this.appointmentService.deleteAppointment(this.appointment);
      this.show = false;
    }
  }

  isItFit() {
    return this.appointment.body.length < 100;
  }

  toggleCollapse() {
    this.showBody = !this.showBody;
  }
  
  isItVisible() {
    return this.showBody;
  }


}
