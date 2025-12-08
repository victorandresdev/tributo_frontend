export interface EnvironmentsInterface {
  production: boolean;
  // Agrega todas las propiedades que uses, incluidas las existentes
  HOST: string;
  RETRY: number;
  TOKEN_NAME: string;

  // ⬅️ ¡Agrega la propiedad API_AUTH aquí!
  API_AUTH: string;
  URL_WEBSOCKET_DEVICE_INFO: string,
}
