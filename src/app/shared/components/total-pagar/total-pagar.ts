import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-total-pagar',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './total-pagar.html',
  styleUrl: './total-pagar.scss'
})
export class TotalPagar {
  @Input() montoTotal!:number;

  pagar(){

  }
}
