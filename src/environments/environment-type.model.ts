import packageJson from '../../package.json';

export const APP_VERSION = packageJson.version;

export type Api = 'accountings';
export type ApiUrl = {
  [key in Api]: string;
};

export interface EnvironmentType {
  appVersion: string;
  production: boolean;
  frontendUrl: string;
  apiUrl: ApiUrl;
  msalConfig: {auth: { clientId: string; tenantId: string; authority: string; redirectUrl: string; } };
  apiConfig: { scopes: string[] };
}