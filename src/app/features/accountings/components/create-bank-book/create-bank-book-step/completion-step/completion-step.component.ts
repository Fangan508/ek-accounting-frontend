import { Component } from '@angular/core';
import { BankBookTitleComponent } from "./bank-book-title/bank-book-title.component";

@Component({
  selector: 'ek-completion-step',
  imports: [BankBookTitleComponent],
  templateUrl: './completion-step.component.html',
  styleUrl: './completion-step.component.scss'
})
export class CompletionStepComponent {

}
