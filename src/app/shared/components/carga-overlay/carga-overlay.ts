import { CargaService } from './../../../services/carga.service';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-carga-overlay',
  imports: [AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './carga-overlay.html',
  styleUrl: './carga-overlay.scss'
})
export class CargaOverlay implements OnInit {
  loading$!:any;
  constructor(
    private cargaService: CargaService
  ){

  }

  ngOnInit(): void {
    this.loading$ = this.cargaService.loading$;

  }
}
