import { Component } from '@angular/core';
import { CreateBankBookStepComponent } from "../../components/create-bank-book/create-bank-book-step/create-bank-book-step.component";
import { CreateBankBookStepperComponent } from "../../components/create-bank-book/create-bank-book-stepper/create-bank-book-stepper.component";
import { CreateBankBookActionsComponent } from "../../components/create-bank-book/create-bank-book-actions/create-bank-book-actions.component";
import { CommonModule } from '@angular/common';
import { CreateBankBookFacade } from '../../state/create-bank-book/create-bank-book.facade';
import { CreateBankBookStep } from '../../state/create-bank-book/create-bank-book.state';

@Component({
  selector: 'ek-create-bank-book',
  imports: [CommonModule, CreateBankBookStepComponent, CreateBankBookStepperComponent, CreateBankBookActionsComponent],
  templateUrl: './create-bank-book.component.html',
  styleUrl: './create-bank-book.component.scss'
})
export class CreateBankBookComponent {
  readonly currentStep = this._createBankBookFacade.signalSelectors.currentStep;
  readonly CreateBankBookStep = CreateBankBookStep;

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}
}
