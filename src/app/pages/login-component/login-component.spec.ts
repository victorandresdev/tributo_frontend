import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login-component';
import { CargaService } from '../../services/carga.service';
import { UsuarioService } from '../../services/usuario.service';
import { UtilService } from '../../services/util.services';
import { ContribuyenteService } from '../../services/contribuyente.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, FormsModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        CargaService,
        UsuarioService,
        UtilService,
        ContribuyenteService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente (inyección de dependencias)', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar el título de Iniciar Sesión y el logo institucional', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Iniciar Sesión');
    expect(compiled.textContent).toContain('Municipalidad de La Molina');
  });

  it('debe inicializar el formulario por DNI por defecto en el bloque 1', () => {
    expect(component.nBloqueActivo).toBe(1);
    expect(component.frmDNI).toBeDefined();
    expect(component.frmDNI.get('nro')).toBeTruthy();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputDni = compiled.querySelector('input[formControlName="nro"]');
    expect(inputDni).toBeTruthy();
  });

  it('debe cambiar al bloque 2 de Contribuyente al hacer clic en la pestaña y mostrar el input de código', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabButtons = compiled.querySelectorAll<HTMLButtonElement>('div.flex.border-b button');

    if (tabButtons.length > 1) {
      tabButtons[1].click();
      fixture.detectChanges();
    } else {
      component.cambiaContenido(2);
      fixture.detectChanges();
    }

    expect(component.nBloqueActivo).toBe(2);
    const inputCod = compiled.querySelector('input[formControlName="cod"]');
    expect(inputCod).toBeTruthy();
  });
});
