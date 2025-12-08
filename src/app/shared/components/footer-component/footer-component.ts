import { LayoutService } from './../../../services/layout.service';
import { UtilService } from './../../../services/util.services';
import { MatIconModule } from '@angular/material/icon';
import { APP_CONSTANTS } from './../../constants/app.constants';
import { Component, OnInit } from '@angular/core';
import { WsServiceService } from '../../../services/ws-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer-component',
  imports: [
    MatIconModule
  ],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
  standalone: true,
})
export class FooterComponent implements OnInit {
  APP_CONSTANTS = APP_CONSTANTS;
  local!:any;
  terminalIp: string = 'Conectando...';
  private messageSubscription!: Subscription;

  constructor(
    private utilService: UtilService,
    private wsService: WsServiceService,
    public layoutService: LayoutService
  ){

  }

  ngOnInit(): void {
    this.local = {tipo:1, nombre:"Internet"};
    this.layoutService.myLocal.set(this.local);
    let info:any = this.utilService.getLocalStorage(APP_CONSTANTS.VAR_LOCAL);
    if(info != undefined){
      this.local = info;
    }
    this.capturaIP();
  }

  capturaIP(){
    // 1. Suscribirse para recibir mensajes del servidor
    this.messageSubscription = this.wsService.getMessages()
      .subscribe({
        next: (message) => {
          this.local = {
            tipo: 2,
            nombre: "Wong - La Molina"
          }
          this.layoutService.myLocal.set(this.local);
          console.log('Mensaje recibido:', message);
          // 2. Extraer la IP compartida por el servidor
          if (message && message.ip) {
            this.terminalIp = message.ip;
          }
        },
        error: (err) => {
          this.local = {
            tipo: 1,
            nombre: "Internet"
          }
          this.layoutService.myLocal.set(this.local);
          console.error('Error al recibir mensaje:', err)
        },
        complete: () => console.log('Flujo de mensajes completado.')
      },);
  }

  enviarMensaje(): void {
    this.wsService.sendMessage({
      ip: 'cliente-angular',
      data: 'Hola desde Angular'
    });
  }

  ngOnDestroy(): void {
    // Es crucial desuscribirse y cerrar la conexión al destruir el componente
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    // Opcional: cerrar la conexión globalmente si ya no se usa en ninguna parte
    // this.wsService.close();
  }
}
