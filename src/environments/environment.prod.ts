import { APP_VERSION, EnvironmentType } from "./environment-type.model";

export const environment: EnvironmentType = {
  appVersion: APP_VERSION,
  production: true,
  frontendUrl: '',
  apiUrl: {
    accountings: ''
  },
  msalConfig: {
    auth: {
      clientId: '',
      tenantId: '',
      authority: '',
      redirectUrl: ''
    }
  },
  apiConfig: {
    scopes: []
  }
}