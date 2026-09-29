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
import { ReportesService } from '../../../services/reportes.service';
import { ReportePagoOnlineUserResponse } from '../../../shared/helpers/reporte-pago-online-user-response';
import { ReportePagoOnlineUserFilterRequest } from '../../../shared/helpers/reporte-pago-online-user-filter-request';
import { UtilService } from '../../../services/util.services';
import { APP_CONSTANTS } from '../../../shared/constants/app.constants';
import { APP_ROUTES } from '../../../shared/constants/app.routes';

type FiltroReporteRawValue = {
  fechaDesde: string | null;
  fechaHasta: string | null;
};

type FiltroReporteFormControls = {
  fechaDesde: FormControl<string | null>;
  fechaHasta: FormControl<string | null>;
};

@Component({
  selector: 'app-reporte',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
  standalone: true,
})
export class ReporteComponent implements OnInit {
  readonly cargando = signal(false);
  readonly descargandoExcel = signal(false);
  readonly reportes = signal<ReportePagoOnlineUserResponse[]>([]);

  readonly pagina = signal(1);
  readonly pageSize = signal(10);
  readonly opcionesPageSize: readonly number[] = [10, 20, 50];

  readonly totalRegistros = computed(() => this.reportes().length);
  readonly totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.totalRegistros() / Math.max(1, this.pageSize())))
  );
  readonly paginaActual = computed(() => Math.min(this.pagina(), this.totalPaginas()));
  readonly reportesPaginados = computed(() => {
    const size = Math.max(1, this.pageSize());
    const start = (this.paginaActual() - 1) * size;
    return this.reportes().slice(start, start + size);
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

  readonly formFiltros: FormGroup<FiltroReporteFormControls>;
  readonly maxFecha = new Date();
  readonly maxFechaInput: string;

  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private utilService: UtilService,
    private router: Router
  ) {
    const hoyString = this.formatearFechaInput(new Date());
    this.maxFechaInput = hoyString;
    this.formFiltros = this.fb.group<FiltroReporteFormControls>({
      fechaDesde: this.fb.control<string | null>(hoyString),
      fechaHasta: this.fb.control<string | null>(hoyString),
    });
  }

  ngOnInit(): void {}

  private reiniciarFormulario(): void {
    const hoyString = this.formatearFechaInput(new Date());
    this.formFiltros.setValue({
      fechaDesde: hoyString,
      fechaHasta: hoyString,
    });
  }

  private formatearFechaInput(fecha: Date): string {
    const d = new Date(fecha);
    const anio = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  buscar(): void {
    console.log('form reporte pagos online users:', this.formFiltros.getRawValue())
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
    this.reportesService
      .listarPagosOnlineUsers(filtro)
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: (data) => {
          console.log('[Reporte] Response raw backend:', data);
          const normalizada = this.normalizarLista(data);
          console.log('[Reporte] Lista normalizada:', normalizada);
          if (normalizada.length > 0) {
            console.log('[Reporte] Muestra[0] monto raw:', normalizada[0]['monto'], 'tipo:', typeof normalizada[0]['monto']);
          }
          this.reportes.set(normalizada);
          this.irAPagina(1);
        },
        error: () => {
          this.reportes.set([]);
          this.utilService.getAlert(
            'Error',
            'No se pudo cargar el reporte de pagos online.',
            'error',
            'Entendido'
          );
        },
      });
  }

  limpiarFiltros(): void {
    this.reiniciarFormulario();
    this.reportes.set([]);
    this.pagina.set(1);
  }

  exportarExcel(): void {
    const raw = this.formFiltros.getRawValue();
    if (!raw.fechaDesde || !raw.fechaHasta) {
      this.utilService.getAlert(
        'Filtros requeridos',
        'Los campos "Fecha Desde" y "Fecha Hasta" son obligatorios para exportar el Excel.',
        'info',
        'Corregir'
      );
      return;
    }

    const filtro = this.buildFiltro();
    if (!filtro) return;

    this.descargandoExcel.set(true);
    this.reportesService
      .exportarPagosOnlineUsersExcel(filtro)
      .pipe(finalize(() => this.descargandoExcel.set(false)))
      .subscribe({
        next: (resp) => {
          if (!resp.body) {
            this.utilService.getAlert(
              'Error',
              'El servicio de exportación no devolvió datos.',
              'error',
              'Entendido'
            );
            return;
          }
          const contentDisposition = resp.headers.get('Content-Disposition');
          let filename = `Reporte_PagosOnline_${this.formatearFechaInput(new Date())}.xlsx`;
          if (contentDisposition) {
            const matchesFilename =
              /filename\*=UTF-8''([^;]+)/i.exec(contentDisposition) ||
              /filename="?([^";]+)"?/i.exec(contentDisposition);
            if (matchesFilename && matchesFilename[1]) {
              try {
                filename = decodeURIComponent(matchesFilename[1].trim());
              } catch {
                filename = matchesFilename[1].trim();
              }
            }
          }

          const contentType =
            resp.headers.get('Content-Type') ||
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

          try {
            const blob = new Blob([resp.body], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = filename;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            setTimeout(() => window.URL.revokeObjectURL(url), 1500);
          } catch {
            this.utilService.getAlert(
              'Error',
              'No se pudo generar la descarga del Excel.',
              'error',
              'Entendido'
            );
          }
        },
        error: () => {
          this.utilService.getAlert(
            'Error',
            'No se pudo exportar el Excel. Revisa los filtros o intenta nuevamente.',
            'error',
            'Entendido'
          );
        },
      });
  }

  volver(): void {
    this.router.navigate([APP_ROUTES.URL_INICIO]);
  }

  private buildFiltro(): ReportePagoOnlineUserFilterRequest | null {
    const raw: FiltroReporteRawValue = this.formFiltros.getRawValue();
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

  private normalizarLista(raw: unknown): ReportePagoOnlineUserResponse[] {
    if (Array.isArray(raw)) return raw as ReportePagoOnlineUserResponse[];
    if (!raw || typeof raw !== 'object') return [];
    const obj = raw as Record<string, unknown>;
    const keys = ['content', 'data', 'lista', 'reportes', 'records', 'items', 'respuesta'];
    for (const key of keys) {
      const candidato = obj[key];
      if (Array.isArray(candidato)) return candidato as ReportePagoOnlineUserResponse[];
    }
    const registro = raw as Partial<ReportePagoOnlineUserResponse>;
    if (registro.codContri && registro.idOrderPago) return [registro as ReportePagoOnlineUserResponse];
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

  private parsearMonto(monto: unknown): number | null {
    if (monto === null || monto === undefined) return null;

    if (typeof monto === 'number') {
      return isNaN(monto) ? null : monto;
    }

    if (typeof monto === 'boolean') {
      return null;
    }

    if (typeof monto === 'object') {
      const obj = monto as Record<string, unknown>;
      const candidatos = ['monto', 'amount', 'valor', 'value', 'importe', 'total'];
      for (const k of candidatos) {
        const sub = obj[k];
        if (sub !== null && sub !== undefined) {
          const parsed = this.parsearMonto(sub);
          if (parsed !== null) return parsed;
        }
      }
      return null;
    }

    let raw = String(monto).trim();
    if (!raw) return null;

    raw = raw.replace(/[^\d,.\-]/g, '');

    let separadorDecimal = '.';
    const tienePunto = raw.includes('.');
    const tieneComa = raw.includes(',');
    if (tieneComa && tienePunto) {
      separadorDecimal = raw.lastIndexOf(',') > raw.lastIndexOf('.') ? ',' : '.';
    } else if (tieneComa) {
      separadorDecimal = ',';
    }

    if (separadorDecimal === ',') {
      raw = raw.replace(/\./g, '').replace(',', '.');
    } else {
      raw = raw.replace(/,/g, '');
    }

    const n = Number(raw);
    return isNaN(n) ? null : n;
  }

  formatearMonto(monto: number | undefined | null | unknown): string {
    const valor = this.parsearMonto(monto);
    if (valor === null) return '-';
    try {
      return valor.toLocaleString('es-PE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } catch {
      return String(valor);
    }
  }

  estadoTexto(estado: number | undefined | null): string {
    if (estado === null || estado === undefined) return 'DESCONOCIDO';
    switch (Number(estado)) {
      case 1:
        return 'PAGADO';
      case 2:
        return 'PENDIENTE';
      case 3:
        return 'ANULADO';
      case 4:
        return 'FALLIDO';
      case 5:
        return 'VENCIDO';
      default:
        return `ESTADO ${estado}`;
    }
  }

  badgeClassEstado(estado: number | undefined | null): string {
    const defaultClass = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
    if (estado === null || estado === undefined) return defaultClass;
    const e = Number(estado);
    switch (e) {
      case 1:
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 2:
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 3:
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 4:
        return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
      case 5:
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return defaultClass;
    }
  }

  protected readonly APP_CONSTANTS = APP_CONSTANTS;
}
