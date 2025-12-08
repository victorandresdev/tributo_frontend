import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-info',
  imports: [],
  templateUrl: './input-info.html',
  styleUrl: './input-info.scss'
})
export class InputInfo {
  @Input() etiqueta!:string;
  @Input() valor!:string;

}
