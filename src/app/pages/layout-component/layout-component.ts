import { ChangeDetectorRef, } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FooterComponent } from '../../shared/components/footer-component/footer-component';
import { HeadComponent } from '../../shared/components/head-component/head-component';

@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet, FooterComponent, HeadComponent],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.scss'
})
export class LayoutComponent {

  constructor(
    //private usuarioService: UsuarioService,
    private observer: BreakpointObserver,
    private cd: ChangeDetectorRef,
  ){

  }
  /*salir(){
    this.usuarioService.logout();
  }*/
}
