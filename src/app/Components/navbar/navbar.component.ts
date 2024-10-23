import { Component, OnInit, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private toggleButton: any;
  private sidebarVisible: boolean;

  isUserLogged: boolean = false;
  private authSubscription!: Subscription;

  constructor(public location: Location, private element: ElementRef, private userAuthService: UserAuthService) {

    this.sidebarVisible = false;
    this.isUserLogged = this.userAuthService.isUserLogged;

  }

  ngOnInit(): void {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

    this.authSubscription = this.userAuthService.isLogged$.subscribe(
      (isLoggedIn) => {
        this.isUserLogged = isLoggedIn;
      }
    );

  }

  logout() {
    // this.isUserLogged = !this.isUserLogged;
    this.userAuthService.Logout();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
