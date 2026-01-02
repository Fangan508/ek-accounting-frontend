import { Component, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ExportOption } from '@ek/features/accountings/models/export-option.model';

@Component({
  selector: 'ek-save-export-dropdownbutton',
  imports: [MatFormField, MatLabel, MatSelectModule],
  templateUrl: './save-export-dropdownbutton.component.html',
  styleUrl: './save-export-dropdownbutton.component.scss'
})
export class SaveExportDropdownbuttonComponent implements OnInit {
  exportMenuOptions: ExportOption[] = [];

  ngOnInit(): void {
    this.exportMenuOptions = [
      { label: 'Speichern und exportieren', value: 'save-export' },
      { label: 'Speichern ohne Export', value: 'save' }
    ];
  }
}
