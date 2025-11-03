import { Routes } from '@angular/router';
import { ACCOUNTING_ROUTES_CONFIG } from '@ek/features/accountings/accounting-routes-config.const';
import { BankBooksComponent } from './pages/bank-books/bank-books.component';
import { CreateBankBookComponent } from '@ek/features/accountings/pages/create-bank-book/create-bank-book.component';
import { CreateBankBookFacade } from './state/create-bank-book/create-bank-book.facade';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CreateBankBookState } from './state/create-bank-book/create-bank-book.state';

export const ACCOUNTING_ROUTES: Routes = [
  {
    path: ACCOUNTING_ROUTES_CONFIG.createBankBook.path,
    providers: [
      CreateBankBookFacade,
      importProvidersFrom(NgxsModule.forFeature([CreateBankBookState]))
    ],
    loadComponent: () => 
      import('@ek/features/accountings/pages/create-bank-book/create-bank-book.component').then(() => CreateBankBookComponent)
  },
  {
    path: 'bank-books',
    component: BankBooksComponent,
    children: [
      {
        path: ACCOUNTING_ROUTES_CONFIG.bankBookDetails.path,
        providers: [],
        loadComponent: () => 
          import('@ek/features/accountings/components/bank-books-list/bank-book-details/bank-book-details.component').then(
            m => m.BankBookDetailsComponent)
      }
    ]
// {
//     path: ACCOUNTING_ROUTES_CONFIG.cashBooks.path,
//     providers: [],
//     loadComponent: () =>
//       import('@ek/features/accountings/components/cash-books-list/cash-books-list.component').then(
//         (m) => m.CashBooksListComponent),
//   },

  //   path: ACCOUNTING_ROUTES_CONFIG.bankBooks.path,
  //   providers: [],
  //   loadComponent: () =>
  //     import('@ek/features/accountings/components/bank-books-list/bank-books-list.component').then(
  //       m => m.BankBooksListComponent),
  //   children: [
  //     {
  //       path: '',
  //       providers: [],
  //       loadComponent: () =>
  //     import('@ek/features/accountings/components/cash-books-list/cash-books-list.component').then(
  //       (m) => m.CashBooksListComponent)
  //     }
  //   ]
  // },
  }
];