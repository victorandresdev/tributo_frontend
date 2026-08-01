import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from './usuario.service';
import { UtilService } from './util.services';
import { APP_ROUTES } from '../shared/constants/app.routes';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    utilServiceSpy = jasmine.createSpyObj('UtilService', ['removeAllStorage', 'link']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        UsuarioService,
        { provide: UtilService, useValue: utilServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente (inyección de dependencias)', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener datos de usuario mock por login (getDatosUsuario)', () => {
    const usuario = service.getDatosUsuario('DEMO');
    expect(usuario).toBeDefined();
    expect(usuario?.nombre).toBe('DEMO CORP');
  });

  it('debe ejecutar logout limpiando el storage y cerrando modales', () => {
    service.logout();
    expect(utilServiceSpy.removeAllStorage).toHaveBeenCalled();
    expect(dialogSpy.closeAll).toHaveBeenCalled();
    expect(utilServiceSpy.link).toHaveBeenCalledWith(APP_ROUTES.URL_HOME);
  });
});
