import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { apiBaseUrlInterceptor } from './core/interceptors/api-base-url.interceptor';
import { apiErrorInterceptor } from './core/interceptors/api-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([apiBaseUrlInterceptor, apiErrorInterceptor])
    ),
    provideAnimationsAsync(),
  ],
};
