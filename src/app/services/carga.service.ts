import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CargaService {
  // BehaviorSubject almacena el estado actual (false por defecto)
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Observable público para que los componentes se suscriban al estado
  public loading$ = this.loadingSubject.asObservable();

  constructor() { }

  /** Muestra el overlay de carga */
  show(): void {
    this.loadingSubject.next(true);
  }

  /** Oculta el overlay de carga */
  hide(): void {
    this.loadingSubject.next(false);
  }
}
