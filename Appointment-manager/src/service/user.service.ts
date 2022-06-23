import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/User';


const baseUrl = 'http://localhost:8080/api/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  async create(user:User) {
    const url = baseUrl + "/create";
    return this.http.post(url, user);
  }

}
