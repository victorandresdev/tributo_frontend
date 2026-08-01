import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { SeguridadService } from './segudidad.service';
import { UtilService } from './util.services';
import { APP_CONSTANTS } from '../shared/constants/app.constants';

describe('SeguridadService', () => {
  let service: SeguridadService;
  let httpMock: HttpTestingController;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let jwtHelperSpy: jasmine.SpyObj<JwtHelperService>;

  beforeEach(() => {
    utilServiceSpy = jasmine.createSpyObj('UtilService', [
      'getLocalStorage',
      'removeLocalStorage',
      'link'
    ]);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll']);
    jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        SeguridadService,
        { provide: UtilService, useValue: utilServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: JwtHelperService, useValue: jwtHelperSpy },
        { provide: JWT_OPTIONS, useValue: {} }
      ]
    });

    service = TestBed.inject(SeguridadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (service.refresh) {
      service.refresh.unsubscribe();
    }
    httpMock.verify();
  });

  it('debe crearse correctamente (inyección de dependencias)', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener el token desde UtilService.getLocalStorage', () => {
    utilServiceSpy.getLocalStorage.and.returnValue('token_prueba_123');
    const token = service.getToken();
    expect(token).toBe('token_prueba_123');
    expect(utilServiceSpy.getLocalStorage).toHaveBeenCalledWith(APP_CONSTANTS.VAR_TOKEN);
  });

  it('debe verificar si el usuario está autenticado', () => {
    utilServiceSpy.getLocalStorage.and.returnValue('token_valido');
    (jwtHelperSpy.isTokenExpired as jasmine.Spy).and.returnValue(false);

    expect(service.isAuthenticated()).toBeTrue();
    expect(jwtHelperSpy.isTokenExpired).toHaveBeenCalledWith('token_valido' as any);
  });

  it('debe limpiar el localStorage al terminar sesión (terminaLocalStorage)', () => {
    service.terminaLocalStorage();
    expect(utilServiceSpy.removeLocalStorage).toHaveBeenCalledWith(APP_CONSTANTS.VAR_TOKEN);
    expect(utilServiceSpy.removeLocalStorage).toHaveBeenCalledWith(APP_CONSTANTS.VAR_USUARIO);
  });
});
