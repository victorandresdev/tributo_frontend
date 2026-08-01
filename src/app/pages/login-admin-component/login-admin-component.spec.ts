import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginAdminComponent } from './login-admin-component';
import { CargaService } from '../../services/carga.service';
import { UsuarioService } from '../../services/usuario.service';
import { UtilService } from '../../services/util.services';
import { ContribuyenteService } from '../../services/contribuyente.service';
import { WsServiceService } from '../../services/ws-service.service';
import { LayoutService } from '../../services/layout.service';

describe('LoginAdminComponent', () => {
  let component: LoginAdminComponent;
  let fixture: ComponentFixture<LoginAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAdminComponent, ReactiveFormsModule, FormsModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        CargaService,
        UsuarioService,
        UtilService,
        ContribuyenteService,
        WsServiceService,
        LayoutService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente (inyección de dependencias)', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar el título de ingreso de personal autorizado y el botón de validación', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('INGRESO - PERSONAL AUTORIZADO');

    const button = compiled.querySelector('button.btnLogin');
    expect(button).toBeTruthy();
    expect(button?.textContent).toContain('Validar Ingreso');
  });

  it('debe inicializar el formulario reactivo con los campos usuario y clave', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('usuario')).toBeTruthy();
    expect(component.form.get('clave')).toBeTruthy();

    const compiled = fixture.nativeElement as HTMLElement;
    const userInput = compiled.querySelector('input[formControlName="usuario"]');
    const claveInput = compiled.querySelector('input[formControlName="clave"]');
    expect(userInput).toBeTruthy();
    expect(claveInput).toBeTruthy();
  });
});
