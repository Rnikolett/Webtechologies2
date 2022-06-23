import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from 'src/model/LoginUser';
import { map } from 'rxjs/operators';
import * as moment from "moment";
import { Router } from '@angular/router';

const TOKEN_NAME = 'access_token';
const TIMEOUT_NAME = TOKEN_NAME + '_timeout';
const baseUrl = 'http://localhost:8080/api/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static loggedInUser: String;

  constructor(private http: HttpClient, private router:Router) { }

  private getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }
  
  async login(user: LoginUser){
    const returned = this.http.post<{ token: string, timeout: string, username: string}>(baseUrl+'auth', user)
      .pipe(map(result => {
        const expiresAt = moment().add(result.timeout, 's');
        localStorage.setItem(TOKEN_NAME, result.token);
        localStorage.setItem(TIMEOUT_NAME, JSON.stringify(expiresAt.valueOf()));
        AuthService.loggedInUser = result.username;
        this.router.navigate(['listAppointments']);

        return true;
      })
    );
    return returned.toPromise();
  }

  logout() {
    console.log("Logging out..");
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(TIMEOUT_NAME);
    this.router.navigate(['login']);
    AuthService.loggedInUser = '';
  }

  private isTimeOutedAndAutoLogout():boolean {
    const timeout = JSON.parse(localStorage.getItem(TIMEOUT_NAME));
    const isTimeExpired = moment().diff(timeout)>0;
    if (isTimeExpired) {
      this.logout()
    }
    return isTimeExpired;
  }


  public get loggedIn(): boolean {
    return (this.getToken() !== null)&&(!this.isTimeOutedAndAutoLogout());
  }

  public getLoggedInUser(): String{
    return AuthService.loggedInUser;
  }
 
}

