import { Injectable } from "@angular/core";
import { createDispatchMap, createSelectMap, select, Store } from "@ngxs/store";
import { BankBooksState } from "./bank-books.state";
import { BankBooksActions } from "./bank-books.actions";

@Injectable()
export class BankBooksFacade {
  readonly bankBooks$ = this._store.select(BankBooksState.bankBooks);

  readonly signalSelectors = createSelectMap({
    bankBooks: select(BankBooksState.bankBooks),
    bankBooksRequest: select(BankBooksState.bankBooksRequest),
    selectedBankBook: select(BankBooksState.selectedBankBook),
    bankBookDetailsRequest: select(BankBooksState.bankBookDetailsRequest),
    bankBookDetails: select(BankBooksState.bankBookDetails),
  });

  readonly actions = createDispatchMap({
    loadBankBooks: BankBooksActions.LoadBankBooks,
    setBankBooksRequest: BankBooksActions.SetBankBooksRequest,
    setSelectedBankBook: BankBooksActions.SetSelectedBankBook,
    setBankBookDetailsRequest: BankBooksActions.SetBankBookDetailsRequest,
    loadBankBookDetails: BankBooksActions.LoadBankBookDetails
  });

  constructor(private readonly _store: Store) {}
}