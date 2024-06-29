import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SecuredComponent } from './secured.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { UsersComponent } from 'src/app/modules/users/users.component';
import { RolesComponent } from 'src/app/modules/roles/roles.component';
import { CategoryComponent } from 'src/app/modules/category/category.component';
import { ActivitiesComponent } from 'src/app/modules/activities/activities.component';

const routes: Routes = [
  {
    path: '',
    component: SecuredComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'activity',
        component: ActivitiesComponent,
        data: { breadcrumb: 'Activity' },
      },
      {
        path: 'settings',
        children: [
          {
            path: 'users',
            component: UsersComponent,
            data: { breadcrumb: 'Users' },
          },
          {
            path: 'roles',
            component: RolesComponent,
            data: { breadcrumb: 'Roles' },
          },
          {
            path: 'category',
            component: CategoryComponent,
            data: { breadcrumb: 'Category' },
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecuredRoutingModule {}
