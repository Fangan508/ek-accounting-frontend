import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateBankBookStepperComponent } from "../create-bank-book-stepper/create-bank-book-stepper.component";
import { CreateBankBookStepComponent } from "../create-bank-book-step/create-bank-book-step.component";
import { CreateBankBookActionsComponent } from '../create-bank-book-actions/create-bank-book-actions.component';
import { CommonModule } from '@angular/common';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { CreateBankBookStep } from '@ek/features/accountings/state/create-bank-book/create-bank-book.state';

@Component({
  selector: 'ek-create-bank-book-dialog',
  imports: [CommonModule, MatDialogModule, CreateBankBookStepperComponent, CreateBankBookStepComponent, CreateBankBookActionsComponent],
  templateUrl: './create-bank-book-dialog.component.html',
  styleUrl: './create-bank-book-dialog.component.scss'
})
export class CreateBankBookDialogComponent {
  readonly currentStep = this._createBankBookFacade.signalSelectors.currentStep;
  readonly CreateBankBookStep = CreateBankBookStep;
  
  constructor(
    private readonly _createBankBookFacade: CreateBankBookFacade,
    private readonly dialogRef: MatDialogRef<CreateBankBookDialogComponent>) {}

  onCloseDialog() : void {
    this.dialogRef.close();
  }
}