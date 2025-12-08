import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

interface Message {
  ip: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class WsServiceService {

  // URL de tu servidor WebSocket (ej: el servicio Node.js local)
  private readonly WS_URL = environment.URL_WEBSOCKET_DEVICE_INFO;

  // WebSocketSubject maneja la conexión y actúa como un Observable/Observer
  private socket$!: WebSocketSubject<Message>;

  constructor() {

  }

  /**
   * Establece la conexión con el servidor WebSocket
   */
  private connect(): void {
    console.log("URL WS:", this.WS_URL);
    // webSocket() crea un Observable de la conexión.
    this.socket$ = webSocket<Message>({
      url: this.WS_URL,
      // Opcional: Manejo de cierre de conexión o errores
      openObserver: {
        next: () => console.log('WebSocket: Conexión establecida.'),
      },
      closeObserver: {
        next: (closeEvent) => {
          console.log('WebSocket: Conexión cerrada. Intentando reconectar...', closeEvent);
          // Puedes implementar aquí la lógica de reconexión si es necesaria
          //setTimeout(() => this.connect(), 5000);
        }
      }
    });

    // Suscribirse inmediatamente para mantener la conexión abierta
    this.socket$.subscribe({
        error: (err) => console.error('WebSocket Error:', err)
        // No necesitas 'complete' aquí si quieres que la conexión se mantenga.
    });
  }

  /**
   * Obtiene el Observable de los mensajes entrantes
   */
  public getMessages(): Observable<Message> {
    this.connect();
    return this.socket$.asObservable();
  }

  /**
   * Envía un mensaje al servidor WebSocket
   * @param msg El mensaje a enviar
   */
  public sendMessage(msg: Message): void {
    this.socket$.next(msg);
  }

  /**
   * Cierra manualmente la conexión WebSocket
   */
  public close(): void {
    this.socket$.complete();
  }
}
