import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { LogsService } from '../../../services/logs.service';
import { LogAuditoriaResponse } from '../../../shared/helpers/log-auditoria-response';
import { LogAuditoriaFilterRequest } from '../../../shared/helpers/log-auditoria-filter-request';
import { UtilService } from '../../../services/util.services';
import { APP_CONSTANTS } from '../../../shared/constants/app.constants';
import { APP_ROUTES } from '../../../shared/constants/app.routes';

type FiltroLogsRawValue = {
  fechaDesde: string | null;
  fechaHasta: string | null;
  usuario: string | null;
};

type FiltroLogsFormControls = {
  fechaDesde: FormControl<string | null>;
  fechaHasta: FormControl<string | null>;
  usuario: FormControl<string | null>;
};

@Component({
  selector: 'app-logs-auditoria',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './logs-auditoria.component.html',
  styleUrl: './logs-auditoria.component.scss',
  standalone: true,
})
export class LogsAuditoriaComponent implements OnInit {
  readonly cargando = signal(false);
  readonly logs = signal<LogAuditoriaResponse[]>([]);

  readonly pagina = signal(1);
  readonly pageSize = signal(10);
  readonly opcionesPageSize: readonly number[] = [10, 20, 50];

  readonly totalRegistros = computed(() => this.logs().length);
  readonly totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.totalRegistros() / Math.max(1, this.pageSize())))
  );
  readonly paginaActual = computed(() => Math.min(this.pagina(), this.totalPaginas()));
  readonly logsPaginados = computed(() => {
    const size = Math.max(1, this.pageSize());
    const start = (this.paginaActual() - 1) * size;
    return this.logs().slice(start, start + size);
  });
  readonly rangoActual = computed(() => {
    const total = this.totalRegistros();
    if (total === 0) return { inicio: 0, fin: 0 };
    const size = Math.max(1, this.pageSize());
    const inicio = (this.paginaActual() - 1) * size + 1;
    const fin = Math.min(this.paginaActual() * size, total);
    return { inicio, fin };
  });
  readonly paginasVisibles = computed<number[]>(() => {
    const total = this.totalPaginas();
    const actual = this.paginaActual();
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const result: number[] = [];
    const maxBotones = 5;
    let start = Math.max(1, actual - Math.floor(maxBotones / 2));
    let end = start + maxBotones - 1;
    if (end > total) {
      end = total;
      start = Math.max(1, end - maxBotones + 1);
    }
    if (start > 1) {
      result.push(1);
      if (start > 2) result.push(-1);
    }
    for (let i = start; i <= end; i++) result.push(i);
    if (end < total) {
      if (end < total - 1) result.push(-1);
      result.push(total);
    }
    return result;
  });

  readonly formFiltros: FormGroup<FiltroLogsFormControls>;
  readonly maxFecha = new Date();
  readonly maxFechaInput: string;

  constructor(
    private fb: FormBuilder,
    private logsService: LogsService,
    private utilService: UtilService,
    private router: Router
  ) {
    const hoyString = this.formatearFechaInput(new Date());
    this.maxFechaInput = hoyString;
    this.formFiltros = this.fb.group<FiltroLogsFormControls>({
      fechaDesde: this.fb.control<string | null>(hoyString),
      fechaHasta: this.fb.control<string | null>(hoyString),
      usuario: this.fb.control<string | null>(''),
    });
  }

  ngOnInit(): void {
    // Las fechas ya quedan inicializadas con la fecha actual EN EL CONSTRUCTOR.
    // NO se llama a buscar() para no enviar petición inicial al backend.
  }

  /**
   * Deja el formulario en su estado inicial:
   *  - fechaDesde = HOY (yyyy-MM-dd)
   *  - fechaHasta = HOY (yyyy-MM-dd)
   *  - usuario = '' (vacio)
   * No toca la tabla ni envía petición.
   */
  private reiniciarFormulario(): void {
    const hoyString = this.formatearFechaInput(new Date());
    this.formFiltros.setValue({
      fechaDesde: hoyString,
      fechaHasta: hoyString,
      usuario: '',
    });
  }

  /** Convierte Date → yyyy-MM-dd (lo que espera <input type="date">). */
  private formatearFechaInput(fecha: Date): string {
    const d = new Date(fecha);
    const anio = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  buscar(): void {
    console.log('form:', this.formFiltros.getRawValue())
    // ⚠️ IMPORTANTE: este método NO modifica los valores de los inputs del formulario.
    // Solo LEE fechaDesde, fechaHasta y usuario para armar la petición.
    // Los valores de fechaDesde y fechaHasta solo se setean en ngOnInit() (fecha actual)
    // y al presionar el botón LIMPIAR (reiniciarFormulario).
    const raw = this.formFiltros.getRawValue();
    if (!raw.fechaDesde || !raw.fechaHasta) {
      this.utilService.getAlert(
        'Filtros requeridos',
        'Los campos "Fecha Desde" y "Fecha Hasta" son obligatorios para realizar la búsqueda.',
        'info',
        'Corregir'
      );
      return;
    }

    const filtro = this.buildFiltro();
    if (!filtro) return;
    this.cargando.set(true);
    this.logsService
      .listarLogsAuditoria(filtro)
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: (data) => {
          this.logs.set(this.normalizarLista(data));
          this.irAPagina(1);
        },
        error: () => {
          this.logs.set([]);
          this.utilService.getAlert(
            'Error',
            'No se pudo cargar los logs de auditoría.',
            'error',
            'Entendido'
          );
        },
      });
  }

  /**
   * Limpia TODOS los filtros:
   *  - Formulario → fecha hoy + usuario vacío
   *  - Tabla → vacía
   *  - Paginación → página 1
   * NO envía petición al backend.
   */
  limpiarFiltros(): void {
    this.reiniciarFormulario();
    this.logs.set([]);
    this.pagina.set(1);
  }

  volver(): void {
    this.router.navigate([APP_ROUTES.URL_INICIO]);
  }

  private buildFiltro(): LogAuditoriaFilterRequest | null {
    const raw: FiltroLogsRawValue = this.formFiltros.getRawValue();
    // Precondición: raw.fechaDesde y raw.fechaHasta NO son null (validado antes en buscar())
    const desde = raw.fechaDesde!;
    const hasta = raw.fechaHasta!;

    if (desde > hasta) {
      this.utilService.getAlert(
        'Validación',
        'La fecha "Desde" no puede ser mayor a la fecha "Hasta".',
        'info',
        'Corregir'
      );
      return null;
    }

    const fechaDesdeDate = new Date(desde + 'T00:00:00');
    const fechaHastaDate = new Date(hasta + 'T00:00:00');

    return {
      fechaDesde: this.formatearFechaBack(fechaDesdeDate, true),
      fechaHasta: this.formatearFechaBack(fechaHastaDate, false),
      usuario: raw.usuario && raw.usuario.trim().length > 0 ? raw.usuario.trim() : null,
    };
  }

  private formatearFechaBack(fecha: Date, esInicio: boolean): string {
    const d = new Date(fecha);
    const anio = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    const hora = esInicio ? '00:00:00' : '23:59:59';
    return `${anio}-${mes}-${dia}T${hora}`;
  }

  private normalizarLista(raw: unknown): LogAuditoriaResponse[] {
    if (Array.isArray(raw)) return raw as LogAuditoriaResponse[];
    if (!raw || typeof raw !== 'object') return [];
    const obj = raw as Record<string, unknown>;
    const keys = ['content', 'data', 'lista', 'logs', 'records', 'items', 'respuesta'];
    for (const key of keys) {
      const candidato = obj[key];
      if (Array.isArray(candidato)) return candidato as LogAuditoriaResponse[];
    }
    const registro = raw as Partial<LogAuditoriaResponse>;
    if (registro.fecha && registro.tipoOperacion) return [registro as LogAuditoriaResponse];
    return [];
  }

  cambiarPageSize(nuevoSize: number): void {
    const size = Math.max(1, nuevoSize);
    if (!this.opcionesPageSize.includes(size)) return;
    this.pageSize.set(size);
    this.irAPagina(1);
  }

  irAPagina(nro: number): void {
    const destino = Math.max(1, Math.min(nro, this.totalPaginas()));
    this.pagina.set(destino);
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '-';
    try {
      const d = new Date(fecha);
      if (isNaN(d.getTime())) return String(fecha);
      return this.utilService.formatoFecha(d, 'fechaHora');
    } catch {
      return String(fecha);
    }
  }

  badgeClass(tipo: string): string {
    if (!tipo) return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
    const t = String(tipo).toUpperCase();
    if (t.includes('CREATE') || t.includes('INSERT') || t.includes('REGISTR')) {
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    }
    if (t.includes('UPDATE') || t.includes('MODIFIC') || t.includes('EDIT')) {
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    }
    if (t.includes('DELETE') || t.includes('ELIMIN')) {
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
    }
    if (t.includes('LOGIN') || t.includes('INGRESO') || t.includes('AUTENTIC')) {
      return 'bg-primary/15 text-primary dark:text-primary';
    }
    if (t.includes('LOGOUT') || t.includes('CIERRE')) {
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
    }
    if (t.includes('ERROR') || t.includes('FALLO')) {
      return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
    }
    return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
  }

  protected readonly APP_CONSTANTS = APP_CONSTANTS;
}
