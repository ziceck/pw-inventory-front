import { TestBed } from '@angular/core/testing';
import { LoadingService } from '@services/spinner/loading.service';

describe('LoadingService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should create', () => {
    const loadingService: LoadingService = TestBed.inject(LoadingService);
    expect(loadingService).toBeTruthy();
  });

});
