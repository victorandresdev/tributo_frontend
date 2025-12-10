import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { APP_CONSTANTS } from '../../../../../shared/constants/app.constants';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Paginator } from "../../../../../shared/components/paginator/paginator";

@Component({
  selector: 'app-liquidacion-lista',
  imports: [MatCardModule, MatCheckboxModule, Paginator],
  templateUrl: './liquidacion-lista.html',
  styleUrl: './liquidacion-lista.scss'
})
export class LiquidacionLista {
  selection = new SelectionModel<any>(true, []);
  length = 0;
  indexIni = 0;
  message!: string;
  existData:boolean = false;
  infoGrilla:any[] = [];
  arrListFiltrada:any[] = [];
  @Input() arrList!:any[];
  @Input() totalFilas!: number;
  @Input() paginas!: number;
  @Output() cambiaPagina: EventEmitter<number> = new EventEmitter();
  @Output() seleccionCambio: EventEmitter<boolean> = new EventEmitter();
  @Output() seleccionados: EventEmitter<any> = new EventEmitter();

  grupoImpreso!:string;

  ngOnInit(): void {
    this.getLista();
    this.grupoImpreso = "";
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['arrList']){
      this.grupoImpreso = "";
      this.getLista();
    }
  }

  pagina(event?:any){
    this.grupoImpreso = "";
    this.indexIni = event.pageIndex;
    this.getLista();
  }

  controlImpresion(grupoMuestra:string){
    let rpta:boolean = false;
    if(this.grupoImpreso != grupoMuestra){
      this.grupoImpreso = grupoMuestra
      rpta = true;
    }
    return rpta;
  }

  getLista(){
    this.message = 'Cargando...';
    let startIndex:number = this.indexIni * APP_CONSTANTS.PAGE_SIZE;
    let endIndex:number = startIndex + APP_CONSTANTS.PAGE_SIZE;
    this.arrListFiltrada = [...this.arrList];
    let rds:number = this.arrListFiltrada.length % APP_CONSTANTS.PAGE_SIZE;
    this.paginas = Math.trunc(this.arrListFiltrada.length / APP_CONSTANTS.PAGE_SIZE) + ((rds > 0)?1:0);
    this.infoGrilla = this.arrListFiltrada.slice(startIndex, endIndex);
    this.length = this.infoGrilla.length;
    if (this.length <= 0) {
      this.existData = false;
      this.message = 'No se encontraron registros.';
    }else{
      this.existData = true;
    }
  }

  toggleRow(row: any) {
    this.selection.toggle(row);
    this.seleccionados.emit(this.selection.selected);
  }
}
