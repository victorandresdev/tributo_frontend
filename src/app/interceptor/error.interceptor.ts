import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { UtilService } from '../services/util.services';
import { MatDialog } from '@angular/material/dialog';
import { APP_CONSTANTS } from '../shared/constants/app.constants';
import { APP_ROUTES } from '../shared/constants/app.routes';
import Swal from 'sweetalert2';

const ENDPOINTS_PUBLICOS_401 = ['loginGeneral', 'login-persona', 'login-admin', '/token'];

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const utilService = inject(UtilService);
  const dialog = inject(MatDialog);

  const esEndpointPublico = ENDPOINTS_PUBLICOS_401.some(segmento => req.url.includes(segmento));

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let msg = 'Error desconocido';
      if (error.status === 0) {
        msg = '❌ Error el servidor no está disponible.';
      } else if (error.status === 400) {
        msg = 'ERROR 400';
      } else if (error.status === 401) {
        const hayToken = !!utilService.getLocalStorage(APP_CONSTANTS.VAR_TOKEN);

        if (!esEndpointPublico && hayToken) {
          Swal.fire({
            title: 'Sesión terminada',
            text: 'Su sesión ha expirado o no tiene autorización.',
            icon: 'info',
            confirmButtonText: 'Entendido'
          });
          utilService.removeLocalStorage(APP_CONSTANTS.VAR_TOKEN);
          utilService.removeLocalStorage(APP_CONSTANTS.VAR_USUARIO);
          dialog.closeAll();
          utilService.link(APP_ROUTES.URL_HOME);
        }

        return throwError(() => error);
      } else if (error.status === 403) {
        msg ='🚫 Posible problema con la sesión, se recomienda volver a iniciar sesión.';
      } else if (error.status === 404) {
        msg = '🔍 Instancia no encontrado (404).';
      } else if (error.status === 500) {
        msg = '❌ Error (500).' + error.message;
      }

      snackBar.open(msg, 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });

      return throwError(() => error);
    })
  );
};
