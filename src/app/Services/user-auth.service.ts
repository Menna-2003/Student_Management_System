import { Injectable } from '@angular/core';
import { CreateUserRequest } from '../Models/create-user-request';
import { LoginRequest } from '../Models/login-request';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private userService: UserService) { }

  Register(newUser: CreateUserRequest) {
    this.userService.createUser(newUser).subscribe({
      next: (response) => {
        console.log('User Created successfully: ', response);
        this.Login(newUser)
        // localStorage.setItem('token', response.Data);
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

  Login(user: LoginRequest) {
    this.userService.login(user).subscribe({
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
