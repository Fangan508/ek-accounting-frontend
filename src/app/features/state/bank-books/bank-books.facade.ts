import { Injectable } from "@angular/core";
import { createDispatchMap, createSelectMap, select, Store } from "@ngxs/store";
import { BankBooksState } from "./bank-books.state";
import { BankBooksActions } from "./bank-books.actions";

@Injectable()
export class BankBooksFacade {
  readonly bankBooks$ = this._store.select(BankBooksState.bankBooks);

  readonly signalSelectors = createSelectMap({
    bankBooks: select(BankBooksState.bankBooks),
    bankBooksRequest: select(BankBooksState.bankBooksRequest)
  });

  readonly actions = createDispatchMap({
    loadBankBooks: BankBooksActions.LoadBankBooks,
    setBankBooksRequest: BankBooksActions.SetBankBooksRequest
  });

  constructor(private readonly _store: Store) {}
}