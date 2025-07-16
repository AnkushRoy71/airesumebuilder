import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAuth0({
      domain: 'dev-x8hcbr1t80ivwfme.us.auth0.com',
      clientId: 'SLJM8gWit4yoVr0pbIZ24zeHyrv80eDe',
      authorizationParams: {
        redirect_uri:
          'https://airesumebuilder-production-b352.up.railway.app/resume',
      },
    }),
  ],
};
