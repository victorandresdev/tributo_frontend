import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SeguridadService } from "../services/segudidad.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  constructor(private seguridadService: SeguridadService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token;
    token = this.seguridadService.getToken();
    if(!request.headers.get('skip')){
        if(token && token !== ''){
            request = request.clone({
                setHeaders: {
                    Authorization: 'Beaver ${token}'
                }
            });
        }
    }
    return next.handle(request);
  }
}
