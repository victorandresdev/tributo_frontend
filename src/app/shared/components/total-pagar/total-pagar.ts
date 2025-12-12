import { UtilService } from './../../../services/util.services';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PasarelaPagos } from '../pasarela-pagos/pasarela-pagos';

@Component({
  selector: 'app-total-pagar',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './total-pagar.html',
  styleUrl: './total-pagar.scss'
})
export class TotalPagar {
  @Input() montoTotal!:number;
  @Input() lstDetalle!:any[];

  constructor(
    private dialog: MatDialog,
    private utilService:UtilService
  ){

  }

  pagar(){
    if(this.montoTotal > 0){
      let ventana:any = this.dialog.open(PasarelaPagos, {
        width: '600px',
        height: '500px',
        data: {
          info: this.lstDetalle,
          total: this.montoTotal
        }
      });
      ventana.afterClosed().subscribe({
        next: (rpta:any) => {

        },
        error: () => {

        }
      });
    }else{
      this.utilService.getAlert("Informativo","Debe seleccionar al menos un tributo a pagar.","info","Entendido");
    }
  }
}
