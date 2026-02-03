import { Component, Input } from '@angular/core';
import { ListaResumenRegistro } from '../../helpers/lista-resumen-registro';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-resumen-registro',
  imports: [MatIconModule, MatCheckboxModule, MatButtonModule, CommonModule],
  templateUrl: './resumen-registro.html',
  styleUrl: './resumen-registro.scss'
})
export class ResumenRegistro {
  selection = new SelectionModel<any>(true, []);
  @Input() datosItem!: ListaResumenRegistro;

  toggleRow(row: any) {
    this.selection.toggle(row);
    //this.seleccionados.emit(this.selection.selected);
  }
}
