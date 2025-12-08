import { Component, OnInit } from '@angular/core';
import { MigajaPan } from "../../../shared/components/migaja-pan/migaja-pan";
import { TitlePage } from "../../../shared/components/title-page/title-page";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SedesLista } from "./sedes-lista/sedes-lista";
import { SedeService } from '../../../services/sede.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalSede } from './modal-sede/modal-sede';

@Component({
  selector: 'app-sedes',
  imports: [MigajaPan, TitlePage,
    CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatButtonModule, SedesLista],
  templateUrl: './sedes.html',
  styleUrl: './sedes.scss'
})
export class Sedes implements OnInit{
  form!:FormGroup;
  lstSedes:any[] = [];
  constructor(
    private fb:FormBuilder,
    private sedeService: SedeService,
    private dialog: MatDialog,
  ){

  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.lstSedes = this.sedeService.getSedes();
  }

  agregaSede(){
    let ventana:any = this.dialog.open(ModalSede, {
      width: '400px',
      height: 'auto',
      data:null
    });
    ventana.afterClosed().subscribe({
      next: (rpta:any) => {

      },
      error: () => {

      }
    });
  }
}
