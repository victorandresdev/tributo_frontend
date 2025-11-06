import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material-module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MigajaPan } from '../../shared/components/migaja-pan/migaja-pan';
import { TitlePage } from '../../shared/components/title-page/title-page';

@Component({
  selector: 'app-inicio',
  imports: [MaterialModule, TitlePage, MigajaPan],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
  standalone: true,
})
export class Inicio implements OnInit {
  constructor(
    private fb:FormBuilder
  ){

  }

  frmDatos!: FormGroup;

  ngOnInit(): void {
    this.frmDatos = this.fb.group({
      contrib: [],
      nombre: [],
      apellidos: [],
      direccion: []
    });
    this.frmDatos.disable();
  }
}
