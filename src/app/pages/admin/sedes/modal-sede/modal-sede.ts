import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-sede',
  imports: [MatCardModule, MatIconModule, MatButtonModule,
    CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule,
  ],
  templateUrl: './modal-sede.html',
  styleUrl: './modal-sede.scss'
})
export class ModalSede implements OnInit{
  dtSede: any;
  form!: FormGroup;
  idSede!: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalSede>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }

  ngOnInit(): void {
    this.idSede = 0;
    this.form = this.fb.group({
      local:["",[Validators.required, Validators.minLength(5)]],
      direccion:["",[Validators.required, Validators.minLength(8)]]
    });
    if(this.data != null){
      this.dtSede = this.data;
      this.idSede = this.dtSede.nId;
      this.form.get('local')?.setValue(this.dtSede.sLocal);
      this.form.get('direccion')?.setValue(this.dtSede.sDireccion);
    }
  }

  cerrar(): void {
    this.dialogRef.close(null);
  }
}
