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
import { SesionData } from '../../shared/helpers/sesionData';

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
    private utilService: UtilService
  ){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      usuario: ['',[Validators.required]],
      clave: ['',[Validators.required]]
    })
  }

  validaUsuario(){
    let usu: string ='ADMIN';
    let pwd: string = '123456';
    let credencial:any = {
      "nick":usu,
      "clave":pwd
    }
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.usuarioService.getLogin(credencial).subscribe({
      next: (rstp:any) => {
        let dataUsu:any;
        dataUsu = this.usuarioService.getDatosUsuario(this.form.get('usuario')?.value);
        if(rstp.token != undefined && dataUsu != undefined){
          let infoUsuario:SesionData = {
            usuario: {
              tipoUsuario: APP_CONSTANTS.TIPO_USUARIO.ADMINISTRADOR,
              login: dataUsu.login,
              nombres: dataUsu.nombre,
              sexo: dataUsu.sexo
            }
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
