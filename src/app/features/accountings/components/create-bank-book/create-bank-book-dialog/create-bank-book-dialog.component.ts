import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateBankBookStepperComponent } from "../create-bank-book-stepper/create-bank-book-stepper.component";
import { CreateBankBookStepComponent } from "../create-bank-book-step/create-bank-book-step.component";
import { CreateBankBookActionsComponent } from '../create-bank-book-actions/create-bank-book-actions.component';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';

@Component({
  selector: 'ek-create-bank-book-dialog',
  imports: [CommonModule, MatDialogModule, CreateBankBookStepperComponent, CreateBankBookStepComponent, CreateBankBookActionsComponent],
  templateUrl: './create-bank-book-dialog.component.html',
  styleUrl: './create-bank-book-dialog.component.scss'
})
export class CreateBankBookDialogComponent implements OnDestroy {
  private readonly _createBankBookFacade = inject(CreateBankBookFacade);

  constructor(private readonly dialogRef: MatDialogRef<CreateBankBookDialogComponent>) {}

  ngOnDestroy(): void {
    this._createBankBookFacade.actions.clearState();
  }

  onCloseDialog() : void {
    this.dialogRef.close();
  }
}