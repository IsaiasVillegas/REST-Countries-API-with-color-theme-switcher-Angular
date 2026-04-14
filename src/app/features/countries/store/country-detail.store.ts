import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { CountryDetail } from '../../../core/models/country-detail.model';
import { computed, inject } from '@angular/core';
import { CountriesService } from '../../../core/services/countries-service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Country } from '../../../core/models/country.model';
import { CountriesStore } from './countries.store';

type State = {
  country: CountryDetail | null;
  countries: Country[];
  loading: boolean;
};

export const CountryDetailStore = signalStore(
  { providedIn: 'root' },

  withState<State>({
    country: null,
    countries: [],
    loading: false,
  }),

  withMethods((store, service = inject(CountriesService)) => ({
    loadCountry: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true })),

        switchMap((code) => service.getDetailByCode(code)),

        tap((country) => {
          patchState(store, {
            country,
            loading: false,
          });
        }),
      ),
    ),
  })),

  withComputed((store, countriesStore = inject(CountriesStore)) => {
    return {
      borderCountries: computed<Country[]>(() => {
        const country = store.country();
        const allCountries = countriesStore.countries();

        if (!country || !country.borders?.length) return [];

        return country.borders
          .map((code) => allCountries.find((c) => c.alpha3Code === code))
          .filter((c): c is Country => !!c);
      }),
    };
  }),
);
