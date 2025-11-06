import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SectionTitleComponent } from "@ek/shared/components/section-title/section-title/section-title.component";

@Component({
  selector: 'ek-bank-book-positions-step-header',
  imports: [SectionTitleComponent, MatIcon, MatButtonModule],
  templateUrl: './bank-book-positions-step-header.component.html',
  styleUrl: './bank-book-positions-step-header.component.scss'
})
export class BankBookPositionsStepHeaderComponent {
  onAddPosition(): void {
  }
}
