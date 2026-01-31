import { HttpErrorResponse } from "@angular/common/http";
import { BankBookPositionConfig } from "../../models/bank-book-position-config.model";
import { BankBookPosition } from "../../models/bank-book-position.model";

export namespace CreateBankBookActions {
  // General
  export class SetCurrentStep {
    static readonly type = '[CreateBankBook Actions] Set Current Step';
    constructor(public readonly step: number) {}
  }

  export class SetIsValidForm {
    static readonly type = '[CreateBankBook Actions] Set Is Valid Form';
    constructor(public readonly isValid: boolean) {} 
  }

  export class ClearState {
    static readonly type = '[CreateBankBook Actions] Clear State';
    constructor() {} 
  }

  // Bank Book Positions Step
  export class LoadBankBookPositions {
    static readonly type = '[CreateBankBook Actions] Load Bank Book Positions';
    constructor() {}
  }

  export class LoadBankBookPositionsSuccess {
    static readonly type = '[CreateBankBook Actions] Load Bank Book Positions Success';
    constructor(public readonly bankBookPositions: BankBookPosition[]) {}
  }

  export class AddBankBookPosition {
    static readonly type = '[CreateBankBook Actions] Add Bank Book Position';
    constructor(public readonly bankBookPosition: BankBookPosition) {}
  }

  export class SetBankBookPositionConfig {
    static readonly type = '[CreateBankBook Actions] Set Bank Book Position Config';
    constructor(public readonly config: BankBookPositionConfig) {}
  }

  // Completion Step
  export class SetBankBookMonth {
    static readonly type = '[CreateBankBook Actions] Set Bank Book Month';
    constructor(public readonly month: Date) {}
  }

  export class SetBankBookTitle {
    static readonly type = '[CreateBankBook Actions] Set Bank Book Title';
    constructor(public readonly title: string) {}
  }

  export class CreateBankBook {
    static readonly type = '[CreateBankBook Actions] Create Bank Book';
    constructor() {}
  }

  export class CreateBankBookSuccess {
    static readonly type = '[CreateBankBook Actions] Create Bank Book Success';
    constructor() {}
  }

  export class CreateBankBookError {
    static readonly type = '[CreateBankBook Actions] Create Bank Book Error';
    constructor(public readonly error: HttpErrorResponse) {}
  }
}