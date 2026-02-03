import { ItemResumenRegistro } from "./item-resumen-registro";

export class ListaResumenRegistro{
  visibles?:Array<ItemResumenRegistro>;
  ocultos?:Array<ItemResumenRegistro>;
  constructor(){
    this.visibles = [];
    this.ocultos = [];
  }
}
