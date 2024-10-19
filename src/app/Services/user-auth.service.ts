import { Injectable } from '@angular/core';
import { CreateUserRequest } from '../Models/create-user-request';
import { LoginRequest } from '../Models/login-request';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  newUser: CreateUserRequest = {
    Name: 'menna',
    UserName: 'mennamohamed',
    Password: '123456',
  }
  user: LoginRequest = {
    UserName: 'mennamohamed',
    Password: '123456',
  }

  constructor(private userService: UserService) { }

  Register() {
    this.userService.createUser(this.newUser).subscribe({
      next: (response) => {
        console.log('User Created successfully: ', response);
        localStorage.setItem('token', response.Data);
      },
      error: (err) => {
        console.error('Error Creating User: ', err);
        if (err.error && err.error.errors) {
          console.error('Validation errors: ', err.error.errors);
        }
      }
    })
  }

  get isUserLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  Logout() {
    let token = localStorage.getItem('token')
    if (this.isUserLogged && token) {
      this.userService.logout(token).subscribe({
        next: (response) => {
          console.log('Logged out successfully: ', response);
          localStorage.removeItem('token');
        },
        error: (err) => {
          console.error('Error Logging out: ', err);
          if (err.error && err.error.errors) {
            console.error('Validation errors: ', err.error.errors);
          }
        }
      })

    }
    else {
      console.log('No user logged in')
    }
  }

  Login() {
    this.userService.login(this.user).subscribe({
      next: (response) => {
        console.log('Logged in successfully: ', response);
        localStorage.setItem('token', response.Data);
      },
      error: (err) => {
        console.error('Error Logging in: ', err);
        if (err.error && err.error.errors) {
          console.error('Validation errors: ', err.error.errors);
        }
      }
    })


  }

}
