import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { UtilService } from '../../../../services/util.services';
import { PagoService } from '../../../../services/pago.service';

@Component({
  selector: 'app-respuesta-pago-niubiz',
  imports: [MatDialogContent, MatDialogActions, MatDialogModule, MatIcon],
  templateUrl: './respuesta-pago-niubiz.html',
  styleUrl: './respuesta-pago-niubiz.scss'
})
export class RespuestaPagoNiubiz {
constructor(
  private dialogRef: MatDialogRef<RespuestaPagoNiubiz>,
  private router: Router,
  private pagoService: PagoService,
  private utilService: UtilService,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  console.log('Datos recibidos:', data);
}

  cerrar() {
    this.dialogRef.close();
    this.router.navigate(['/pages/pagos/pendientes/ip1']);
  }

  ticket() {
    const operacion = this.data.params.operacion===undefined?'':this.data.params.operacion.toString().trim();
    if (!operacion || operacion === '') {
      this.utilService.getAlert('Error', 'No se encontró el número de operación.', 'error', 'OK');
      return;
    }

    this.pagoService.generarTicket(operacion).subscribe({
      next: (pdfBlob) => {
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket-${operacion}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.utilService.getAlert('Error', 'No se pudo generar el ticket.', 'error', 'OK');
      }
    });
  }
}
