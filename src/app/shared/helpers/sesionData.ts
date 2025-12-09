export class SesionData{
  usuario!:UsuarioData;
  permiso?: string[];
}

export class UsuarioData{
  tipoUsuario!:string;
  login?: string;
  nombres?: string;
  sexo?: number;
  direccion?: string;
  codigoContribuyente?: string;
  idContribuyente?: number;
}
