import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CargaService } from '../../../../services/carga.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { UtilService } from '../../../../services/util.services';
import { APP_ROUTES } from '../../../../shared/constants/app.routes';
import { APP_CONSTANTS } from '../../../../shared/constants/app.constants';
import { SesionData, UsuarioData } from '../../../../shared/helpers/sesionData';
import { AdminRequest } from '../../../../shared/helpers/login/admin-request';

@Component({
  selector: 'app-intranet-login-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './intranet-login-component.html',
  styleUrl: './intranet-login-component.scss',
  standalone: true,
})
export class IntranetLoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cargaService: CargaService,
    private usuarioService: UsuarioService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.cargaService.show();
    this.form = this.fb.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    });
    this.cargaService.hide();
  }

  validaUsuario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const credencial: AdminRequest = new AdminRequest();
    credencial.username = this.form.get('usuario')?.value;
    credencial.password = this.form.get('clave')?.value;

    this.cargaService.show();
    this.usuarioService.getLoginAdmin(credencial).subscribe({
      next: (rstp: any) => {
        if (rstp.token != undefined) {
          this.utilService.setLocalStorage(APP_CONSTANTS.VAR_TOKEN, rstp.token);
          this.cargaService.hide();
          const usuarioDt: UsuarioData = {
            tipoUsuario: APP_CONSTANTS.TIPO_USUARIO.ADMINISTRADOR,
            login: 'ADMIN',
            nombres: 'ADMIN',
            sexo: 0,
            direccion: 'MUNICIPALIDAD',
            codigoContribuyente: '00000000',
            idContribuyente: 0,
          };
          const infoUsuario: SesionData = { usuario: usuarioDt };
          this.utilService.setSesionStorage(APP_CONSTANTS.VAR_USUARIO, JSON.stringify(infoUsuario));
          this.utilService.setLocalStorage(APP_CONSTANTS.VAR_TOKEN, rstp.token);
          this.utilService.link(APP_ROUTES.URL_INICIO);
        } else {
          this.cargaService.hide();
          this.utilService.getAlert('Fallo login.', 'Usuario o clave no válido.', 'error', 'Entendido');
        }
      },
      error: () => {
        this.cargaService.hide();
      },
    });
  }
}
