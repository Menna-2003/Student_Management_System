import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private UserAuth: UserAuthService) { }

  ngOnInit(): void {
  }

  Login() {
    this.UserAuth.Login()
  }

}
