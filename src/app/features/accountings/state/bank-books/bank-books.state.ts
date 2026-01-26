import { StateMetadata } from '@ek/shared/models/state-metadata.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { produce } from 'immer';
import { AccountingBookingService, BankBookDto, BankBookPositionDto } from '@ek/autogen/accountings/index';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@ek/shared/utils/table.utils';
import { BankBooksActions } from './bank-books.actions';
import { BankBookDetailsRequest, BankBooksRequest } from '@ek/features/accountings/models/accountings-books.model';
import { patch } from '@ngxs/store/operators';

export class BankBooksStateModel {
  bankBooks!: StateMetadata<BankBookDto[]>;
  detailsRequest!: BankBookDetailsRequest;
  details!: StateMetadata<BankBookPositionDto[]>;
  request!: BankBooksRequest;
  selectedBankBook?: BankBookDto;
  addedBankBookPositions?: BankBookPositionDto[];
}

const initialBankBooksState = {
  bankBooks: {
    loading: false,
    metadata: [],
    total: 0
  },
  request: {
    offset: DEFAULT_PAGE,
    limit: DEFAULT_PAGE_SIZE,
    searchText: '',
    sort: [],
    filter: {}
  },
  selectedBankBook: undefined,
  detailsRequest: {
    bankBookId: '',
    offset: DEFAULT_PAGE,
    limit: DEFAULT_PAGE_SIZE,
    sort: []
  },
  details: {
    loading: false,
    metadata: [],
    total: 0
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
  static bankBooks(state: BankBooksStateModel): StateMetadata<BankBookDto[]> {
    return state.bankBooks;
  }

  @Selector()
  static bankBooksRequest(state: BankBooksStateModel): BankBooksRequest {
    return state.request;
  }

  @Selector()
  static selectedBankBook(state: BankBooksStateModel): BankBookDto | undefined {
    return state.selectedBankBook;
  }

  @Selector()
  static bankBookDetails(state: BankBooksStateModel): StateMetadata<BankBookPositionDto[]> {
    return state.details;
  }

  @Selector()
  static bankBookDetailsRequest(state: BankBooksStateModel): BankBookDetailsRequest {
    return state.detailsRequest;
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

  // Bank Book Details

  @Action(BankBooksActions.SetSelectedBankBook)
  setSelectedBankBook(
    { patchState }: StateContext<BankBooksStateModel>,
    { bankBook }: BankBooksActions.SetSelectedBankBook
  ): void {
    patchState({
      selectedBankBook: bankBook
    });

    // if bank book details window was closed, clean state
    if(!bankBook) {
      patchState({
        //menuItems: [],
        details: {
          loading: false,
          metadata: [],
          total: 0
        }
      })
    }
  }

  @Action(BankBooksActions.SetBankBookDetailsRequest)
  setBankBookDetailsRequest(
    { patchState }: StateContext<BankBooksStateModel>,
    { request }: BankBooksActions.SetBankBookDetailsRequest
  ): void {
    patchState({
      detailsRequest: request
    });
  }

  @Action(BankBooksActions.LoadBankBookDetails)
  loadBankBookDetails(
    { getState, setState, dispatch }: StateContext<BankBooksStateModel>,
    { bankBookId }: BankBooksActions.LoadBankBookDetails
  ): void {
    setState(
      produce(draft => {
        draft.details.loading = true;
      })
    );

    const state = getState();
    const { offset, limit, sort } = state.detailsRequest;
    const orderBy = sort.filter(({ sort }) => sort).map(( {colId, sort}) => `${colId} ${sort}`);
    
    this._accountingBookingService.apiV1AccountingBookingBankBookIdGet(bankBookId, offset, limit, orderBy).subscribe({
      next: res => {
        //const allUrl = `/accounting-books/bank-books/${bankBookId}`;

        
        dispatch(new BankBooksActions.LoadBankBookDetailsSuccess(res.items ?? [], res.pagination?.total ?? 0));
      },
      error: error => {
        dispatch(new BankBooksActions.LoadBankBookDetailsError(error));
      }
    });
  }

  @Action(BankBooksActions.LoadBankBookDetailsSuccess)
  loadBankBookDetailsSucces(
    { patchState }: StateContext<BankBooksStateModel>,
    { details, total }: BankBooksActions.LoadBankBookDetailsSuccess
  ): void {
    patchState({
      details:{
        loading: false,
        metadata: details,
        total
      }
    });
  }

  @Action(BankBooksActions.LoadBankBookDetailsError)
  loadBankBookDetailsError(
    { setState }: StateContext<BankBooksStateModel>,
    { error }: BankBooksActions.LoadBankBookDetailsError
  ): void {
    console.log(error);
    setState(
      produce(draft => {
        draft.details.loading = false;
      })
    );
  }
}