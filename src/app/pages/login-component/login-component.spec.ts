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

  it('debe mostrar únicamente el acceso por código de contribuyente', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tabButtons = compiled.querySelectorAll<HTMLButtonElement>('div.flex.border-b button');

    expect(tabButtons.length).toBe(1);
    expect(tabButtons[0].textContent).toContain('Código Contribuyente');
    const inputCod = compiled.querySelector('input[formControlName="cod"]');
    expect(inputCod).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="nro"]')).toBeFalsy();
  });
});
