import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { StateMetadata } from '@ek/shared/models/state-metadata.model';
import { current, produce } from "immer";
import { CreateBankBookActions } from "./create-bank-book.actions";
import { BankBookPosition } from "../../models/bank-book-position.model";

export enum CreateBankBookStep {
  General,
  Positions
}

export class CreateBankBookStateModel {
  currentStep!: CreateBankBookStep;
  isValidForm!: boolean;
  bankBookPositions!: StateMetadata<BankBookPosition[]>;
  addedBankBookPositions!: BankBookPosition[];
}

const initialState = {
  currentStep: CreateBankBookStep.General,
  isValidForm: true,
  bankBookPositions: {
    loading: false,
    total: 0,
    metadata: []
  },
  addedBankBookPositions: []
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

  // Bank Book Positions Step
  @Selector()
  static bankBookPositions(state: CreateBankBookStateModel): StateMetadata<BankBookPosition[]> {
    return state.bankBookPositions ?? initialState.bankBookPositions;
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

  // Bank Book Positions Step
  @Action(CreateBankBookActions.LoadBankBookPositions)
  loadBankBookPositions({ getState, setState, dispatch }: StateContext<CreateBankBookStateModel>): void {
    setState(
      produce((draft: CreateBankBookStateModel) => {
        draft.bankBookPositions.loading = true;
      })
    );

    const state = getState();
    const addedPositions = state.addedBankBookPositions ?? [];

    dispatch(new CreateBankBookActions.LoadBankBookPositionsSuccess(addedPositions));
  }

  @Action(CreateBankBookActions.LoadBankBookPositionsSuccess)
  loadBankBookPositionsSuccess(
    { setState }: StateContext<CreateBankBookStateModel>,
    { bankBookPositions }: CreateBankBookActions.LoadBankBookPositionsSuccess
  ): void {
    setState(
      produce((draft: CreateBankBookStateModel) => {
        draft.bankBookPositions.loading = false;
        draft.bankBookPositions.metadata = bankBookPositions;
        draft.bankBookPositions.total = bankBookPositions.length;
      })
    );
  }
    
  @Action(CreateBankBookActions.AddBankBookPosition)
  addBankBookPositions(
    { getState, setState }: StateContext<CreateBankBookStateModel>,
    { bankBookPosition }: CreateBankBookActions.AddBankBookPosition
  ): void {
    const state = getState();

    setState(
      produce((draft: CreateBankBookStateModel) => {
        // ensure bankBookPositions exists
        if (!draft.bankBookPositions) {
          draft.bankBookPositions = { loading: false, total: 0, metadata: [] };
        }
        // add to the list of added positions
        draft.addedBankBookPositions = [
          ...(state.addedBankBookPositions ?? []),
          bankBookPosition
        ];

        // also update the metadata list so the grid sees it immediately
        draft.bankBookPositions.metadata = [
          ...(state.bankBookPositions?.metadata ?? []),
          bankBookPosition
        ];

        draft.bankBookPositions.total = draft.bankBookPositions.metadata.length;
        draft.bankBookPositions.loading = false;
      })
    );
  }
}