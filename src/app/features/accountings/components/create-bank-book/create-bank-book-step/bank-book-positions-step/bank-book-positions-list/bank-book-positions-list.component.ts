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
    return (positions?.metadata ?? []).map(position => ({
      ...position,
      credit: Number(position.credit) || 0,
      debit: Number(position.debit) || 0
    }));
  });

  columnDefs: ColDef[] = [
    { field: 'documentNumber', headerName: 'Beleg', width: 70 },
    { field: 'bookingDate', headerName: 'Datum', width: 100, valueFormatter: params => this.formatDateDE(params.value) },
    { field: 'text', headerName: 'Text', width: 300 },
    { field: 'credit', headerName: 'Haben', width: 100, valueFormatter: params => this.formatNumberDE(params.value) },
    { field: 'debit', headerName: 'Soll', width: 100, valueFormatter: params => this.formatNumberDE(params.value) },
    { field: 'balance', headerName: 'Saldo', width: 100, valueFormatter: params => this.formatNumberDE(params.value) }
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

  formatNumberDE(value: any): string { 
    if (value === null || value === undefined) return ''; 
    
    console.log('value:', value);
    const normalized = String(value).replace(',', '.');
    
    const num = Number(normalized); 
    
    if (isNaN(num)) return ''; 
    
    console.log('Normalizing value:', normalized);

    return num.toLocaleString('de-DE', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }); 
  }
}
