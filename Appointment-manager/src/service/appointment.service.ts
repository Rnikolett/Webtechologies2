import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from 'src/model/Appointment';

const baseUrl = 'http://localhost:8080/api/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  async save(appointment: Appointment) {
    const url = baseUrl + "/create";
    const ret = this.http.post(baseUrl + "/create", appointment).toPromise();
    return ret;
  }

  async getAll() {
    const url = baseUrl + "/getByUser";
    const ret = this.http.get<Appointment[]>(url).toPromise();
    return ret;
  }

  async deleteAppointment(appointment:Appointment) {
    const url = baseUrl + "/delete";
    const id = appointment._id;
    const ret = this.http.delete(url+"/id="+id).toPromise();
    return ret;
  }

  async updateAppointment(appointment: Appointment) {
    const url = baseUrl + "/update";
    const ret = this.http.put(baseUrl+"/update",appointment).toPromise();
    return ret;
  }

  async getById(getId: string) {
    const url = baseUrl + "/getById";
    return await this.http.get<Appointment>(url + "/id=" + getId).toPromise();
  }

}
