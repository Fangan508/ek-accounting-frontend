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
}