import { Component, computed, effect, signal } from '@angular/core';
import { BankBooksFacade } from '@ek/features/accountings/state/bank-books/bank-books.facade';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ModuleRegistry  } from 'ag-grid-community';

@Component({
  selector: 'ek-bank-book-details',
  imports: [AgGridModule],
  templateUrl: './bank-book-details.component.html',
  styleUrl: './bank-book-details.component.scss'
})
export class BankBookDetailsComponent {
  readonly selectedBankBook = this._bankBooksFacade.signalSelectors.selectedBankBook;
  readonly request = this._bankBooksFacade.signalSelectors.bankBookDetailsRequest;
  readonly details = this._bankBooksFacade.signalSelectors.bankBookDetails;

  readonly state = computed(() => ({
      skip: this.request().offset,
      take: this.request().limit,
      sort: this.request().sort
    }) //as State
  );

  // readonly rowData = computed(() => {
  //   return {
  //     data: this.details().metadata ?? [],
  //     total: this.details().total ?? 0
  //   };
  // });

  rowData = computed(() => {
    return this.details().metadata ?? [];
  });

  constructor(private readonly _bankBooksFacade: BankBooksFacade) {
    effect(() => {
      const bankBookId = this.selectedBankBook()?.id;

      if (bankBookId) {
        this._bankBooksFacade.actions.loadBankBookDetails(bankBookId);
      }
    });


    // ***************************************
    // dies muss z.B. beim Laden der Daten passieren und nicht im Konstruktor siehe order-proposal-actions.onDataStateChange()
    const skip = 0;

    this._bankBooksFacade.actions.setBankBookDetailsRequest({
      ...this.request(),
      offset: skip,
      limit: 50,
      sort:  []
    })
    // *************************************** bis hierher gültig
  }

  colDefs: ColDef[] = [
    { field: "sellerName" }
  ];
}