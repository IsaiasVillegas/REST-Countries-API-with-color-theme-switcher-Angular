import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/countries/countries.routes').then((m) => m.COUNTRIES_ROUTES),
  },
];
