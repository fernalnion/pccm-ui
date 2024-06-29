import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
      next: (roles: any) => {
        const rolesObject: { [roleid: string]: Role } = Object.fromEntries(
          roles.data.map((role: Role) => [role._id, role])
        );
        this.userService.getUsers().subscribe({
          next: (users: any) => {
            this.users = users.map((user: User) => ({
              ...user,
              role: rolesObject[user.role].name,
            }));
          },
          error: (error) => {
            this.notificationService.error('Error', error.message);
          },
        });
      },
    });
  }
}
