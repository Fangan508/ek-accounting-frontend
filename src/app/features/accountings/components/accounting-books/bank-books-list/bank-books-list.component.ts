import { Component, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ModuleRegistry  } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-theme-material.css';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'ek-bank-books-list',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './bank-books-list.component.html',
  styleUrl: './bank-books-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BankBooksListComponent {

  rowData = [
    {make: "Tesla", model: "Model Y", price: 64950, electric: true},
    {make: "Ford", model: "Mustang Mach-E", price: 58900, electric: true},
    {make: "BMW", model: "X5", price: 65900, electric: false},
    {make: "Hyundai", model: "Ioniq 5", price: 47900, electric: true},
    {make: "Toyota", model: "Camry", price: 28950, electric: false},
    {make: "Lucid", model: "Air Pure", price: 77400, electric: true}
  ];

  colDefs: ColDef[] = [
    { field: "make"},
    { field: "model"},
    { field: "price"},
    { field: "electric"}
  ];
}
