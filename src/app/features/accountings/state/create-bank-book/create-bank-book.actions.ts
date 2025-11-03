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
}