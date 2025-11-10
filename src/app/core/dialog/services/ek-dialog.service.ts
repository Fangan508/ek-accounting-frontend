import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class EkDialogService {

  constructor(private readonly _dialogService: MatDialog) {}

  open(config: { content: any, dialogConfig?: MatDialogConfig }) : MatDialogRef<any> {
    const dialogRef: MatDialogRef<any> = this._dialogService.open(config.content, {
      
      width: config.dialogConfig?.width || '100%',
      minWidth: config.dialogConfig?.minWidth || 375,
      maxWidth: '40vw',
      minHeight: config.dialogConfig?.minHeight || '80vh',
      maxHeight: config.dialogConfig?.maxHeight || '80vh'
    } );

    return dialogRef;
  }
}
