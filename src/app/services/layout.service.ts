import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Servicio disponible globalmente
})
export class LayoutService {
  myIndicador = signal<number>(1);
  myPanel = signal<number>(1);
  myLocal = signal<any>({});
}
