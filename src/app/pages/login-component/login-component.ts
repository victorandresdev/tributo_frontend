import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsuarioService } from './../../services/usuario.service';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer-component/footer-component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CargaService } from '../../services/carga.service';
import { UtilService } from '../../services/util.services';
import { APP_ROUTES } from '../../shared/constants/app.routes';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { APP_CONSTANTS, MY_DATE_FORMATS } from '../../shared/constants/app.constants';
import { SesionData, UsuarioData } from '../../shared/helpers/sesionData';
import { PersonaRequest } from '../../shared/helpers/login/persona-request';
import { ContribuyenteService } from '../../services/contribuyente.service';

@Component({
  selector: 'app-login-component',
  imports: [FooterComponent, MatCardModule, MatIconModule,
    CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatDatepickerModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
  standalone: true,
  providers: [
    { provide: MY_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
  /*changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class LoginComponent implements OnInit {
  frmDNI!:FormGroup;
  frmCont!:FormGroup;
  nBloqueActivo!:number;
  credencial!:PersonaRequest;

  constructor(
    private fb:FormBuilder,
    private cargaService: CargaService,
    private usuarioService: UsuarioService,/**/
    private utilService: UtilService,
    private contriSevices: ContribuyenteService
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
    this.credencial = new PersonaRequest()
    if(this.nBloqueActivo = 1){
      this.credencial.nroDoc = this.frmDNI.get('nro')?.value;
      this.credencial.fechaNacimiento = this.utilService.formatoFecha(this.frmDNI.get('nac')?.value,"fecha");
    }else{
      this.credencial.codigoContribuyente = this.frmCont.get('cod')?.value;
    }
    this.cargaService.show();
    this.usuarioService.getLoginContribuyente(this.nBloqueActivo, this.credencial).subscribe({
      next: (rstp:any) => {
        //console.log(rstp); return;
        if(rstp.token != undefined){
          this.utilService.setLocalStorage(APP_CONSTANTS.VAR_TOKEN, rstp.token);
          this.contriSevices.datosGenerales().subscribe({
            next: (rpta:any) => {
              this.cargaService.hide();
              let usuarioDt: UsuarioData = new UsuarioData();
              usuarioDt = {
                tipoUsuario: APP_CONSTANTS.TIPO_USUARIO.CONTRIBUYENTE,
                login: "TAPIA",
                nombres: rpta.apellidos + ', ' + rpta.nombres,
                sexo: parseInt(rpta.sexo),
                direccion: rpta.direccion,
                codigoContribuyente: rpta.codigoContribuyente
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
          });
        }else{
          this.utilService.getAlert("Fallo login.","Usuario o clave no válido.","error","Entendido");
        }
      },
      error: () => {
        this.cargaService.hide();
      }
    });
  }
}
