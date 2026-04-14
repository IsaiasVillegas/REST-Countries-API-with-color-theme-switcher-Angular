import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeStore } from '../../core/store/theme-store';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  template: `
    <mat-toolbar class="w-full py-2 elevated">
      <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <span>Where in the world?</span>
        <button matButton="text" class="!px-0" (click)="themeStore.toggleTheme()">
          <mat-icon>{{ themeStore.theme() === 'dark' ? 'light_mode' : 'dark_mode' }}</mat-icon>

          {{ themeStore.theme() === 'dark' ? 'Light Mode' : 'Dark Mode' }}
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {
  themeStore = inject(ThemeStore);
}
