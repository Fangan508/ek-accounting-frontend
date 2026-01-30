import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { BankBooksState } from './features/accountings/state/bank-books/bank-books.state';
import { environment } from 'environments/environment.local';
import { BASE_PATH as accountingsBasePath } from '@ek/autogen/accountings/variables';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalService } from '@azure/msal-angular';
import { MSALGuardConfigFactory, MSALInstanceFactory, MSALInterceptorConfigFactory } from './core/msal-config/msal-config';
// import { msalFunctionalInterceptor } from 'msal-functional.interceptor';

import { APP_ROUTES } from './core/routing/app.routes';
import { clearStorageOnVersionChange, PERSISTED_STATE_KEY } from './core/storage/utils/storage.utils';

clearStorageOnVersionChange();

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideAnimations(),
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
        keys: PERSISTED_STATE_KEY
      }),
      withNgxsLoggerPlugin({
        disabled: environment.production
      })
    ),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ]

    
};

function provideAnimations(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}
