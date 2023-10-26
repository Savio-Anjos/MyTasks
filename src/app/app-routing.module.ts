import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterModule } from './pages/register/register.module';
import { UserAuthGuard } from './guards/user-auth.guard';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [UserAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
