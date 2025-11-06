import { Component, Input } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'ek-bank-book-positions-list',
  imports: [AgGridModule],
  templateUrl: './bank-book-positions-list.component.html',
  styleUrl: './bank-book-positions-list.component.scss'
})
export class BankBookPositionsListComponent {
  // start with an empty grid
  rowData: any[] = [];

  columnDefs: ColDef[] = [
    { field: 'documentNumber', headerName: 'Beleg' },
    { field: 'date', headerName: 'Datum' },
    { field: 'account', headerName: 'Konto' },
    { field: 'text', headerName: 'Text' },
    { field: 'credit', headerName: 'Haben' },
    { field: 'debit', headerName: 'Soll' },
    { field: 'balance', headerName: 'Saldo' },
    { field: 'counterAccount', headerName: 'Gegenkonto' }
  ];

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    minWidth: 100,
    flex: 1
  };

  // allow parent to provide data later
  @Input() set positions(value: any[] | null | undefined) {
    this.rowData = value ?? [];
  }
}
