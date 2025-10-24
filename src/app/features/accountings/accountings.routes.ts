import { Routes } from '@angular/router';
import { ACCOUNTING_ROUTES_CONFIG } from '@ek/features/accountings/accounting-routes-config.const';

export const ACCOUNTING_ROUTES: Routes = [
  {
    path: ACCOUNTING_ROUTES_CONFIG.bankBooks.path,
    providers: [],
    loadComponent: () =>
      import('@ek/features/accountings/components/bank-books-list/bank-books-list.component').then(
        (m) => m.BankBooksListComponent),
  },
  {
    path: ACCOUNTING_ROUTES_CONFIG.cashBooks.path,
    providers: [],
    loadComponent: () =>
      import('@ek/features/accountings/components/cash-books-list/cash-books-list.component').then(
        (m) => m.CashBooksListComponent),
  },
];