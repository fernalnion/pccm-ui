import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public signIn(loginData: Login) {
    return this.httpClient
      .post<any>(`${environment.API_URL}/auth/login`, loginData, {
        headers: this.headers,
      })
      .pipe(
        tap((data) => {
          if (data) {
            localStorage.setItem('ACCESS_TOKEN', data.data.access_token);
          }
        })
      );
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.router.navigateByUrl('/auth/login');
  }

  public getToken(){
    return localStorage.getItem('ACCESS_TOKEN')
  }
}
