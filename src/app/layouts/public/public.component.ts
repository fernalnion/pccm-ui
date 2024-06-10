import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.less'],
})
export class PublicComponent {
  constructor(private authService: AuthService, private router:Router) {
    if(this.authService.isLoggedIn()){
      this.router.navigateByUrl('/dashbaord')
    }
  }
}
