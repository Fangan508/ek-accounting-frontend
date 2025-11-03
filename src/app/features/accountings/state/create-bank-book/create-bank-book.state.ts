import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { current } from "immer";
import { CreateBankBookActions } from "./create-bank-book.actions";

export enum CreateBankBookStep {
  General
}

export class CreateBankBookStateModel {
  currentStep!: CreateBankBookStep;
  isValidForm!: boolean;
}

const initialState = {
  currentStep: CreateBankBookStep.General,
  isValidForm: true
};

@State<CreateBankBookStateModel>({
  name: 'createBankBook',
  defaults: initialState
})
@Injectable()
export class CreateBankBookState {
  constructor() {}

  // General
  @Selector()
  static currentStep(state: CreateBankBookStateModel): CreateBankBookStep {
    return state.currentStep;
  }

  @Selector()
  static isValidStep(state: CreateBankBookStateModel): boolean {
    let isValidStep;

    switch(state.currentStep) {
      case CreateBankBookStep.General:
        isValidStep = true;
        break;
      default:
        isValidStep = true;
        break;
    }

    return isValidStep && state.isValidForm;
  }

  // General
  @Action(CreateBankBookActions.SetCurrentStep)
  setCurrentStep({ patchState }: StateContext<CreateBankBookStateModel>, { step }: CreateBankBookActions.SetCurrentStep): void {
    patchState({
      currentStep: step
    });
  }

  @Action(CreateBankBookActions.SetIsValidForm)
  setIsValidForm({ patchState }: StateContext<CreateBankBookStateModel>, { isValid }: CreateBankBookActions.SetIsValidForm): void {
    patchState({
      isValidForm: isValid
    });
  }

  @Action(CreateBankBookActions.ClearState)
  clearState({ patchState }: StateContext<CreateBankBookStateModel>): void {
    patchState(initialState);
  }
}