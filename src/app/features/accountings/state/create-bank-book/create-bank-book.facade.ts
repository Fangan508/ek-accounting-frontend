import { Injectable } from "@angular/core";
import { createDispatchMap, createSelectMap, select, Store } from "@ngxs/store";
import { CreateBankBookState } from "./create-bank-book.state";
import { CreateBankBookActions } from "./create-bank-book.actions";

@Injectable({ providedIn: 'root' })
export class CreateBankBookFacade {
  readonly currentStep$ = this._store.select(CreateBankBookState.currentStep);

  readonly signalSelectors = createSelectMap({
    // General Step
    currentStep: select(CreateBankBookState.currentStep),
    isValidStep: select(CreateBankBookState.isValidStep),
    bankBookMonth: select(CreateBankBookState.bankBookMonth),

    // Bank Book Positions Step
    bankBookPositions: select(CreateBankBookState.bankBookPositions),

    // Completion Step
    bankBookTitle: select(CreateBankBookState.bankBookTitle)
  });

  readonly actions = createDispatchMap({
    // General Step
    setCurrentStep: CreateBankBookActions.SetCurrentStep,
    setIsValidForm: CreateBankBookActions.SetIsValidForm,
    clearState: CreateBankBookActions.ClearState,
    setBankBookMonth: CreateBankBookActions.SetBankBookMonth,

    // Bank Book Positions Step
    loadBankBookPositions: CreateBankBookActions.LoadBankBookPositions,
    addBankBookPosition: CreateBankBookActions.AddBankBookPosition,
    setBankBookPositionConfig: CreateBankBookActions.SetBankBookPositionConfig,

    // Completion Step
    setBankBookTitle: CreateBankBookActions.SetBankBookTitle,
    createBankBook: CreateBankBookActions.CreateBankBook,
    createBankBookError: CreateBankBookActions.CreateBankBookError
  });

  constructor(private readonly _store: Store) {}
}