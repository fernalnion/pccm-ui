import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.less']
})
export class SecuredComponent {
  constructor(private authService:AuthService){}

  get year(){
    return new Date().getFullYear()
  }

  logout(){
    this.authService.logout();
  }
}
