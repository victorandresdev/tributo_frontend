import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { APP_CONSTANTS } from '../../../../shared/constants/app.constants';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Paginator } from '../../../../shared/components/paginator/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalSede } from '../modal-sede/modal-sede';
import { ModalTerminal } from '../modal-terminal/modal-terminal';

@Component({
  selector: 'app-sedes-lista',
  imports: [MatCardModule, MatTableModule, MatIconModule, Paginator, MatCheckboxModule, MatButtonModule, CommonModule, MatTooltipModule],
  templateUrl: './sedes-lista.html',
  styleUrl: './sedes-lista.scss'
})
export class SedesLista implements OnInit, OnChanges {
  dataResult!: MatTableDataSource<any>;
  length = 0;
  indexIni = 0;
  message!: string;
  displayedColumns: string[] = [
    'local',
    'direccion',
    'estado',
    'estaciones',
    'accion',
  ];
  infoGrilla:any[] = [];
  arrListFiltrada:any[] = [];
  existData:boolean = false;

  @Input() arrList!: any[];
  @Input() totalFilas!: number;
  @Input() paginas!: number;
  @Output() cambiaPagina: EventEmitter<number> = new EventEmitter();
  @Output() seleccionCambio: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
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

  verDetalle(fila:any = null){
    let ventana:any = this.dialog.open(ModalSede, {
      width: '400px',
      height: 'auto',
      data:fila
    });
    ventana.afterClosed().subscribe({
      next: (rpta:any) => {

      },
      error: () => {

      }
    });
  }

  verLan(fila:any){
    let ventana:any = this.dialog.open(ModalTerminal, {
      width: '550px',
      height: 'auto',
      data:fila
    });
  }
}
