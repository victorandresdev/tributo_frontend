import {AfterViewInit, Component, Inject, OnInit, Renderer2} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SessionResponse} from '../../helpers/niubiz/sessionResponse';

@Component({
  selector: 'app-pago-niubiz',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './pago-niubiz.html',
  styleUrl: './pago-niubiz.scss'
})
export class PagoNiubiz implements OnInit, AfterViewInit{
  sessionResponse?:SessionResponse;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
        this.sessionResponse = this.data.sessionResponse;
  }

  ngAfterViewInit(): void {
    console.log('Initializing Niubiz payment component');
    if (this.sessionResponse) {
      console.log('Loading Niubiz script with session token:', this.sessionResponse?.sessionKey);
      this.loadNiubizScript();
    }
  }

  private loadNiubizScript(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://static-content-qas.vnforapps.com/env/sandbox/js/checkout.js';
    script.setAttribute('data-sessiontoken', this.sessionResponse?.sessionKey || '');
    script.setAttribute('data-channel', 'web');
    script.setAttribute('data-merchantid', this.sessionResponse?.merchantId || '');
    script.setAttribute('data-purchasenumber', this.sessionResponse?.purchaseNumber || '');
    script.setAttribute('data-amount', this.sessionResponse?.amount?.toString() || '');
    script.setAttribute('data-expirationminutes', '20');
    script.setAttribute('data-timeouturl', 'about:blank');
    script.setAttribute('data-formbuttoncolor', '#000000');

    const form = document.querySelector('form[action="paginaRespuesta"]');
    console.log('Loading Niubiz script with amount:', this.sessionResponse?.amount);
    if (form) {
      console.log('Loading Niubiz script with session token:', this.sessionResponse?.sessionKey);
      this.renderer.appendChild(form, script);
    }
  }

}
