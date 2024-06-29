import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./layouts/public/public.module').then(
        (module) => module.PublicModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layouts/secured/secured.module').then(
        (module) => module.SecuredModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
