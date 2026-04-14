import { Component, effect, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CountriesStore } from '../../../features/countries/store/countries.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search-input',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIcon],
  template: `
    <mat-form-field appearance="fill" class="w-full">
      <input
        [formControl]="searchControl"
        matInput
        placeholder="Search for a country..."
        class="b"
      />
      <mat-icon matPrefix>search</mat-icon>
    </mat-form-field>
  `,
  styles: ``,
})
export class SearchInput implements OnInit {
  searchControl = new FormControl('');
  store = inject(CountriesStore) as InstanceType<typeof CountriesStore>;

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      this.store.searchCountries(value ?? '');
    });
  }

  constructor() {
    effect(() => {
      const term = this.store.searchTerm();

      if (this.searchControl.value !== term) {
        this.searchControl.setValue(term, { emitEvent: false });
      }
    });
  }
}
