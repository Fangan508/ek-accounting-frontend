import { Component } from '@angular/core';
import { GeneralStepComponent } from './general-step/general-step.component';
import { CreateBankBookStep } from '@ek/features/accountings/state/create-bank-book/create-bank-book.state';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { CommonModule } from '@angular/common';
import { BankBooksListComponent } from "../../bank-books-list/bank-books-list.component";
import { CashBooksListComponent } from "../../cash-books-list/cash-books-list.component";

@Component({
  selector: 'ek-create-bank-book-step',
  imports: [CommonModule, GeneralStepComponent, BankBooksListComponent, CashBooksListComponent],
  templateUrl: './create-bank-book-step.component.html',
  styleUrl: './create-bank-book-step.component.scss'
})
export class CreateBankBookStepComponent {
  readonly currentStep = this._createBankBookFacade.signalSelectors.currentStep;
  readonly CreateBankBookStep = CreateBankBookStep;

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}
}
