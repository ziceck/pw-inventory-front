import { Injectable } from '@angular/core';
import { LoadingService } from '@services/spinner';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

/**
 * Intercept all request to know when they finish.
 */
@Injectable()
export class NetworkInterceptorService {

  constructor(private loadingService: LoadingService) {
  }

  /**
   * Intercept all request and show an spinner when they start and hide spinner when they finish.
   * @param request Request intercepted.
   * @param next Nex action.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.show();
    return next.handle(request).pipe(
        finalize(() => {
          this.loadingService.hide();
        })
    );
  }

}
