import { Route } from "@angular/router";
import { MainComponent } from "./main.component";
import { EK_ROUTES_CONFIG } from "../routing/ek-routes-config.const";
import { SidenavService } from "./services/sidenav.service";

export const MAIN_ROUTES: Route[] = [
    {
        path: '',
        component: MainComponent,
        providers: [SidenavService],
        children: [
          {
              path: EK_ROUTES_CONFIG.accountingBooks.path,
              loadChildren: () => import('@ek/features/accountings/accountings.routes').then(m => m.ACCOUNTING_ROUTES),
          }
        ]
    }   
];