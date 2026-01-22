import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoNiubiz } from './pago-niubiz';

describe('PagoNiubiz', () => {
  let component: PagoNiubiz;
  let fixture: ComponentFixture<PagoNiubiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoNiubiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoNiubiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
