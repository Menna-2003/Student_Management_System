import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private UserAuth: UserAuthService) { }

  ngOnInit(): void {
  }
  Register() {
    this.UserAuth.Register()
  }

}
