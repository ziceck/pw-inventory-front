import { TestBed } from '@angular/core/testing';
import { NetworkInterceptorService } from '@services/interceptor/network-interceptor.service';
import { LoadingService } from '@services/spinner';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('NetworkInterceptorService', () => {

  let networkInterceptorService: NetworkInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService, NetworkInterceptorService]
    });
    networkInterceptorService = TestBed.inject(NetworkInterceptorService);
  });

  it('should create', () => {
    expect(networkInterceptorService).toBeTruthy();
  });

  it('intercept network', () => {
    const loadingService: LoadingService = TestBed.inject(LoadingService);
    const requestMock = new HttpRequest('GET', '/test');
    const next: any = {
      handle: () => {
        return new Observable(subscriber => {
          subscriber.complete();
        });
      }
    };
    const spy = spyOn(loadingService, 'show');
    networkInterceptorService.intercept(requestMock, next).subscribe(() => {
      expect(spy).toHaveBeenCalled();
    });
    expect(requestMock).toBeTruthy();
  });

});
