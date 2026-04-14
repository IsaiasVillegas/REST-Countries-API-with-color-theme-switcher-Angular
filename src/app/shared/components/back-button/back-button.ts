import { Component, input } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-back-button',
  imports: [MatAnchor, RouterLink, MatIcon],
  template: `
    <button
      matButton="elevated"
      [routerLink]="navigateTo() ?? null"
      class="flex items-center gap-1"
    >
      <mat-icon>arrow_back</mat-icon>
      {{ label() }}
    </button>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class BackButton {
  label = input('');
  navigateTo = input<string>();
}
