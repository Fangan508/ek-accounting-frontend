import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { StateMetadata } from '@ek/shared/models/state-metadata.model';
import { current, produce } from "immer";
import { CreateBankBookActions } from "./create-bank-book.actions";
import { BankBookPosition } from "../../models/bank-book-position.model";
import { BankBookPositionConfig } from "../../models/bank-book-position-config.model";
import { CreateBankBookFacade } from "./create-bank-book.facade";
import { AccountingBookingService, BankBookCreateDto, BankBookPositionCreateDto } from '@ek/autogen/accountings/index';

export enum CreateBankBookStep {
  General,
  Positions,
  Completion
}

export class CreateBankBookStateModel {
  currentStep!: CreateBankBookStep;
  isValidForm!: boolean;
  bankBookPositions!: StateMetadata<BankBookPosition[]>;
  addedBankBookPositions!: BankBookPosition[];
  bankBookPositionConfig!: BankBookPositionConfig;
  bankBookTitle!: string;
  isBankBookCreating?: boolean;
}

const initialBankBookPositionConfig: BankBookPositionConfig = {
  documentNumber: 0,
  bookingdate: new Date(),
  description: '',
  credit: 0,
  debit: 0
};

const initialState = {
  currentStep: CreateBankBookStep.General,
  isValidForm: true,
  bankBookPositionConfig: initialBankBookPositionConfig,
  bankBookPositions: {
    loading: false,
    total: 0,
    metadata: []
  },
  addedBankBookPositions: [],
  bankBookTitle: '',
  isBankBookCreating: false
};


@State<CreateBankBookStateModel>({
  name: 'createBankBook',
  defaults: initialState
})
@Injectable()
export class CreateBankBookState {
  constructor(
    private readonly _createBankBookFacade: CreateBankBookFacade,
    private readonly _bankBookService: AccountingBookingService
  ) {}

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
      case CreateBankBookStep.Positions:
        isValidStep = (state.bankBookPositions.metadata?.length ?? 0) > 0;
        break;
      case CreateBankBookStep.Completion:
        isValidStep = state.bankBookTitle !== '';
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

  // Completion Step Selectors
  @Selector()
  static bankBookTitle(state: CreateBankBookStateModel): string {
    return state.bankBookTitle ?? initialState.bankBookTitle;
  }

  @Selector()
  static isBankBookCreating(state: CreateBankBookStateModel): boolean {
    return state.isBankBookCreating ?? initialState.isBankBookCreating;
  }

  // General Actions
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

  // Bank Book Positions Step Actions
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

  @Action(CreateBankBookActions.SetBankBookPositionConfig)
  setBankBookPositionConfig( 
    { patchState }: StateContext<CreateBankBookStateModel>,
    { config }: CreateBankBookActions.SetBankBookPositionConfig
  ): void {
    patchState({
      bankBookPositionConfig: config
    });
  }

  // Completion Step
  @Action(CreateBankBookActions.SetBankBookTitle)
  setBankBookTitle(
    { patchState }: StateContext<CreateBankBookStateModel>,
    { title }: CreateBankBookActions.SetBankBookTitle
  ): void {
    patchState({
      bankBookTitle: title
    });
  }

  @Action(CreateBankBookActions.CreateBankBook)
  createBankBook(
    { getState, setState, dispatch }: StateContext<CreateBankBookStateModel>
  ): void {
    setState(
      produce(draft => {
        draft.isBankBookCreating = true;
      })
    );

    const state = getState();

    const bankBookPositions = this._createBankBookFacade.signalSelectors.bankBookPositions().metadata;
    const positions: BankBookPositionCreateDto[] = bankBookPositions.map(position => 
      ({
        bookingDate: position.bookingDate?.toString(),
        sellerName: position.description ?? '',
        amount: position.credit
      })
    );

    const request: BankBookCreateDto = {
      name: state.bankBookTitle,
      bookingDate: "2026-01-23T19:01:15.247Z",
      positions: positions
    };

    this._bankBookService.apiV1AccountingBookingPost(request).subscribe({
      next: () => {
        console.log('Bank Book created successfully:');
      }
    });

    console.log('Bank Book Positions to createaaaaa:', bankBookPositions);
  }
}