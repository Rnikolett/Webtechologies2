import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { UserService } from '../../../service/user.service'

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  regForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    address: ['',[Validators.required]],
    name: ['',[Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['',[Validators.required]]
  })

  passwordMatch = false;

  constructor(private userservice: UserService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  async register() {
    if (this.doesTwoPasswordsMatch) {
      const user = this.regForm.value;
      delete user.password2;
      user.password = sha256(user.password);
      (await this.userservice.create(user)).subscribe(() =>
        this.router.navigate(["/login"]));
    }
  }
  
  get email() {
    return this.regForm.get("email");
  }

  get address() {
    return this.regForm.get("address");
  }

  get name() {
    return this.regForm.get("name");
  }

  get password() {
    return this.regForm.get("password");
  }

  get password2() {
    return this.regForm.get("password2");
  }

  doesTwoPasswordsMatch() {
    this.passwordMatch = this.regForm.value.password == this.regForm.value.password2;
    return this.passwordMatch;
  }

}