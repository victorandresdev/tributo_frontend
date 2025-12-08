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
import { ModalSede } from '../modal-sede/modal-sede';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-modal-terminal',
  imports: [MatCardModule, MatIconModule, MatButtonModule,
    CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatSlideToggleModule],
  templateUrl: './modal-terminal.html',
  styleUrl: './modal-terminal.scss'
})
export class ModalTerminal implements OnInit{
  form!: FormGroup;
  idSede!: number;
  lstPcs:any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalSede>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      ip: ["",[Validators.required]],
      nombre: ["",[Validators.required]],
      estado: [false]
    });
    if(this.data != null){
      this.idSede = this.data.nId;
      this.lstPcs = this.data.terminales;
    }
  }
}
