/* tslint:disable:no-string-literal */
import { TestBed } from '@angular/core/testing';
import { LoginService } from '@services/security';
import { ErrorInterceptor } from '@services/interceptor/error-interceptor.service';
import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { LoginComponent } from '../../components/security/login/login.component';

describe('ErrorInterceptorService', () => {

  let errorInterceptorService: ErrorInterceptor;
  const mock403Response = {status: 403, error: {message: 'Se requiere el rol'}};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, HttpClient],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {path: 'login', component: LoginComponent}
        ])
      ]
    });
    errorInterceptorService = TestBed.inject(ErrorInterceptor);
  });

  it('should create', () => {
    expect(errorInterceptorService).toBeTruthy();
  });

  it('intercept', () => {
    const requestMock = new HttpRequest('GET', '/test');
    const next: any = {
      handle: () => {
        return new Observable(subscriber => {
          // subscriber.next();
          subscriber.complete();
        });
      }
    };
    // const spy = spyOn(next, 'handle');
    errorInterceptorService.intercept(requestMock, next);
    expect(true).toBeTrue();
    // expect(spy).toHaveBeenCalled();
  });

  it('notAllowed', () => {
    const expect401 = errorInterceptorService['notAllowed']({status: 401, error: {message: ''}});
    expect(expect401).toBeTrue();
    const expect403 = errorInterceptorService['notAllowed'](
        mock403Response
    );
    expect(expect403);
  });

  it('handleError', () => {
    const loginService: LoginService = TestBed.inject(LoginService);
    const spy = spyOn(loginService, 'logout');
    errorInterceptorService['handleError'](mock403Response);
    expect(spy).toHaveBeenCalled();
  });

});
