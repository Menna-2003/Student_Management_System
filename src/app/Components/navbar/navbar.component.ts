import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private toggleButton: any;
  private sidebarVisible: boolean;
  isUserLogged: any;

  constructor(public location: Location, private element: ElementRef, private userAuthService: UserAuthService) {
    this.sidebarVisible = false;
    this.isUserLogged = this.userAuthService.isUserLogged;
  }

  ngOnInit(): void {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
  }

  logout() {
    this.isUserLogged = !this.isUserLogged;
    this.userAuthService.Logout();
  }
}
