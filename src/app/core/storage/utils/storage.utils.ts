import { environment } from "environments/environment.local";

export const PERSISTED_STATE_KEY = [];

/**
 * Clear specific persisted state keys from local smb,torage if the app version has changed.
 */
export function clearStorageOnVersionChange() {
  const currentAppVersion = environment.appVersion;
  const storedAppVersion = localStorage.getItem('appVersion');

  if (storedAppVersion !== currentAppVersion) {
    PERSISTED_STATE_KEY.forEach(key => localStorage.removeItem(key));
    localStorage.setItem('appVersion', currentAppVersion);
  }
}