import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Pagos } from './contrib/pagos/pagos';

export const routesPage: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'pagos', component: Pagos },
  {
    path: 'pagos',
    loadChildren: () =>
      import('./contrib/contrib.routes').then((x) => x.routesPagos),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((x) => x.routesAdmin),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
