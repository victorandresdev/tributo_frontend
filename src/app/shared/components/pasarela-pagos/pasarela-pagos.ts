import { PagoService } from './../../../services/pago.service';
import { UtilService } from './../../../services/util.services';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PagoRequest } from '../../helpers/pago-request';
import { DeudaRequest } from '../../helpers/deuda-request';
import { CargaService } from '../../../services/carga.service';

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
  constructor(
    private fb:FormBuilder,
    private utilService:UtilService,
    private dialogRef: MatDialogRef<PasarelaPagos>,
    private pagoService: PagoService,
    private cargaService: CargaService,
    @Inject(MAT_DIALOG_DATA) public data: any
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
    this.formPago.get('total')?.disable();
    this.formPago.get('total')?.setValue('S/ ' + this.nMonto.toFixed(2));
    this.pest = 1;
    this.form.get('pest')?.valueChanges.subscribe((chng:any)=>{
      this.pest = chng;
    });
  }

  cancelar(){
    this.dialogRef.close(false);
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
}
