import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaPagoNiubiz } from './respuesta-pago-niubiz';

describe('RespuestaPagoNiubiz', () => {
  let component: RespuestaPagoNiubiz;
  let fixture: ComponentFixture<RespuestaPagoNiubiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespuestaPagoNiubiz]
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
