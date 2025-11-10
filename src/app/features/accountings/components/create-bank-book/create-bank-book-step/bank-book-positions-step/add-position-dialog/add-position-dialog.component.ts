import { Component } from '@angular/core';
import { SectionTitleComponent } from "@ek/shared/components/section-title/section-title/section-title.component";
import { BankBookPositionFormComponent } from './bank-book-position-form/bank-book-position-form.component';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';

@Component({
  selector: 'ek-add-position-dialog',
  imports: [BankBookPositionFormComponent],
  templateUrl: './add-position-dialog.component.html',
  styleUrl: './add-position-dialog.component.scss',
  providers: [CreateBankBookFacade]
})
export class AddPositionDialogComponent {

}
