/* tslint:disable:no-string-literal */
import { AuthInterceptorService } from '@services/interceptor/auth-interceptor.service';
import { TestBed } from '@angular/core/testing';
import { LoginService } from '@services/security';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginComponent } from '../../components/security/login/login.component';

describe('AuthInterceptorService', () => {

  let authInterceptorService: AuthInterceptorService;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        HttpClient
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'login', component: LoginComponent}
        ]),
        HttpClientModule
      ]
    });

    authInterceptorService = TestBed.inject(AuthInterceptorService);
    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(authInterceptorService).toBeTruthy();
  });

  it('intercept auth', () => {
    const requestMock = new HttpRequest('GET', '/test');
    const currentUserMock = {
      id: null,
      username: 'admin',
      token_type: '',
      access_token: 'asdfg',
      expires_in: 4,
      refresh_token: '',
      personalInformation: null,
      roles: ['ROLE_ADMIN']
    };
    /* const errorResponse = new HttpErrorResponse({
      status: 401,
      error: '401'
    });*/
    const next: any = {
      handle: () => {
        return new Observable(subscriber => {
          subscriber.complete();
        });
      }
    };
    const spy = spyOn(loginService.storageService, 'getCurrentUser').and.returnValue(currentUserMock);
    authInterceptorService.intercept(requestMock, next);
    expect(spy).toHaveBeenCalled();
  });

  /*it('handleError', () => {
    const errorResponse = new HttpErrorResponse({
      status: 401
    });
    authInterceptorService['handleError'](errorResponse);
    expect();
  });*/

});
