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
    private dialogRef: MatDialogRef<PasarelaPagos>,
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
    this.dialogRef.close(true);
  }
}
