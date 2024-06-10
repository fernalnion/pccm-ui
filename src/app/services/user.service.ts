import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  public getUsers() {
    return this.httpClient.get(`${environment.API_URL}/user`, {
      headers: this.headers,
    });
  }

  public addUser({ _id, ...user }: User) {
    return this.httpClient.post(`${environment.API_URL}/user`, user, {
      headers: this.headers,
    });
  }

  public deleteUser(id: string) {
    return this.httpClient.delete(`${environment.API_URL}/user/${id}`, {
      headers: this.headers,
    });
  }
}
