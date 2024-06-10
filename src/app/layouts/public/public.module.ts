import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PublicRoutingModule } from './public.routing.module';
import { NgZorroModule } from 'src/app/nz-zorro.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    PublicRoutingModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
