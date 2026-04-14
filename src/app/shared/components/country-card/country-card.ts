import { Component, input, output } from '@angular/core';
import { Country } from '../../../core/models/country.model';
import { DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-country-card',
  imports: [MatCardModule, DecimalPipe],
  template: `
    <mat-card
      appearance="filled"
      (click)="onClick()"
      class="cursor-pointer max-w-[280px] transition-all duration-200 ease-out hover:-translate-y-1"
    >
      <img
        mat-card-image
        [src]="country().flag"
        [alt]="country().name"
        class="w-full h-40 object-cover"
      />
      <div class="px-5 py-8">
        <h2 class="font-bold text-lg mb-2">{{ country().name }}</h2>
        <p><strong>Population:</strong> {{ country().population | number }}</p>
        <p><strong>Region:</strong> {{ country().region }}</p>
        <p><strong>Capital:</strong> {{ country().capital }}</p>
      </div>
    </mat-card>
  `,
  styles: ``,
})
export class CountryCard {
  country = input.required<Country>();

  select = output<string>();

  onClick() {
    this.select.emit(this.country().alpha3Code);
  }
}
