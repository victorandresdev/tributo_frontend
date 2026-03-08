import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ListaResumenRegistro } from '../../helpers/lista-resumen-registro';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { DtImpuesto } from '../../helpers/dtImpuestos';

@Component({
  selector: 'app-resumen-registro',
  imports: [MatIconModule, MatCheckboxModule, MatButtonModule, CommonModule],
  templateUrl: './resumen-registro.html',
  styleUrl: './resumen-registro.scss'
})
export class ResumenRegistro implements OnChanges {
  @Input() datosItem!: ListaResumenRegistro;
  @Input() infoItem!: DtImpuesto;
  @Output() marcados: EventEmitter<DtImpuesto> = new EventEmitter();

  toggleRow(row: any) {
    console.log("Marcado: ",row);
    //this.selection.toggle(row);
    this.marcados.emit(row);
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*if(changes['macadoIn']){
      this.selection = this.marcadoIn;
    }*/
  }

}
