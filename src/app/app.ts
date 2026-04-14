import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ThemeStore } from './core/store/theme-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <app-header />
    <router-outlet />
  `,
  styles: [],
})
export class App {
  themeStore = inject(ThemeStore);

  constructor() {
    effect(() => {
      const theme = this.themeStore.theme();

      const html = document.documentElement;

      if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    });
  }
}
