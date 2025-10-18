import { Routes } from '@angular/router';
import { ACCOUNTING_ROUTES_CONFIG } from '@ek/features/accountings/accounting-routes-config.const';

export const ACCOUNTING_ROUTES: Routes = [
  {
    path: ACCOUNTING_ROUTES_CONFIG.bankBooks.path,
    providers: [],
    loadComponent: () =>
      import('@ek/features/accountings/components/accounting-books/bank-books-list/bank-books-list.component').then(
        m => m.BankBooksListComponent)
    // canActivate: []
  },
  {
    path: ACCOUNTING_ROUTES_CONFIG.cashBooks.path,
    providers: [],
    loadComponent: () =>
      import('@ek/features/accountings/components/accounting-books/cash-books-list/cash-books-list.component').then(
        m => m.CashBooksListComponent)
    // canActivate: []
  }
];