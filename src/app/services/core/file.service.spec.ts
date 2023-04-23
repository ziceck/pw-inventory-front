import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
