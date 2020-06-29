import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User, Auth } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  loggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  constructor(private router: Router, private http: HttpClient, private cartService: CartService) { }

  getAuthUser() {
    if (localStorage.getItem('auth-token')) {
      this.loggedIn.next(true);
    }
  }

  login(user: User) {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };
    if (user.email.trim() !== '' && user.password.trim() !== '') {
      return this.http.post('https://clothing-angular.herokuapp.com/api/auth/login', user, config).pipe(map(data => {
        // tslint:disable-next-line: no-string-literal
        localStorage.setItem('auth-token', data['token']);
        this.loggedIn.next(true);

        return data;
      }));
    }
  }

  logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('cart');
    this.cartService.fetchFromLocalStorage();
    this.loggedIn.next(false);
  }
}
