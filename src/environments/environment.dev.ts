import { APP_VERSION, EnvironmentType } from "./environment-type.model";

export const environment: EnvironmentType = {
  appVersion: APP_VERSION,
  production: false,
  frontendUrl: '',
  apiUrl: {
    accountings: "https://localhost:7000"
  },
  msalConfig: {
    auth: {
      clientId: "",
      tenantId: "",
      authority: "",
      redirectUrl: ""
    }
  },
  apiConfig: {
    scopes: []
  }
}