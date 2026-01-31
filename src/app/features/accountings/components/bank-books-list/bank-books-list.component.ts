import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, OnInit  } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ModuleRegistry  } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { BankBooksFacade } from '@ek/features/accountings/state/bank-books/bank-books.facade';
import { DEFAULT_PAGE_SIZE } from '@ek/shared/utils/table.utils';
import { Router } from '@angular/router';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-theme-material.css';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'ek-bank-books-list',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './bank-books-list.component.html',
  styleUrl: './bank-books-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BankBooksListComponent implements OnInit {
  readonly pageSizes = DEFAULT_PAGE_SIZE;
  readonly bankBooks = this._bankBooksFacade.signalSelectors.bankBooks;
  readonly request = this._bankBooksFacade.signalSelectors.bankBooksRequest;

  constructor(
    private readonly _router: Router,
    private readonly _bankBooksFacade: BankBooksFacade) {

    effect(() => {
      this._bankBooksFacade.actions.loadBankBooks();
    });
  }

  ngOnInit(): void {
    this._bankBooksFacade.actions.loadBankBooks();
  }

  rowData = computed(() => {
    return this.bankBooks().metadata ?? [];
  });

  colDefs: ColDef[] = [
    { field: "name" },
    { field: "bookingDate" }
  ];

  openBankBook(event: any): void {
    const bankBook = event.data;

    this._bankBooksFacade.actions.setSelectedBankBook(bankBook);
    this._router.navigate(['accounting-books/bank-books', bankBook.id]);
  }
}
