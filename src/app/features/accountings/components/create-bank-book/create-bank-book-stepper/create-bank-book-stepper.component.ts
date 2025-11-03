import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';

@Component({
  selector: 'ek-create-bank-book-stepper',
  imports: [MatStepperModule, CommonModule],
  templateUrl: './create-bank-book-stepper.component.html',
  styleUrl: './create-bank-book-stepper.component.scss'
})
export class CreateBankBookStepperComponent {
  steps = [
    { label: 'Allgemeines' },
    { label: 'Positionen' }
  ];

  readonly currentStep = this._createBankBookFacade.signalSelectors.currentStep;

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}
}