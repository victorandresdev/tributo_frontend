import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-page',
  imports: [],
  templateUrl: './title-page.html',
  styleUrl: './title-page.scss'
})
export class TitlePage {
  @Input() titulo:string = "";

}
