import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';

export const routesPage: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
