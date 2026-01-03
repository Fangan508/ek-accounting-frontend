import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ExportOption } from '@ek/features/accountings/models/export-option.model';
import {MatMenuModule} from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ek-save-export-dropdownbutton',
  imports: [MatButtonModule, MatIcon, MatFormField, MatLabel, MatSelectModule, MatMenuModule],
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

  _onSave(value: string): void {
    switch (value) {
      case 'save-export':
        this._save(true);
        break;
      case 'save':
        this._save(false);
        break;
      default:
        break;
    }
    console.log('Save action triggered');
  }

  private _save(download?: boolean): void {
    // Implement save and export logic here
    if (download) {
      console.log('Saving and exporting...');
    } else {
      console.log('Saving without export...');
    }
  }
}
