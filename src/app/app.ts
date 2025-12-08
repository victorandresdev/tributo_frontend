import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CargaOverlay } from './shared/components/carga-overlay/carga-overlay';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CargaOverlay],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tributo_frontend');
}
