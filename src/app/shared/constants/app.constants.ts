import { APP_ROUTES } from "./app.routes";

export const APP_CONSTANTS = {
  VERSION: 1.0,
  VAR_TOKEN: 'dtTknMuMoli',
  VAR_USUARIO: 'dtUsuLoc',
  VAR_MENU:{
    CONTRIBUYENTE: {
      INICIO: {
        RUTA: APP_ROUTES.URL_INICIO,
        ETIQUETA: 'INICIO',
      },
      PAGOS: {
        RUTA: APP_ROUTES.URL_PAGOS.INICIO,
        ETIQUETA: 'PAGOS',
        PENDIENTES:{
          RUTA: APP_ROUTES.URL_PAGOS.PENDIENTES,
          ETIQUETA: 'PAGOS PENDIENTES',
        },
        HISTORIA: {
          RUTA: APP_ROUTES.URL_PAGOS.HISTORIA,
          ETIQUETA: 'HISTORIA DE PAGOS',
          PREVIOS: [APP_ROUTES.URL_INICIO, APP_ROUTES.URL_PAGOS.INICIO]
        }
      },

    }
  },
}
