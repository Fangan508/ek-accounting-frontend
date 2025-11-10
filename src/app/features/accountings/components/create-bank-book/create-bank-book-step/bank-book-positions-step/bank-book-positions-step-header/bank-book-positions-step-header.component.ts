import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EkDialogService } from '@ek/core/dialog/services/ek-dialog.service';
import { SectionTitleComponent } from "@ek/shared/components/section-title/section-title/section-title.component";
import { AddPositionDialogComponent } from '../add-position-dialog/add-position-dialog.component';

@Component({
  selector: 'ek-bank-book-positions-step-header',
  imports: [SectionTitleComponent, MatIcon, MatButtonModule],
  templateUrl: './bank-book-positions-step-header.component.html',
  styleUrl: './bank-book-positions-step-header.component.scss'
})
export class BankBookPositionsStepHeaderComponent {
  constructor(private readonly _ekDialogService: EkDialogService) {}  

  onAddPosition(): void {
    this._ekDialogService.open({
      content: AddPositionDialogComponent      
    });
  }
}
