import { EnvironmentType } from "./environment-type.model";

export const environment: EnvironmentType = {
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