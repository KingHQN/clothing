import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn$: Observable<boolean>;
  length = 0;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.length$.subscribe(length => this.length = length);
    this.loggedIn$ = this.authService.loggedIn$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
