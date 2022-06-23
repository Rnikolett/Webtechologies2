import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { AuthService } from 'src/service/auth.service';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['email@email.com', [Validators.required, Validators.email]],
    password: ['',[Validators.required]]
  })


  loginStatus = true;

  constructor(private authService:AuthService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginStatus = true;
  }

  async login() {
    let requestedUser = null;
    requestedUser = this.loginForm.value;
    requestedUser.password = sha256(requestedUser.password);
    this.loginStatus = false;
    const ret = await this.authService.login(requestedUser);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}