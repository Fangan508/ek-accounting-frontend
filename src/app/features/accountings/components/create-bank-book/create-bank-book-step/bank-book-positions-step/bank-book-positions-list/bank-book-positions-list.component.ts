import { Component, computed, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'ek-bank-book-positions-list',
  imports: [AgGridModule, CommonModule],
  templateUrl: './bank-book-positions-list.component.html',
  styleUrl: './bank-book-positions-list.component.scss'
})
export class BankBookPositionsListComponent implements OnInit {
  bankBookPositions = this._createBankBookFacade.signalSelectors.bankBookPositions;

  // rowData = computed(() => this.bankBookPositions().metadata ?? []);

  rowData = computed(() => {


    const positions = this.bankBookPositions();
    console.log('Bank Book Positions:', positions);
    return positions?.metadata ?? [];
  });

  columnDefs: ColDef[] = [
    { field: 'documentNumber', headerName: 'Beleg', width: 70 },
    { field: 'bookingDate', headerName: 'Datum', width: 100, valueFormatter: params => this.formatDateDE(params.value) },
    { field: 'account', headerName: 'Konto', width: 100 },
    { field: 'text', headerName: 'Text', width: 300 },
    { field: 'credit', headerName: 'Haben', width: 100 },
    { field: 'debit', headerName: 'Soll', width: 100 },
    { field: 'balance', headerName: 'Saldo', width: 100 },
    { field: 'counterAccount', headerName: 'Gegenkonto', width: 100 }
  ];

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    minWidth: 100,
    flex: 1
  };

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}

  ngOnInit(): void {
    this._createBankBookFacade.actions.loadBankBookPositions(); 
  }

  formatDateDE(date: any): string { 
    if (!date) return ''; 
    
    const d = new Date(date); 
    
    if (isNaN(d.getTime())) 
      return ''; 
    
    return d.toLocaleDateString('de-DE'); // → dd.MM.yyyy 
  }
}
