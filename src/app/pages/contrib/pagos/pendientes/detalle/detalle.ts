import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DetallePendiente, DetalleVentana } from '../../../../../shared/helpers/detalle-pendiente';

@Component({
  selector: 'app-detalle',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.scss'
})
export class Detalle implements OnInit{
  public infoMuestra:DetalleVentana = new DetalleVentana();

  adicionales:DetallePendiente[] = [
    /*{icono:'local_police',texto:'Serenazgo',monto:250, nId:1},
    {icono:'cleaning_services',texto:'Limpieza Pública',monto:150, nId:2},
    {icono:'forest',texto:'Parques y Jardines Públicos',monto:120, nId:3},*/
  ];

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<Detalle>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }

  ngOnInit(): void {
    if(this.data){
      this.infoMuestra = this.data;
      this.adicionales.push({icono:'local_police', texto: this.infoMuestra.tributo, monto: this.infoMuestra.total})
    }
  }

  cerrar(): void {
    this.dialogRef.close(null);
  }
}
