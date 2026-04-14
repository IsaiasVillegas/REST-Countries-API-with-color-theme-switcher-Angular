import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryCard } from '../../../../shared/components/country-card/country-card';
import { CountriesStore } from '../../store/countries.store';
import { SearchInput } from '../../../../shared/components/search-input/search-input';
import { RegionFilter } from '../../../../shared/components/region-filter/region-filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CountryCard,
    SearchInput,
    RegionFilter,
  ],
  template: `
    <div class="px-6">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex flex-col lg:flex-row justify-between mt-10 mb-5">
          <app-search-input class="w-full max-w-[450px]" />

          <app-region-filter (valueChange)="store.setRegion($event)" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-14">
          @for (country of store.visibleCountries(); track country.name; let i = $index) {
            <app-country-card
              [country]="country"
              (select)="goToDetail($event)"
              class="opacity-0 animate-fade-in"
              [style.animationDelay.ms]="i * 50"
            />
          }
        </div>
        <div #anchor class="h-10"></div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class CountriesList implements OnInit, AfterViewInit, OnDestroy {
  store = inject(CountriesStore) as InstanceType<typeof CountriesStore>;

  router = inject(Router);

  @ViewChild('anchor') anchor!: ElementRef;

  ngOnInit() {
    this.store.loadCountries();
  }

  goToDetail(code: string) {
    this.router.navigate([`/${code}`]);
  }

  private observer!: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (
        entry.isIntersecting &&
        this.store.visibleCountries().length < this.store.filteredCountries().length
      ) {
        this.store.loadMore();
      }
    });

    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
