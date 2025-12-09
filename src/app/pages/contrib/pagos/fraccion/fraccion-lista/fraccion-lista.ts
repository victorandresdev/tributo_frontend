import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Paginator } from '../../../../../shared/components/paginator/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { APP_CONSTANTS } from '../../../../../shared/constants/app.constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fraccion-lista',
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, Paginator, MatCheckboxModule, MatButtonModule],
  templateUrl: './fraccion-lista.html',
  styleUrl: './fraccion-lista.scss'
})
export class FraccionLista implements OnInit, OnChanges{

  dataResult!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  length = 0;
  indexIni = 0;
  message!: string;
  displayedColumns: string[] = [
    'select',
    'convenio',
    'anio',
    'cuota',
    'monto',
    'interes',
    'mora',
    'vence',
    'total'
  ];
  infoGrilla:any[] = [];
  arrListFiltrada:any[] = [];
  existData:boolean = false;

  @Input() arrList!: any[];
  @Input() totalFilas!: number;
  @Input() paginas!: number;
  @Output() cambiaPagina: EventEmitter<number> = new EventEmitter();
  @Output() seleccionCambio: EventEmitter<boolean> = new EventEmitter();

  constructor(){

  }

  ngOnInit(): void {
    this.length = 0;
    this.message = 'Cargando...';
    this.getLista();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['arrList']){
      this.getLista();
    }
  }

  getLista(){
    this.message = 'Cargando...';
    let startIndex:number = this.indexIni * APP_CONSTANTS.PAGE_SIZE;
    let endIndex:number = startIndex + APP_CONSTANTS.PAGE_SIZE;
    this.arrListFiltrada = [...this.arrList];
    let rds:number = this.arrListFiltrada.length % APP_CONSTANTS.PAGE_SIZE;
    this.paginas = Math.trunc(this.arrListFiltrada.length / APP_CONSTANTS.PAGE_SIZE) + ((rds > 0)?1:0);
    this.infoGrilla = this.arrListFiltrada.slice(startIndex, endIndex);
    this.dataResult = new MatTableDataSource<any>(this.infoGrilla);
    this.length = this.infoGrilla.length;
    if (this.length <= 0) {
      this.existData = false;
      this.message = 'No se encontraron registros.';
    }else{
      this.existData = true;
    }
  }

  pagina(event?:any){
    //this.cambiaPagina.emit(event.pageIndex);
    this.indexIni = event.pageIndex;
    //this.pageIndex = this.indexIni;
    this.getLista();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataResult.data.length;
    return numSelected === numRows;
  }

  toggleRow(row: any) {
    this.selection.toggle(row);
    this.seleccionCambio.emit(this.selection.hasValue());
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataResult.data);
    }
    this.seleccionCambio.emit(this.selection.hasValue());
  }
}
