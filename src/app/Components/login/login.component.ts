import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { MatchPassword } from '../Custom-Validators/MatchPasswords';
import { LoginRequest } from 'src/app/Models/login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userRegisterForm: FormGroup;


  constructor(private UserAuth: UserAuthService, private formBuilder: FormBuilder, private router: Router) {

    this.userRegisterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
  }

  Submit() {
    let user: LoginRequest = {
      UserName: this.Email?.value,
      Password: this.Password?.value,
    }
    this.UserAuth.Login(user)
  }

  get Email() {
    return this.userRegisterForm.get('email');
  }
  get Password() {
    return this.userRegisterForm.get('password');
  }
}
