import { Component } from '@angular/core';
import { GeneralStepComponent } from './general-step/general-step.component';
import { CreateBankBookStep } from '@ek/features/accountings/state/create-bank-book/create-bank-book.state';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { CommonModule } from '@angular/common';
import { BankBookPositionsStepComponent } from "./bank-book-positions-step/bank-book-positions-step.component";
import { CompletionStepComponent } from './completion-step/completion-step.component';

@Component({
  selector: 'ek-create-bank-book-step',
  imports: [CommonModule, GeneralStepComponent, BankBookPositionsStepComponent, CompletionStepComponent],
  templateUrl: './create-bank-book-step.component.html',
  styleUrl: './create-bank-book-step.component.scss'
})
export class CreateBankBookStepComponent {
  readonly currentStep = this._createBankBookFacade.signalSelectors.currentStep;
  readonly CreateBankBookStep = CreateBankBookStep;

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}
}
