import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CountryDetailStore } from '../../store/country-detail.store';
import { DecimalPipe } from '@angular/common';
import { BackButton } from '../../../../shared/components/back-button/back-button';
import { CountriesStore } from '../../store/countries.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-country-detail',
  imports: [DecimalPipe, BackButton, MatAnchor],
  template: `
    <div class="max-w-[1200px] mx-auto px-6 lg:px-0">
      <app-back-button label="Back" navigateTo="/" class="mt-8 mb-15" />

      @if (store.loading()) {
        <p>Loading...</p>
      } @else {
        @if (store.country(); as country) {
          <div class="grid md:grid-cols-2 gap-10 md:gap-25 items-center">
            <img
              [src]="country.flag"
              class="md:w-full h-[250px] lg:h-[370px] rounded shadow-lg justify-self-center"
            />

            <div>
              <h1 class="text-2xl font-bold mb-5">{{ country.name }}</h1>

              <div class="flex flex-col sm:flex-row gap-8 justify-between mb-15">
                <div class="space-y-2">
                  <p><strong>Native Name:</strong> {{ country.nativeName }}</p>
                  <p><strong>Population:</strong> {{ country.population | number }}</p>
                  <p><strong>Region:</strong> {{ country.region }}</p>
                  <p><strong>Sub Region:</strong> {{ country.subregion }}</p>
                  <p><strong>Capital:</strong> {{ country.capital || 'N/A' }}</p>
                </div>

                <div class="space-y-2">
                  <p>
                    <strong>Top Level Domain:</strong>
                    {{ country.topLevelDomain }}
                  </p>
                  <p>
                    <strong>Currencies:</strong>
                    {{ country.currencies.join(', ') || 'N/A' }}
                  </p>

                  <p>
                    <strong>Languages:</strong>
                    {{ country.languages.join(', ') }}
                  </p>
                </div>
              </div>

              <div>
                <strong>Border Countries:</strong>

                <div class="flex flex-wrap gap-2 mt-2">
                  @if (store.borderCountries().length === 0) {
                    <p>No border countries</p>
                  }

                  @for (border of store.borderCountries(); track border.alpha3Code) {
                    <button matButton="elevated" (click)="goToDetail(border.alpha3Code)">
                      {{ border.name }}
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: ``,
})
export default class CountryDetail {
  store = inject(CountryDetailStore) as InstanceType<typeof CountryDetailStore>;
  route = inject(ActivatedRoute);
  router = inject(Router);
  countriesStore = inject(CountriesStore);

  code = toSignal(this.route.paramMap.pipe(map((params) => params.get('code') ?? '')), {
    initialValue: '',
  });

  constructor() {
    this.countriesStore.loadCountries();

    effect(() => {
      const code = this.code();

      if (code) {
        this.store.loadCountry(code);
      }
    });
  }

  goToDetail(code: string) {
    const encoded = encodeURIComponent(code);
    this.router.navigate([`/${encoded}`]);
  }
}
