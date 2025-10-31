import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BankBooksListComponent } from '@ek/features/accountings/components/bank-books-list/bank-books-list.component';

@Component({
  selector: 'ek-bank-books',
  imports: [RouterOutlet, BankBooksListComponent],
  templateUrl: './bank-books.component.html',
  styleUrl: './bank-books.component.scss'
})
export class BankBooksComponent {

}