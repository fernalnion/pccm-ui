import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuredComponent } from './secured.component';
import { NgZorroModule } from 'src/app/nz-zorro.module';
import { SecuredRoutingModule } from './secured.routing.module';
import { UsersComponent } from 'src/app/modules/users/users.component';
import { RolesComponent } from 'src/app/modules/roles/roles.component';
import { CategoryComponent } from 'src/app/modules/category/category.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivitiesComponent } from 'src/app/modules/activities/activities.component';



@NgModule({
  declarations: [
    SecuredComponent,
    UsersComponent,
    RolesComponent,
    CategoryComponent,
    BreadcrumbsComponent,
    DashboardComponent,
    ActivitiesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroModule,
    SecuredRoutingModule
  ]
})
export class SecuredModule { 
}
