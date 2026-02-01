import { Terminal } from "./terminal";

export interface Sede{
  nId?:number,
  sLocal?:string,
  sDireccion?:string,
  nEstado?:number,
  terminales:Array<Terminal>
}
