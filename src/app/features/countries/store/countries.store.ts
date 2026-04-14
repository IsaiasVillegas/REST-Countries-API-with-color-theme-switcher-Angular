import { signalStore, withComputed, withMethods, withState, patchState } from '@ngrx/signals';
import { Country } from '../../../core/models/country.model';
import { computed, inject } from '@angular/core';
import { CountriesService } from '../../../core/services/countries-service';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

export type State = {
  countries: Country[];
  searchTerm: string;
  selectedRegion: string;
  visibleCount: number;
  loading: boolean;
};

export const CountriesStore = signalStore(
  { providedIn: 'root' },
  withState({
    countries: [],
    searchTerm: '',
    selectedRegion: 'all',
    visibleCount: 8,
    loading: false,
  } as State),
  withComputed(({ countries, searchTerm, selectedRegion }) => ({
    filteredCountries: computed(() => {
      const term = searchTerm().toLowerCase();
      const region = selectedRegion();

      return countries().filter((c) => {
        const matchesSearch = c.name.toLowerCase().includes(term);
        const matchesRegion = region === 'all' || c.region.toLowerCase() === region;

        return matchesSearch && matchesRegion;
      });
    }),
  })),
  withComputed((store) => ({
    visibleCountries: computed(() => {
      return store.filteredCountries().slice(0, store.visibleCount());
    }),
  })),
  withMethods((store, countriesService = inject(CountriesService)) => ({
    loadCountries: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),

        switchMap(() => countriesService.getAll()),

        tap((countries) => {
          patchState(store, {
            countries,
            loading: false,
          });
        }),
      ),
    ),
    searchCountries: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((term) => patchState(store, { searchTerm: term, visibleCount: 8 })),
      ),
    ),

    setRegion(region: string) {
      patchState(store, { selectedRegion: region, visibleCount: 8 });
    },

    loadMore() {
      patchState(store, {
        visibleCount: store.visibleCount() + 8,
      });
    },
  })),
);
