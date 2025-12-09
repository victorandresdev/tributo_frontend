export class ImpuestoPredialResponse{
  AFECTO!:number;
  EMISION!:number;
  IDDEUDA!:number;
  MORA!:number;
  PAGADO!:number;
  PERIODO!:number;
  REAJUSTE!:number;
  TRIBUTO!:string;

  PREDIO?:string;
  SALDO?:number;
  TOTALES?:number;
  ESTADO?:number;
  DESCRIPCION_ESTADO?:string;
}
