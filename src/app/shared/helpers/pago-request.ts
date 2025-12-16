import { DeudaRequest } from "./deuda-request";
import { PersonaPagoRequest } from "./persona-pago-request";

export class PagoRequest{
  nForma?: number;
  nMonto?: number;
  cNroOpera?: string;
  cKey?:string;
  nNroTar?:string;
  persona?: PersonaPagoRequest;
  deudas?: Array<DeudaRequest>;
  nIdUsuario?: number;
  dFechaReg?: string;
}
