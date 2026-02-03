import { APP_CONSTANTS } from "../constants/app.constants";

export class ImpuestoPredialRequest{
  public anioInicio?: string;
  public anioFin?: string;
  public flag?: string;
  public dummy?: string;
  public tipo?: string;
  public estado?: string;

  public inicio?: number;
  public fin?: number;

  constructor(){
    this.flag = "1";
    this.dummy = "";
    this.tipo = "2";
    this.estado = APP_CONSTANTS.TIPO_IMPUESTO.TODOS;
  }
}
/*
{
  "anioInicio": "2020",
  "anioFin": "2026",
  "flag": 1,
  "dummy": "",
  "tipo": "2",
  "estado": "T"
}
*/
