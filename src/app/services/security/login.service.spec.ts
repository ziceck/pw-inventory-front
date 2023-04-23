/* tslint:disable:no-string-literal */

import { TestBed } from '@angular/core/testing';
import { LoginService } from '@services/security/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const jwtMock = {
  access_token: '',
  expires_in: 0,
  id: 0,
  personalInformation: undefined,
  roles: [],
  token_type: '',
  username: '',
  refresh_token: 'sldfj'
};

describe('LoginService', () => {

  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login', () => {
    // const service: LoginService = TestBed.inject(LoginService);
    // const httpClient = jasmine.createSpyObj('HttpClient', ['post']);
    const mockOf = of({}).pipe(map(() => {
      return {};
    }));
    const spy = spyOn(service['http'], 'post').and.returnValue(mockOf);
    const spyStorage = spyOn(service.storageService, 'setCurrentUser').and.callFake(() => {
    });
    service.login({
      username: 'admin',
      password: 'admin'
    }).subscribe(() => expect(spyStorage).toHaveBeenCalled());
    expect(spy).toHaveBeenCalled();
    // expect(spyStorage).toHaveBeenCalled();
  });

  it('should close', () => {
    const spyRouter = spyOn(service['router'], 'navigate').and.resolveTo(true);
    service.logout();
    expect(spyRouter).toHaveBeenCalled();
  });

  it('should refresh token', () => {
    const spy = spyOn(service['http'], 'post').and.returnValue(of({}));
    const spyStorage = spyOn(service.storageService, 'getCurrentUser').and.returnValue(jwtMock);
    const spyStorageSet = spyOn(service.storageService, 'setCurrentUser').and.callFake(() => {});
    service.refreshToken().subscribe(() => {
      expect(spyStorageSet).toHaveBeenCalled();
    });
    expect(spy).toHaveBeenCalled();
    expect(spyStorage).toHaveBeenCalled();
  });

});
