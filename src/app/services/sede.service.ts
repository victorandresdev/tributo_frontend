import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SedeService {
  private baseUrl = environment.API_AUTH;
  sedes:any = [
    {nId:1, sLocal: 'Wong - La Planicie', sDireccion:'Av. Ricardo Elías Aparicio 715, La Molina 15026', nEstado: 1,
      terminales:[
        {nId:1, sNombre: 'Pc1', sIp: '192.168.1.15', nEstado: 1},
        {nId:2, sNombre: 'Pc2', sIp: '192.168.1.16', nEstado: 0},
        {nId:3, sNombre: 'Pc3', sIp: '192.168.1.17', nEstado: 1}
      ]},
    {nId:2, sLocal: 'Tazza Caffe - La Esquina Market', sDireccion:'Av Laguna Grande 1031, La Molina 15026', nEstado: 1,
      terminales:[
        {nId:4, sNombre: 'Pc1', sIp: '192.168.1.21', nEstado: 1}
      ]},
    {nId:3, sLocal: 'Wong La Molina', sDireccion:'Av. Raúl Ferrero 1355, Lima 15024', nEstado: 1,
      terminales:[
        {nId:5, sNombre: 'Pc1', sIp: '192.168.1.39', nEstado: 1},
        {nId:6, sNombre: 'Pc2', sIp: '192.168.1.40', nEstado: 1}
      ]},
  ];

  getSedes(){
    return this.sedes;
  }
}
