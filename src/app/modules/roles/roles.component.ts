import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.less'],
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];

  constructor(
    private roleService: RoleService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
      next: (roles: any) => {
        this.roles = roles.data;
      },
      error: (error) => {
        this.notificationService.error('Error', error.message);
      },
    });
  }
}
