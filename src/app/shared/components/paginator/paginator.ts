import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  imports: [MatIconModule, DecimalPipe, MatButtonModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss'
})
export class Paginator implements OnInit, OnChanges {

  indexIni:number = 0;
  indexEnd:number = 0;
  index:number = 0;
  vPaginas:boolean = false;

  @Input() verPagina!: boolean;
  @Input() pageIndex!: number;
  @Input() totalPaginas!: number;
  @Output() paginar: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  ngOnInit(): void {
    this.verPagina = false;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pageIndex'] || changes['totalPaginas']){
      this.indexEnd = (this.totalPaginas > 0)?(this.totalPaginas - 1):0;
      this.indexIni = 0;
    }
    if(changes['verPagina']){
      this.vPaginas = this.verPagina;
    }
  }

  goPrev(){
    this.pageIndex -= 1;
    this.goPage();
  }

  goNext(){
    this.pageIndex += 1;
    if(this.pageIndex >= this.indexEnd){
      this.pageIndex = this.indexEnd
    }
    this.goPage();
  }

  goFirst(){
    this.pageIndex = this.indexIni;
    this.goPage();
  }

  goLast(){
    this.pageIndex = this.indexEnd;
    this.goPage();
  }

  goPage(){
    let page:any = {
      pageIndex: this.pageIndex
    };
    this.paginar.emit(page);
  }
}
