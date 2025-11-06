import { APP_CONSTANTS } from "../app/shared/constants/app.constants";
import { EnvironmentsInterface } from "./environments-interface";

export const environment: EnvironmentsInterface = {
  production: true,
  API_AUTH: 'http://localhost:9898/tarraco-backend',
  HOST: 'TU_RUTA_PUBLICA',
  RETRY: 2,
  TOKEN_NAME: APP_CONSTANTS.VAR_TOKEN,
};
