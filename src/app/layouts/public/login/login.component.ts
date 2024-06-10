import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private notificationService: NzNotificationService
  ) {}

  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember : FormControl<boolean>
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember:[false]
  });

  ngOnInit(): void {}

  signIn() {
    if (this.loginForm.valid) {
      this.authService.signIn(<Login>this.loginForm.value).subscribe({
        next : (data)=>{
          this.router.navigateByUrl('/dashboard');
        },
        error : (error)=>{
          this.notificationService.error('Error', error.message);
        }
      }
      );
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
