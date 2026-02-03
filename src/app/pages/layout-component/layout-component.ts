import { LayoutService } from './../../services/layout.service';
import { APP_CONSTANTS } from './../../shared/constants/app.constants';
import { ChangeDetectorRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer-component/footer-component';
import { HeadComponent } from '../../shared/components/head-component/head-component';
import { MatIconModule } from '@angular/material/icon';
import { UtilService } from '../../services/util.services';
import {MatTooltipModule} from '@angular/material/tooltip';
import { APP_ROUTES } from '../../shared/constants/app.routes';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet, FooterComponent, HeadComponent, MatIconModule, MatTooltipModule],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.scss'
})
export class LayoutComponent implements OnInit{

  constructor(
    private utilService: UtilService,
    public layoutService: LayoutService,
    private usuarioService: UsuarioService,
  ){

  }

  pagActiva:number = 1;
  lstMenu:any[] = [];
  intervalId:any;
  valActivo!:number;

  APP_MENU = APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE;
  VMENU = APP_CONSTANTS.VAL_MENU;

  ngOnInit(): void {
    if(this.utilService.getSesionStorage(APP_CONSTANTS.VAR_USUARIO) == undefined){
      this.utilService.removeAllStorage();
      this.utilService.link(APP_ROUTES.URL_LOGIN);
    }else{
      let aux:any = this.utilService.getSesionStorage(APP_CONSTANTS.VAR_USUARIO);
      let infoUsu:any = JSON.parse(aux);
      this.lstMenu.push(APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.INICIO);
      if(infoUsu.usuario.tipoUsuario == APP_CONSTANTS.TIPO_USUARIO.CONTRIBUYENTE){
        this.lstMenu.push(APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.PAGOS);
        this.lstMenu.push(APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.CITAS);
      }else{
        this.lstMenu.push(APP_CONSTANTS.VAR_MENU.ADMIN.USUARIOS);
        this.lstMenu.push(APP_CONSTANTS.VAR_MENU.ADMIN.SEDES);
        this.lstMenu.push(APP_CONSTANTS.VAR_MENU.ADMIN.REPORTES);
      }
      let activa:number = 1;
      if(this.utilService.getLocalStorage(APP_CONSTANTS.VAR_PAGE_ACTIVA) != undefined){
        activa = parseInt(this.utilService.getLocalStorage(APP_CONSTANTS.VAR_PAGE_ACTIVA));
      }
      this.utilService.cambiaMenu(activa);
    }
  }

  ir(idPage:number, ruta:string){
    this.utilService.cambiaMenu(idPage);
    this.utilService.setLocalStorage(APP_CONSTANTS.VAR_PAGE_ACTIVA,idPage.toString());
    this.utilService.link(ruta);
  }

  salir(){
    this.usuarioService.logout();
  }
}
