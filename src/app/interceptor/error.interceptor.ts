import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let msg = 'Error desconocido';
      if (error.status === 0) {
        msg = '❌ Error el servidor no está disponible.';
      } else if (error.status === 400) {
        msg = 'ERROR 400';
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
        panelClass: ['snackbar-error'] // opcional
      });

      return throwError(() => error);
    })
  );
};
