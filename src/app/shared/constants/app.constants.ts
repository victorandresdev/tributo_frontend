import { APP_ROUTES } from "./app.routes";

export const APP_CONSTANTS = {
  VERSION: 1.0,
  PAGE_SIZE: 8,
  ANIO_INICIO: 2024,
  VAL_MENU:{
    COMPLETO: 1,
    COMPACTO: 0
  },
  VAR_TOKEN: 'dtTknMuMoli',
  VAR_USUARIO: 'dtUsuLoc',
  VAR_LOCAL: 'dtLocal',
  VAR_PAGE_ACTIVA: 'pageActiva',
  VAR_MENU:{
    CONTRIBUYENTE: {
      INICIO: {
        RUTA: APP_ROUTES.URL_INICIO,
        ETIQUETA: 'INICIO',
        IMAGEN: 'home',
        ESTADO: 1,
        NRO: 1
      },
      PAGOS: {
        RUTA: APP_ROUTES.URL_PAGOS.INICIO,
        ETIQUETA: 'PAGOS',
        IMAGEN: 'money',
        ESTADO: 1,
        NRO: 2,
        PENDIENTES:{
          RUTA: APP_ROUTES.URL_PAGOS.PENDIENTES,
          ETIQUETA: 'PAGOS PENDIENTES',
          IMAGEN: '',
          NRO: 2,
        },
        HISTORIA: {
          RUTA: APP_ROUTES.URL_PAGOS.HISTORIA,
          ETIQUETA: 'HISTORIA DE PAGOS',
          IMAGEN: '',
          NRO: 2
        }
      },
      CITAS: {
        RUTA: '',
        ETIQUETA: 'CITAS',
        IMAGEN: 'calendar_today',
        ESTADO: 0,
      }
    },
    ADMIN: {
      USUARIOS:{
        RUTA: APP_ROUTES.URL_ADMIN.USUARIOS,
        ETIQUETA: 'USUARIOS',
        IMAGEN: 'account_circle',
        ESTADO: 0,
        NRO: 2,
      },
      SEDES:{
        RUTA: APP_ROUTES.URL_ADMIN.SEDES,
        ETIQUETA: 'SEDES',
        IMAGEN: 'location_city',
        ESTADO: 1,
        NRO: 3,
      },
      REPORTES:{
        RUTA: APP_ROUTES.URL_ADMIN.REPORTES,
        ETIQUETA: 'REPORTES',
        IMAGEN: 'moneyassessment',
        ESTADO: 0,
        NRO: 4,
      }
    }
  },
  FORMATO_FECHA: {
    FECHA: 'dd/MM/yyyy',
    FECHA_HORA: 'dd/MM/yyyy HH:mm:ss',
    HORA: 'HH:mm:ss',
    FECHA_DATA: 'yyyy-MM-dd',
    SOLO_ANIO: 'yyyy'
  },
  TIME_ZONE: 'UTC',
  TIPO_USUARIO: {
    CONTRIBUYENTE: '01',
    SUPERVISOR: '02',
    ADMINISTRADOR: '03'
  },
  TIPO_TRAMITE:[
    {NID: 1, NOMBRE: 'Impuesto Predial'},
    {NID: 2, NOMBRE: 'Fraccionamiento'},
    {NID: 3, NOMBRE: 'Liquidación'},
  ],
  LOGIN_USUARIO:{
    DNI: 'DNI',
    CONTRIBUYENTE: 'CNT'
  },
  TIPO_IMPUESTO:{
    TODOS: 'T',
    IMPUESTOS: 'I',
    ARBITRIOS: 'A',
    COSTAS: 'C',
    FRACCION: 'F'
  }
};

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Cómo se parsean las entradas del usuario (ej. 25/12/2023)
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Cómo se muestra la fecha en el input
    monthYearLabel: 'MMM YYYY', // Formato para el encabezado del calendario (ej. "Dic 2023")
    dateA11yLabel: 'LL',      // Formato para accesibilidad (ej. "Diciembre 25, 2023")
    monthYearA11yLabel: 'MMMM YYYY', // Formato para accesibilidad (ej. "Diciembre 2023")
  },
}
