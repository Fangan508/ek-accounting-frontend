import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { EkDialogService } from '@ek/core/dialog/services/ek-dialog.service';
import { CreateBankBookDialogComponent } from '../../create-bank-book/create-bank-book-dialog/create-bank-book-dialog.component';

@Component({
  selector: 'ek-bank-books-header',
  imports: [MatButtonModule],
  templateUrl: './bank-books-header.component.html',
  styleUrl: './bank-books-header.component.scss'
})
export class BankBooksHeaderComponent implements OnInit {
  private readonly _ekDialogService = inject(EkDialogService)

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    
  }

  createBankBook(): void {
    this._ekDialogService.open({
      content: CreateBankBookDialogComponent, dialogConfig: { panelClass: 'create-bank-book-dialog' }
    });
  }
}
