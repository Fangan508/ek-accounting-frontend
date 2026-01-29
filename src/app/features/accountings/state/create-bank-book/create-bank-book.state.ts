import { Injectable } from "@angular/core";
import { Action, Select, Selector, State, StateContext } from "@ngxs/store";
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
  bankBookMonth!: Date;
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
  bankBookMonth: new Date(),
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

  @Selector()
  static bankBookMonth(state: CreateBankBookStateModel): Date {
    return state.bankBookMonth;
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

  @Action(CreateBankBookActions.SetBankBookMonth)
  setBankBookMonth(
    { patchState }: StateContext<CreateBankBookStateModel>, 
    { month }: CreateBankBookActions.SetBankBookMonth): void {
    patchState({
      bankBookMonth: month
    });
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
        bookingDate: position.bookingDate ? new Date(position.bookingDate).toISOString() : undefined,
        sellerName: position.description ?? '',
        amount: position.credit
      })
    );

    console.log(
      'value:', state.bankBookMonth, 
      'type:', typeof state.bankBookMonth, 
      'instanceof Date:', state.bankBookMonth instanceof Date);

    console.log('yyyyyyyyyyyyyyyyyyyyyyyyyy', state.bankBookMonth);
    const bookingMonth = typeof state.bankBookMonth === 'string' ? state.bankBookMonth : new Date(state.bankBookMonth).toISOString();
    console.log('hhhhhhhhhhhhh', bookingMonth);

    const request: BankBookCreateDto = {
      name: state.bankBookTitle,
      bookingDate: bookingMonth,
      // bookingDate: "2024-11-01T12:48:19.806Z",
      positions: positions
    };

    console.log('BankBookCreateDto - bankBookTitle: ', request.name);
    console.log('BankBookCreateDto - BookingMonth: ', request.bookingDate);
    console.log('BankBookCreateDto - Positions: ', request.positions);
    console.log('BankBookCreateDto: ', request);

    this._bankBookService.apiV1AccountingBookingPost(request).subscribe({
      next: () => {
        console.log('Bank Book created successfully:');
      }, 
      error: error => { 
        dispatch(new CreateBankBookActions.CreateBankBookError(error));
        console.error('Error creating Bank Book:', error); 
        console.error('VALIDATION ERRORS:', error.error?.errors);
      }
    });

    console.log('Bank Book Positions to createaaaaa:', bankBookPositions);
  }

  @Action(CreateBankBookActions.CreateBankBookError)
  createBankBookError({ setState }: StateContext<CreateBankBookStateModel>, { error }: CreateBankBookActions.CreateBankBookError): void {
    setState(
      produce(draft => {
        draft.isBankBookCreating = false;
      })
    );
    const errorText = "Create Bank Book failed: " + JSON.stringify(error);
    console.error('CreateBankBookError Action triggered with error:', error);
  }
}