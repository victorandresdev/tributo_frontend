import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpRequest, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { environment } from '../environments/environment.development';
import { JwtInterceptor } from './interceptor/jwt.interceptor';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { globalErrorInterceptor } from './interceptor/error.interceptor';
import { provideNativeDateAdapter } from '@angular/material/core';

export function tokenGetter(){
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideNativeDateAdapter(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'es' },
    provideHttpClient(
      withInterceptors([globalErrorInterceptor])
    ),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    importProvidersFrom(MatProgressSpinnerModule),
  ]
};
