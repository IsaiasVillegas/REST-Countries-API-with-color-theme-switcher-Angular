import { Component, output } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-region-filter',
  imports: [MatSelectModule],
  template: `
    <mat-form-field appearance="fill" class="w-full max-w-[200px]">
      <mat-label>Filter by Region</mat-label>
      <mat-select (selectionChange)="valueChange.emit($event.value)">
        <mat-option value="all">All Regions</mat-option>
        @for (region of regions; track region.value) {
          <mat-option [value]="region.value">{{ region.viewValue }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  styles: ``,
})
export class RegionFilter {
  valueChange = output<string>();

  regions = [
    { value: 'africa', viewValue: 'Africa' },
    { value: 'americas', viewValue: 'America' },
    { value: 'asia', viewValue: 'Asia' },
    { value: 'europe', viewValue: 'Europe' },
    { value: 'oceania', viewValue: 'Oceania' },
  ];
}
