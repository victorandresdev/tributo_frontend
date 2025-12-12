import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer-component/footer-component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CargaService } from '../../services/carga.service';
import { UsuarioService } from '../../services/usuario.service';
import { UtilService } from '../../services/util.services';
import { APP_ROUTES } from '../../shared/constants/app.routes';
import { APP_CONSTANTS } from '../../shared/constants/app.constants';
import { CommonModule } from '@angular/common';
import { SesionData, UsuarioData } from '../../shared/helpers/sesionData';
import { AdminRequest } from '../../shared/helpers/login/admin-request';
import { ContribuyenteService } from '../../services/contribuyente.service';

@Component({
  selector: 'app-login-admin-component',
  imports: [FooterComponent, MatCardModule,
    CommonModule, ReactiveFormsModule, FormsModule, MatInputModule],
  templateUrl: './login-admin-component.html',
  styleUrl: './login-admin-component.scss'
})
export class LoginAdminComponent implements OnInit{
  form!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private cargaService: CargaService,
    private usuarioService: UsuarioService,
    private utilService: UtilService,
    private contriSevices: ContribuyenteService
  ){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      usuario: ['',[Validators.required]],
      clave: ['',[Validators.required]]
    })
  }

  validaUsuario(){
    let credencial:AdminRequest = new AdminRequest();
    credencial.username = this.form.get('usuario')?.value;
    credencial.password = this.form.get('clave')?.value;
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.usuarioService.getLoginAdmin(credencial).subscribe({
      next: (rstp:any) => {
        if(rstp.token != undefined){
          this.utilService.setLocalStorage(APP_CONSTANTS.VAR_TOKEN, rstp.token);
          /*this.contriSevices.datosGenerales().subscribe({
            next: (rpta:any) => {
              this.cargaService.hide();
              let usuarioDt: UsuarioData = new UsuarioData();
              usuarioDt = {
                tipoUsuario: APP_CONSTANTS.TIPO_USUARIO.ADMINISTRADOR,
                login: "TAPIA",
                nombres: rpta.apellidos + ', ' + rpta.nombres,
                sexo: parseInt(rpta.sexo),
                direccion: rpta.direccion,
                codigoContribuyente: rpta.codigoContribuyente,
                idContribuyente: parseInt(rpta.idContribuyente)
              }
              let infoUsuario:SesionData = new SesionData();
              infoUsuario = {
                usuario: usuarioDt
              }
              this.utilService.setSesionStorage(APP_CONSTANTS.VAR_USUARIO, JSON.stringify(infoUsuario));
              this.utilService.setLocalStorage(APP_CONSTANTS.VAR_TOKEN, rstp.token);
              this.utilService.link(APP_ROUTES.URL_INICIO);
            },
            error: () => {
              this.cargaService.hide();
            }
          });*/

          this.cargaService.hide();
          let usuarioDt: UsuarioData = new UsuarioData();
          usuarioDt = {
            tipoUsuario: APP_CONSTANTS.TIPO_USUARIO.ADMINISTRADOR,
            login: "ADMIN",
            nombres: "ADMIN",
            sexo: 0,
            direccion: "MUNICIPALIDAD",
            codigoContribuyente: "00000000",
            idContribuyente: 0
          }
          let infoUsuario:SesionData = new SesionData();
          infoUsuario = {
            usuario: usuarioDt
          }
          this.utilService.setSesionStorage(APP_CONSTANTS.VAR_USUARIO, JSON.stringify(infoUsuario));
          this.utilService.setLocalStorage(APP_CONSTANTS.VAR_TOKEN, rstp.token);
          this.utilService.link(APP_ROUTES.URL_INICIO);
        }else{
          this.utilService.getAlert("Fallo login.","Usuario o clave no válido.","error","Entendido");
        }
      },
      error: () => {

      }
    });
  }

}
