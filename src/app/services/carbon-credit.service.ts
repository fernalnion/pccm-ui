import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarbonCreditService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  public getCredit() {
    return this.httpClient.get(`${environment.API_URL}/carbon-credit/user`, {
      headers: this.headers,
    });
  }
}
