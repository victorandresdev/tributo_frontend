import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RespuestaPagoNiubiz } from './respuesta-pago-niubiz';

describe('RespuestaPagoNiubiz', () => {
  let component: RespuestaPagoNiubiz;
  let fixture: ComponentFixture<RespuestaPagoNiubiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespuestaPagoNiubiz],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideRouter([]),
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: { params: { isSuccess: 'true', message: 'Éxito', operacion: '123' } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespuestaPagoNiubiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
