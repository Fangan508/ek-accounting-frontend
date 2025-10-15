import { Injectable } from "@angular/core";
import { SidenavItemModel } from "../models/sidenav-item.model";
import { EK_ROUTES_CONFIG } from "@ek/core/routing/ek-routes-config.const";

@Injectable()
export class SidenavService {
  readonly sidenavItems: SidenavItemModel[] = [
    {
      displayName: 'Books',
      icon: 'book',
      route: '/accounting-books/bank-books',
      //path: '/accounting-books/bank-books'
      path: EK_ROUTES_CONFIG.accountingBooks.fullPath
    },
    {
      displayName: 'Invoices',
      icon: 'dashboard',
      route: '/accounting-books/bank-books',
      path: '/accounting-books/bank-books'
    }
  ];
}