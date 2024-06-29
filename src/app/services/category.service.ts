import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  public getCategory() {
    return this.httpClient.get(`${environment.API_URL}/emisson-category`, {
      headers: this.headers,
    });
  }

  public addCategory({ _id, ...category }: Category) {
    return this.httpClient.post(
      `${environment.API_URL}/emisson-category`,
      category,
      {
        headers: this.headers,
      }
    );
  }

  public deletCategory(id: string) {
    return this.httpClient.delete(
      `${environment.API_URL}/emisson-category/${id}`,
      {
        headers: this.headers,
      }
    );
  }
}
