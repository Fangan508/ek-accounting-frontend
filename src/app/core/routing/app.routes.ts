import { Routes } from "@angular/router";
import { EK_ROUTES_CONFIG } from "./ek-routes-config.const";

export const APP_ROUTES: Routes = [
  {
    path: EK_ROUTES_CONFIG.main.path,
    loadChildren: () => import('../main/main.routes').then(m => m.MAIN_ROUTES),
    // data: {},
    // canActivate: [],
    // providers: []
  }
];