import { Component, computed, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { CreateBankBookStep } from '@ek/features/accountings/state/create-bank-book/create-bank-book.state';
import { SaveExportDropdownbuttonComponent } from './save-export-dropdownbutton/save-export-dropdownbutton.component';

@Component({
  selector: 'ek-create-bank-book-actions',
  imports: [MatButtonModule, SaveExportDropdownbuttonComponent],
  templateUrl: './create-bank-book-actions.component.html',
  styleUrl: './create-bank-book-actions.component.scss'
})
export class CreateBankBookActionsComponent {
  readonly currentStep = this._createBankBookFacade.signalSelectors.currentStep;
  readonly isFirstStep = computed(() => this.currentStep() === CreateBankBookStep.General);
  readonly isLastStep = computed(() => this.currentStep() === CreateBankBookStep.Completion);
  readonly isValidStep = computed(() => { return this._createBankBookFacade.signalSelectors.isValidStep(); });
  readonly CreateBankBookStep = CreateBankBookStep;

  @Output() closeDialog = new EventEmitter<void>();

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}

  onCancel(): void {
    this.closeDialog.emit();
  }

  onBack(): void {
    this._createBankBookFacade.actions.setCurrentStep(this.currentStep() - 1);
  }

  onNext(): void {
    this._createBankBookFacade.actions.setCurrentStep(this.currentStep() + 1);
  }
}
