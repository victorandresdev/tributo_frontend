import { UtilService } from './../../../services/util.services';
import { LayoutService } from './../../../services/layout.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SesionData } from '../../helpers/sesionData';
import { CommonModule } from '@angular/common';
import { APP_ROUTES } from '../../constants/app.routes';

@Component({
  selector: 'app-head-component',
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './head-component.html',
  styleUrl: './head-component.scss',
  standalone: true,
})
export class HeadComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private layoutService:LayoutService,
    private utilService: UtilService
  ){

  }
  usuSex!:number;
  usuNombre!:string;
  

  ngOnInit(): void {
    let infoUsu:any = this.utilService.getSesionStorage(APP_CONSTANTS.VAR_USUARIO);
    if(infoUsu != undefined){
      let infoUsuario:SesionData = new SesionData();
      infoUsuario = JSON.parse(infoUsu);
      this.usuSex = infoUsuario.usuario?.sexo || 0;
      this.usuNombre = infoUsuario.usuario?.nombres || '';
    }else{
      this.usuSex = 1;
      this.usuNombre = 'Jhoane Lis, Piñeda Salas';
    }
  }

  salir(){
    this.usuarioService.logout();
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
