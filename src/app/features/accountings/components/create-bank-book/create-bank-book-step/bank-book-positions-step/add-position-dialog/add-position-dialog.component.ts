import { Component, ViewChild, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { BankBookPositionFormComponent } from './bank-book-position-form/bank-book-position-form.component';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { BankBookPosition } from '@ek/features/accountings/models/bank-book-position.model';

@Component({
  selector: 'ek-add-position-dialog',
  imports: [BankBookPositionFormComponent, MatDialogModule, MatButtonModule],
  templateUrl: './add-position-dialog.component.html',
  styleUrl: './add-position-dialog.component.scss'
})
export class AddPositionDialogComponent {
  @ViewChild(BankBookPositionFormComponent) private formComponent!: BankBookPositionFormComponent;

  private _currentPosition!: BankBookPosition;
  readonly isValidStep = computed(() => {
    return this._createBankBookFacade.signalSelectors.isValidStep();
  });

  isFormValid = signal(false);

  constructor(
    private readonly dialogRef: MatDialogRef<AddPositionDialogComponent>,
    private readonly _createBankBookFacade: CreateBankBookFacade) {
  }

  onCancel(): void {
    this.dialogRef.close();
  } 

  onClose(): void { 
    this.dialogRef.close();
  }

  onAdd(): void { 
    // trigger the child to emit its position
    this.formComponent.submitForm();

    this._createBankBookFacade.actions.addBankBookPosition(this._currentPosition);
    this.dialogRef.close();

    const successText = 'Position erfolgreich hinzugefügt.';
    // Here we would trigger a notification service to show the success message
  }

  onAddNext(): void { 
    // trigger the child to emit its position
    this.formComponent.submitForm();
    this._createBankBookFacade.actions.addBankBookPosition(this._currentPosition);

    const successText = 'Position erfolgreich hinzugefügt. Fügen Sie eine weitere Position hinzu.';
    // Here we would trigger a notification service to show the success message

    // Reset the form for the next entry
    this.formComponent.bankBookPositionForm.reset({
      documentNumber: 0,
    })

    setTimeout(() => { 
      this.formComponent.focusFirstField(); 
    });
  }

  onPositionChange(position: BankBookPosition): void {
    this._currentPosition = position;
  }

  onValidityChange(isValid: boolean): void {
    this.isFormValid.set(isValid);
  } 
}