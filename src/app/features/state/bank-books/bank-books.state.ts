import { StateMetadata } from '@ek/shared/models/state-metadata.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { produce } from 'immer';
import { AccountingBookingService, GetBankBookDto } from '@ek/autogen/accountings/index';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZES } from '@ek/shared/utils/table.utils';
import { BankBooksActions } from './bank-books.actions';
import { BankBooksRequest } from '@ek/features/accountings/models/accountings-books.model';
import { patch } from '@ngxs/store/operators';

export class BankBooksStateModel {
  bankBooks!: StateMetadata<GetBankBookDto[]>;
  request!: BankBooksRequest;
}

const initialBankBooksState = {
  bankBooks: {
    loading: false,
    metadata: [],
    total: 0
  },
  request: {
    offset: DEFAULT_PAGE,
    limit: DEFAULT_PAGE_SIZES,
    searchText: '',
    sort: [],
    filter: {}
  }
};

@State<BankBooksStateModel>({
  name: 'bankBooks',
  defaults: initialBankBooksState
})
@Injectable()
export class BankBooksState {
  constructor(private readonly _accountingBookingService: AccountingBookingService) {}

  @Selector()
  static bankBooks(state: BankBooksStateModel): StateMetadata<GetBankBookDto[]> {
    return state.bankBooks;
  }

  @Selector()
  static bankBooksRequest(state: BankBooksStateModel): BankBooksRequest {
    return state.request;
  }

  @Action(BankBooksActions.LoadBankBooks)
  loadBankBooks({ getState, setState, dispatch}: StateContext<BankBooksStateModel>): void {
    setState(
      produce(draft => {
        draft.bankBooks.loading = true;
      })
    );

    const state = getState();
    const {offset, limit, searchText, sort, filter } = state.request;
    const { bookingDate } = filter;
    const mappedSort = sort.filter(({ sort }) => sort).map(( {colId, sort}) => `${colId} ${sort}`);
    const orderBy = mappedSort.length ? mappedSort : ['bookingDate desc'];
    
    this._accountingBookingService.apiV1AccountingBookingGet(bookingDate, searchText, offset, limit, orderBy).subscribe({
      next: res => {
        dispatch(new BankBooksActions.LoadBankBooksSuccess(res.items ?? [], res.pagination?.total ?? 0));
      },
      error: error => {
        dispatch(new BankBooksActions.LoadBankBooksError(error));
      }
    });
  }

  @Action(BankBooksActions.LoadBankBooksSuccess)
  loadBankBooksSuccess(
    { patchState }: StateContext<BankBooksStateModel>,
    { books, total }: BankBooksActions.LoadBankBooksSuccess
  ): void {
    patchState({
      bankBooks: {
        loading: false,
        metadata: books,
        total
      }
    });
  }

  @Action(BankBooksActions.LoadBankBooksError)
  loadBankBooksError({ setState }: StateContext<BankBooksStateModel>, { error }: BankBooksActions.LoadBankBooksError): void {
    console.log(error);
    setState(
      produce(draft => {
        draft.bankBooks.loading = false;
      })
    );
  }

  @Action(BankBooksActions.SetBankBooksRequest)
  setBankBooksRequest(
    { patchState }: StateContext<BankBooksStateModel>,
    { request}: BankBooksActions.SetBankBooksRequest
  ): void {
    patch({
      request
    });
  }
}