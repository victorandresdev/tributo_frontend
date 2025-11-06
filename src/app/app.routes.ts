import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login-component/login-component';
import { Not404Component } from './pages/not404-component/not404-component';
import { LayoutComponent } from './pages/layout-component/layout-component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/pages.routes').then((x) => x.routesPage),
  },
  {
    path: '**',
    component: Not404Component,
  },
];
