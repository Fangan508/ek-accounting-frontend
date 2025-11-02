import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'ek-bank-books-header',
  imports: [MatButtonModule],
  templateUrl: './bank-books-header.component.html',
  styleUrl: './bank-books-header.component.scss'
})
export class BankBooksHeaderComponent {

  constructor(private readonly _router: Router) {}

  navigate(path: string): void {
    this._router.navigate([path]);
  }
}
