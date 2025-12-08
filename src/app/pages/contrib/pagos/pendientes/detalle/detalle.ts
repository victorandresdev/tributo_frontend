import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DetallePendiente } from '../../../../../shared/helpers/detallePendiente';

@Component({
  selector: 'app-detalle',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.scss'
})
export class Detalle {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<Detalle>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }

  adicionales:DetallePendiente[] = [
    {icono:'local_police',texto:'Serenazgo',monto:250, nId:1},
    {icono:'cleaning_services',texto:'Limpieza Pública',monto:150, nId:2},
    {icono:'forest',texto:'Parques y Jardines Públicos',monto:120, nId:3},
  ];

  cerrar(): void {
    this.dialogRef.close(null);
  }
}
