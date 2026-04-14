import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

const theme = localStorage.getItem('theme');

if (theme === 'dark') {
  document.documentElement.classList.add('dark');
}
