import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-respuesta-niubiz',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './respuesta-niubiz.html',
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
    }
    mat-card {
      max-width: 500px;
      width: 100%;
      text-align: center;
      padding: 20px;
    }
    .success-icon {
      font-size: 64px;
      height: 64px;
      width: 64px;
      color: green;
      margin-bottom: 20px;
    }
    .error-icon {
      font-size: 64px;
      height: 64px;
      width: 64px;
      color: red;
      margin-bottom: 20px;
    }
  `]
})
export class RespuestaNiubiz implements OnInit {
  isSuccess: boolean | null = null;
  message: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('Parámetros de respuesta Niubiz:', params);
      this.isSuccess = params['isSuccess'] === 'true' || params['isSuccess'] === true;
      this.message = params['message'] || null;
    });
  }

  volver() {
    this.router.navigate(['/pages/pagos/pendientes/ip1']);
  }
}
