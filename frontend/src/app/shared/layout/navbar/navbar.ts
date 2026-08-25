import {
  Component,
  inject
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import {
  AuthService
} from '../../../core/auth/auth.service';


@Component({
  selector: 'app-navbar',

  imports: [
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './navbar.html',

  styleUrl: './navbar.css'
})
export class Navbar {

  private readonly authService =
    inject(AuthService);


  /*
   * Signals venant de AuthService.
   */
  readonly isAuthenticated =
    this.authService.isAuthenticated;

  readonly currentUser =
    this.authService.currentUser;


  menuOpen = false;


  toggleMenu(): void {

    this.menuOpen =
      !this.menuOpen;
  }


  closeMenu(): void {

    this.menuOpen =
      false;
  }


  logout(): void {

    this.closeMenu();

    this.authService.logout();
  }
}
