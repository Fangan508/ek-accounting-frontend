import { HttpErrorResponse } from '@angular/common/http';
import { GetBankBookDto } from '@ek/autogen/accountings/index';
import { BankBooksRequest } from '@ek/features/accountings/models/accountings-books.model';

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
}