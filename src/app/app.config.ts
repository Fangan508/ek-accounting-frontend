import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { BankBooksState } from './features/state/bank-books/bank-books.state';
import { environment } from 'environments/environment.local';
import { BASE_PATH as accountingsBasePath } from '@ek/autogen/accountings/variables';

import { routes } from './app.routes';
import { APP_ROUTES } from './core/routing/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(APP_ROUTES),
    
    provideHttpClient(),

    {
      provide: accountingsBasePath,
      useValue: environment.apiUrl.accountings
    },

    provideStore(
      [BankBooksState],
      {
        developmentMode: !environment.production
      },
      withNgxsStoragePlugin({
        keys: '*'
      }),
      withNgxsLoggerPlugin({
        disabled: environment.production
      })
    )
  ]

    
};