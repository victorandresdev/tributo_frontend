import { UsuarioService } from './../../services/usuario.service';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer-component/footer-component';
import { MaterialModule } from '../../material/material/material-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargaService } from '../../services/carga.service';
import { UtilService } from '../../services/util.services';
import { APP_CONSTANTS } from '../../shared/constants/app.constants';
import { APP_ROUTES } from '../../shared/constants/app.routes';

@Component({
  selector: 'app-login-component',
  imports: [FooterComponent, MaterialModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
  standalone: true,
  /*changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class LoginComponent implements OnInit {
  frmDNI!:FormGroup;
  frmCont!:FormGroup;
  nBloqueActivo!:number;

  constructor(
    private fb:FormBuilder,
    private cargaService: CargaService,
    private usuarioService: UsuarioService,/**/
    private utilService: UtilService
  ){}

  ngOnInit(): void {
    /* Muestra precarga */
    this.cargaService.show();
    this.nBloqueActivo = 1;
    this.frmDNI = this.fb.group({
      nro:['',[Validators.required,Validators.maxLength(8), Validators.minLength(8)]],
      dig:['',[Validators.required,Validators.maxLength(1), Validators.minLength(1)]],
      nac:['',[Validators.required]]
    });
    this.frmCont = this.fb.group({
      cod:['',[Validators.required,Validators.maxLength(6), Validators.minLength(12)]],
    });
    /* Oculta precarga */
    this.cargaService.hide();
  }

  cambiaContenido(nBloque:number = 1){
    if(nBloque != this.nBloqueActivo){
      this.nBloqueActivo = nBloque;
      if(this.nBloqueActivo == 1){
        this.frmDNI.reset();
      }else{
        this.frmCont.reset();
      }
    }
  }

  permitidoNumero(event: KeyboardEvent){
    const charCode = (event.which) ? event.which : event.keyCode;
    const letra = String.fromCharCode(charCode);
    let regPermitido:RegExp = /^[0-9]+$/;
    if(!regPermitido.test(letra)){
      event.preventDefault();
    }
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
