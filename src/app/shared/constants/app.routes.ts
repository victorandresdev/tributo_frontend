export const APP_ROUTES = {
    URL_HOME: '/',
    URL_LOGIN: '/auth/login',
    URL_INICIO: '/pages/inicio',
    URL_PAGOS: {
      INICIO: '/pages/pagos',
      PENDIENTES: {
        PREDIAL:'/pages/pagos/pendientes/ip1',
        FRACCION: '/pages/pagos/pendientes/ip2',
        LIQUIDACION: '/pages/pagos/pendientes/ip3'
      },
      HISTORIA: 'pages/pagos/historial'
    },
    //URL_ADMIN_INICIO: 'pages/admin/'
    URL_ADMIN:{
      USUARIOS: '/pages/admin/usuarios',
      SEDES: '/pages/admin/sedes/',
      REPORTES: '/pages/admin/reportes',
    }
  }
