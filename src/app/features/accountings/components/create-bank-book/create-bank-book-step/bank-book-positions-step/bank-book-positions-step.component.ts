import { Component } from '@angular/core';
import { BankBookPositionsStepHeaderComponent } from "./bank-book-positions-step-header/bank-book-positions-step-header.component";
import { BankBookPositionsListComponent } from "./bank-book-positions-list/bank-book-positions-list.component";

@Component({
  selector: 'ek-bank-book-positions-step',
  imports: [BankBookPositionsStepHeaderComponent, BankBookPositionsListComponent],
  templateUrl: './bank-book-positions-step.component.html',
  styleUrl: './bank-book-positions-step.component.scss'
})
export class BankBookPositionsStepComponent {

}
