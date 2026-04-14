// features/countries/countries.routes.ts
import { Routes } from '@angular/router';

export const COUNTRIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/countries-list/countries-list'),
  },
  {
    path: ':code',
    loadComponent: () => import('./pages/country-detail/country-detail'),
  },
];
