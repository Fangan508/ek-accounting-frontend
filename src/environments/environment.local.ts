import { EnvironmentType } from "./environment-type.model";

export const environment: EnvironmentType = {
  production: false,
  frontendUrl: "http://localhost:4200",
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