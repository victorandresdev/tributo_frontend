import { UtilService } from './../../services/util.services';
import { MatCardModule } from '@angular/material/card';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MigajaPan } from '../../shared/components/migaja-pan/migaja-pan';
import { TitlePage } from '../../shared/components/title-page/title-page';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { InputInfo } from "../../shared/components/input-info/input-info";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { APP_CONSTANTS } from '../../shared/constants/app.constants';
import { APP_ROUTES } from '../../shared/constants/app.routes';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inicio',
  imports: [TitlePage, MigajaPan,
    CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatCardModule, InputInfo, MatDatepickerModule, MatButtonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
  standalone: true,
})
export class Inicio implements OnInit {
  constructor(
    private fb:FormBuilder,
    private utilService: UtilService
  ){

  }

  selected:Date = new Date();
  infoUsu!:any;
  APP_CONSTANTS = APP_CONSTANTS;

  ngOnInit(): void {

    if(this.utilService.getSesionStorage(APP_CONSTANTS.VAR_USUARIO) == undefined){
      this.utilService.removeAllStorage();
      this.utilService.link(APP_ROUTES.URL_LOGIN);
    }else{
      let aux:any = this.utilService.getSesionStorage(APP_CONSTANTS.VAR_USUARIO);
      this.infoUsu = JSON.parse(aux);
      if(this.infoUsu.usuario.tipoUsuario == APP_CONSTANTS.TIPO_USUARIO.CONTRIBUYENTE){

      }
    }
  }

  ir(nro:number){
    this.utilService.cambiaMenu(2)
    if(nro == 1){
      this.utilService.link(APP_ROUTES.URL_PAGOS.PENDIENTES.PREDIAL);
    }else{
      this.utilService.link(APP_ROUTES.URL_PAGOS.HISTORIA);
    }
  }
}
