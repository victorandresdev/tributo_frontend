import { APP_CONSTANTS } from './../../constants/app.constants';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
  standalone: true,
})
export class FooterComponent {
  APP_CONSTANTS = APP_CONSTANTS;
}
