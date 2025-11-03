import { Injectable } from "@angular/core";
import { createDispatchMap, createSelectMap, select, Store } from "@ngxs/store";
import { CreateBankBookState } from "./create-bank-book.state";
import { CreateBankBookActions } from "./create-bank-book.actions";

@Injectable()
export class CreateBankBookFacade {
  readonly currentStep$ = this._store.select(CreateBankBookState.currentStep);

  readonly signalSelectors = createSelectMap({
    // General
    currentStep: select(CreateBankBookState.currentStep),
    isValidStep: select(CreateBankBookState.isValidStep)
  });

  readonly actions = createDispatchMap({
    // General
    setCurrentStep: CreateBankBookActions.SetCurrentStep,
    setIsValidForm: CreateBankBookActions.SetIsValidForm,
    clearState: CreateBankBookActions.ClearState
  });

  constructor(private readonly _store: Store) {}
}