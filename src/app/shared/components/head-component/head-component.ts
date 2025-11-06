import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material/material-module';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-head-component',
  imports: [MaterialModule],
  templateUrl: './head-component.html',
  styleUrl: './head-component.scss',
  standalone: true,
})
export class HeadComponent {
  constructor(
    private usuarioService: UsuarioService,
  ){

  }
  salir(){
    this.usuarioService.logout();
  }
}
