import { PagoService } from './../../../services/pago.service';
import { UtilService } from './../../../services/util.services';
import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PagoRequest } from '../../helpers/pago-request';
import { DeudaRequest } from '../../helpers/deuda-request';
import { CargaService } from '../../../services/carga.service';
import {NiubizService} from '../../../services/niubiz.service';
import {SessionResponse} from '../../helpers/niubiz/sessionResponse';
import { ContribuyenteService } from '../../../services/contribuyente.service';
import { LiquidacionPago } from '../../helpers/liquidacion-pago';

@Component({
  selector: 'app-pasarela-pagos',
  imports: [MatCardModule, MatIconModule, MatButtonToggleModule,
    ReactiveFormsModule, FormsModule, MatInputModule,
    MatFormFieldModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './pasarela-pagos.html',
  styleUrl: './pasarela-pagos.scss'
})
export class PasarelaPagos implements OnInit {
  form!:FormGroup;
  formPago!:FormGroup;
  pest!:number;
  lstDetalle:any[] = [];
  nMonto:number = 0;
  sessionResponse?:SessionResponse;
  urlRespuestaNiubiz: string = '';
  lstIdentif:Array<string> = [];
  constructor(
    private fb:FormBuilder,
    private utilService:UtilService,
    private dialogRef: MatDialogRef<PasarelaPagos>,
    private pagoService: PagoService,
    private cargaService: CargaService,
    private niubizService: NiubizService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private renderer: Renderer2,
    private contriService: ContribuyenteService
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      pest:["1"]
    });
    this.formPago = this.fb.group({
      nro:["",[Validators.required]],
      fecha:["",[Validators.required]],
      codigo:["",[Validators.required]],
      nombre:["",[Validators.required]],
      correo:["",[Validators.required]],
      total:["",],
    });
    this.lstDetalle = this.data.info;
    this.nMonto = this.data.total;
    this.lstIdentif = this.data.lstIdentif;
    console.log("LLEGAN IDENTIF: ", this.lstIdentif);
    this.formPago.get('total')?.disable();
    this.formPago.get('total')?.setValue('S/ ' + this.nMonto.toFixed(2));
    this.pest = 1;
    this.form.get('pest')?.valueChanges.subscribe((chng:any)=>{
      this.pest = chng;
    });

    this.niubizService.getSession(this.nMonto, this.lstIdentif).subscribe((res:any)=>{
      console.log('PRUEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      this.sessionResponse = res as SessionResponse;
      // this.urlRespuestaNiubiz = "http://localhost:8085/pago-online/niubiz/callback/" + (this.sessionResponse?.purchaseNumber || '');
      this.urlRespuestaNiubiz = "http://192.168.0.61:8085/pago-online/niubiz/callback/" + (this.sessionResponse?.purchaseNumber || '');
      setTimeout(()=>{
        this.loadNiubizScript();
      }, 150)
    });

  }

  cancelar(){
    this.dialogRef.close(false);
  }

  pagarEnLinea(){

  }

  grabar(){
    if(this.formPago.invalid){
      this.formPago.markAllAsTouched();
    }else{
      let objPago:PagoRequest = new PagoRequest();
      objPago.nForma = this.data.tipoDeuda;
      objPago.nMonto = this.nMonto;
      objPago.cNroOpera = this.utilService.getNumeroAleatorio(1000,9999).toString();
      objPago.cKey = this.utilService.getNumeroAleatorio(100,999).toString();
      objPago.nNroTar = '999-999-999-999';
      objPago.nIdUsuario = 1;
      objPago.dFechaReg = this.utilService.formatoFecha(new Date(),"fecha");
      let deudas:DeudaRequest[] = [];
      this.data.info.forEach((item:any)=>{
        deudas.push(
          {
            nIdDeuda: item.nIdDeuda,
            nMonto: item.nPagara,
            nEstado: 1,
            nTipo: 1
          }
        );
      });
      objPago.deudas = deudas;
      console.log("Registro deuda: ",objPago);
      this.cargaService.show();
      this.pagoService.setPago(objPago).subscribe({
        next: (rpta:any) => {
          this.cargaService.hide();
          console.log(rpta);
          let confort:any = this.utilService.getAlert("Informativo","Registro terminado.","success","Aceptar");
          this.dialogRef.close(true);
        },
        error: (err:any) => {
          this.cargaService.hide();
          this.utilService.getAlert("Error",err.toString(),"error","OK");
        }
      });
      //objPago.persona = null;
    }
  }

  private loadNiubizScript(): void {
    console.log('1111111111111111111111111111');
    /*let info:LiquidacionPago = new LiquidacionPago();
    info.ctaidentif = this.lstIdentif;
    this.contriService.setLiquidacionPagos(info).subscribe({
      next: (rpta:any)=>{
        console.log("VER CODIGO OPERACION: ",rpta);
      },
      error: () => {

      }
    })*/
    let amount = this.sessionResponse?.amount?.toFixed(2).toString() || '';
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://static-content-qas.vnforapps.com/env/sandbox/js/checkout.js';
    script.setAttribute('data-sessiontoken', this.sessionResponse?.sessionKey || '');
    script.setAttribute('data-channel', 'web');
    script.setAttribute('data-merchantid', this.sessionResponse?.merchantId || '');
    script.setAttribute('data-purchasenumber', this.sessionResponse?.purchaseNumber || '');
    script.setAttribute('data-amount', amount);
    script.setAttribute('data-expirationminutes', '20');
    script.setAttribute('data-timeouturl', 'about:blank');
    script.setAttribute('data-formbuttoncolor', '#000000');

    // Configurar el callback de respuesta
    (window as any).onAuthorize = (response: any) => {
      console.log('Niubiz response:', response);
      // Aquí manejas la respuesta de Niubiz y procesas el pago
      this.procesarRespuestaNiubiz(response);
    };

    const form = document.getElementById('niubiz-payment-form');
    console.log('Loading Niubiz script with amount:', this.sessionResponse?.amount);
    console.log("script:", script);
    if (form) {
      console.log('Loading Niubiz script with session token:', this.sessionResponse?.sessionKey);
      form.innerHTML = ''; // Limpiar el formulario antes de inyectar el script
      this.renderer.setAttribute(form, 'action', this.urlRespuestaNiubiz);
      this.renderer.appendChild(form, script);
    }
  }

  private procesarRespuestaNiubiz(response: any): void {
    console.log('Procesando respuesta Niubiz:', response);
  }
}
