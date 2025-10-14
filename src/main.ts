import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
  bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)
  ]
}).catch(err => console.error(err));
