import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material-module';
import { FooterComponent } from '../../shared/components/footer-component/footer-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargaService } from '../../services/carga.service';
import { UsuarioService } from '../../services/usuario.service';
import { UtilService } from '../../services/util.services';
import { APP_ROUTES } from '../../shared/constants/app.routes';
import { APP_CONSTANTS } from '../../shared/constants/app.constants';

@Component({
  selector: 'app-login-admin-component',
  imports: [FooterComponent, MaterialModule],
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
    this.usuarioService.getLogin(credencial).subscribe({
      next: (rstp:any) => {
        if(rstp.token != undefined){
          this.utilService.setLocalStorage(APP_CONSTANTS.VAR_TOKEN, rstp.token);
          this.utilService.link(APP_ROUTES.URL_ADMIN_INICIO);
        }else{
          this.utilService.getAlert("Fallo login.","Usuario o clave no válido.","error","Entendido");
        }
      },
      error: () => {

      }
    });
  }

}
