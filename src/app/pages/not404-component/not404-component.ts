import { Component } from '@angular/core';
import { HeadComponent } from '../../shared/components/head-component/head-component';
import { FooterComponent } from '../../shared/components/footer-component/footer-component';

@Component({
  selector: 'app-not404-component',
  imports: [HeadComponent, FooterComponent],
  templateUrl: './not404-component.html',
  styleUrl: './not404-component.scss'
})
export class Not404Component {

}
