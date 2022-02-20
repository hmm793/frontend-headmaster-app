import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { environment } from '../../environments/environment';

const port = environment.port;
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localstorageService: LocalstorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localstorageService.getToken();
    console.log('JWT INTERCEPTOR : ', token);
    const isAPIUrl = request.url.startsWith(`${port}/api`);
    let cloned;
    if (token && isAPIUrl) {
      cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
