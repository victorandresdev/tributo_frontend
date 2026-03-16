import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { PagoService } from '../../../../services/pago.service';
import { UtilService } from '../../../../services/util.services';

@Component({
  selector: 'app-respuesta-niubiz',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './respuesta-niubiz.html',
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
    }
    mat-card {
      max-width: 500px;
      width: 100%;
      text-align: center;
      padding: 20px;
    }
    .success-icon {
      font-size: 64px;
      height: 64px;
      width: 64px;
      color: green;
      margin-bottom: 20px;
    }
    .error-icon {
      font-size: 64px;
      height: 64px;
      width: 64px;
      color: red;
      margin-bottom: 20px;
    }
  `]
})
export class RespuestaNiubiz implements OnInit {
  isSuccess: boolean | null = null;
  message: string | null = null;
  resultPago: any;
  operacion: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagoService: PagoService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('Parámetros de respuesta Niubiz:', params);
      this.isSuccess = params['isSuccess'] === 'true' || params['isSuccess'] === true;
      this.message = params['message'] || null;
      this.operacion = params['operacion'] || null;
     
    });
  }

  volver() {
    this.router.navigate(['/pages/pagos/pendientes/ip1']);
  }

 
  ticket() {
    const operacion = this.operacion?.toString().trim();
    if (!operacion) {
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
