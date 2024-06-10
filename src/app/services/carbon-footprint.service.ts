import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';
import { Category } from '../models/category';
import { CarbonFootprint } from '../models/carbon-footprint';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintService {
  constructor(private httpClient: HttpClient) {}
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  public getCarbonFootprint() {
    return this.httpClient.get<{ data: CarbonFootprint[] }>(
      `${environment.API_URL}/carbon-footprint`,
      {
        headers: this.headers,
      }
    );
  }

  public addCarbonFootprint({ _id, ...carbonFootprint }: CarbonFootprint) {
    return this.httpClient.post(
      `${environment.API_URL}/carbon-footprint`,
      carbonFootprint,
      {
        headers: this.headers,
      }
    );
  }

  public deleteCarbonFootprint(id: string) {
    return this.httpClient.delete(
      `${environment.API_URL}/carbon-footprint/${id}`,
      {
        headers: this.headers,
      }
    );
  }
}
