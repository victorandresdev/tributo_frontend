import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { UtilService } from "../services/util.services";
import { APP_CONSTANTS } from "../shared/constants/app.constants";

export const jwtInterceptorFn: HttpInterceptorFn = (req, next) => {
  const util = inject(UtilService);
  const token = util.getLocalStorage(APP_CONSTANTS.VAR_TOKEN);

  if (token) {
    console.log("Entra seguridad: ", token);
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};
/*export class JwtInterceptor implements HttpInterceptor{

  constructor(private util: UtilService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token;
    token = this.util.getLocalStorage(APP_CONSTANTS.VAR_TOKEN);
    if (token != null) {
      console.log("Entro a seguridad: ", token);
      const authreq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      return next.handle(authreq);
    }
    return next.handle(request);
  }
}
*/
