import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { ACCOUNTING_ROUTES_CONFIG } from '@ek/features/accountings/accounting-routes-config.const';
import { NgxsModule } from '@ngxs/store';
// import { BankBooksStateModel } from '../state/bank-books/bank-books.state';
import { AccountingBooksComponent } from './pages/accounting-books/accounting-books.component';

export const ACCOUNTING_ROUTES: Routes = [
  {
    path: '',
    component: AccountingBooksComponent,
    children: [
      {
        path: ACCOUNTING_ROUTES_CONFIG.bankBooks.path,
        providers: [],
        loadComponent: () => 
           import('@ek/features/accountings/components/accounting-books/bank-books-list/bank-books-list.component').then(
            m => m.BankBooksListComponent)
      },
      {
        path: ACCOUNTING_ROUTES_CONFIG.cashBooks.path,
        providers: [],
        loadComponent: () => 
           import('@ek/features/accountings/components/accounting-books/cash-books-list/cash-books-list.component').then(
            m => m.CashBooksListComponent)
      }
    ]
  }
];