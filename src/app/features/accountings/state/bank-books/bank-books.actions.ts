import { HttpErrorResponse } from '@angular/common/http';
import { GetBankBookDto, GetBankBookPositionDto } from '@ek/autogen/accountings/index';
import { BankBookDetailsRequest, BankBooksRequest } from '@ek/features/accountings/models/accountings-books.model';

export namespace BankBooksActions {
  export class LoadBankBooks {
    static readonly type = '[Bank Books Actions] Load Bank Books';
    constructor() {}
  }

  export class LoadBankBooksSuccess {
    static readonly type = '[Bank Books Actions] Load Bank Books Success';
    constructor(
      public readonly books: GetBankBookDto[],
      public readonly total: number
    ) {}
  }

  export class LoadBankBooksError {
    static readonly type = '[Bank Books Actions] Load Bank Books Error';
    constructor(public readonly error: HttpErrorResponse) {}
  }

  export class SetBankBooksRequest {
    static readonly type = '[Bank Books Actions] Set Bank Books Request';
    constructor(public readonly request: BankBooksRequest) {}
  }

  // Bank Book Details
  export class SetSelectedBankBook {
    static readonly type = '[Bank Books Actions] Set Selected Bank Book';
    constructor(public readonly bankBook: GetBankBookDto | undefined) {}
  }

  export class SetBankBookDetailsRequest {
    static readonly type = '[Bank Books Actions] Set Selected Bank Book Details Request';
    constructor(public readonly request: BankBookDetailsRequest) {}
  }

  export class LoadBankBookDetails {
    static readonly type = '[Bank Books Actions] Load Bank Book Details';
    constructor(public readonly bankBookId: string) {}
  }

  export class LoadBankBookDetailsSuccess {
    static readonly type = '[Bank Books Actions] Load Bank Book Details Success';
    constructor(
      public readonly details: GetBankBookPositionDto[],
      public readonly total: number
    ) {}
  }

  export class LoadBankBookDetailsError {
    static readonly type = '[Bank Books Actions] Load Bank Book Details Error';
    constructor(public readonly error: HttpErrorResponse) {}
  }
}