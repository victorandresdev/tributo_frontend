import { Routes } from "@angular/router";
import { Pendientes } from "./pagos/pendientes/pendientes";
import { Historia } from "./pagos/historia/historia";
import { Fraccion } from "./pagos/fraccion/fraccion";
import { Liquidacion } from "./pagos/liquidacion/liquidacion";
import { RespuestaNiubiz } from "./pagos/respuesta-niubiz/respuesta-niubiz";

export const routesPagos: Routes = [
  { path: 'pendientes/ip1', component: Pendientes },
  { path: 'pendientes/ip2', component: Fraccion },
  { path: 'pendientes/ip3', component: Liquidacion },
  { path: 'historial', component: Historia },
  { path: 'respuesta-niubiz', component: RespuestaNiubiz },
];
