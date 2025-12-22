import { Component, ViewChild } from '@angular/core';
import { BankBookPositionFormComponent } from './bank-book-position-form/bank-book-position-form.component';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BankBookPosition } from '@ek/features/accountings/models/bank-book-position.model';

@Component({
  selector: 'ek-add-position-dialog',
  imports: [BankBookPositionFormComponent, MatDialogModule],
  templateUrl: './add-position-dialog.component.html',
  styleUrl: './add-position-dialog.component.scss'
})
export class AddPositionDialogComponent {
  @ViewChild(BankBookPositionFormComponent) private formComponent!: BankBookPositionFormComponent;

  private _currentPosition!: BankBookPosition;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _createBankBookFacade: CreateBankBookFacade) {
  }

  onClose(): void { 
    this._dialog.closeAll();
  }

  onAdd(): void { 
     // trigger the child to emit its position
    this.formComponent.submitForm();

    this._createBankBookFacade.actions.addBankBookPosition(this._currentPosition);
    this._dialog.closeAll();

    const successText = 'Position erfolgreich hinzugefügt.';
    // Here we would trigger a notification service to show the success message
  }

  onPositionChange(position: BankBookPosition): void {
    this._currentPosition = position;
  }
}