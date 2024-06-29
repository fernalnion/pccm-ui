import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  public getRoles() {
    return this.httpClient.get(`${environment.API_URL}/role`, {
      headers: this.headers,
    });
  }

  public addRole({ _id, ...role }: Role) {
    return this.httpClient.post(`${environment.API_URL}/role`, role, {
      headers: this.headers,
    });
  }

  public deletRole(id: string) {
    return this.httpClient.delete(`${environment.API_URL}/role/${id}`, {
      headers: this.headers,
    });
  }
}
