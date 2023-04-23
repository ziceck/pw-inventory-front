import { InformationService } from '@services/information/information.service';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('InformationService', () => {

  let informationService: InformationService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [HttpClient],
      imports: [HttpClientModule]
    });

    informationService = TestBed.inject(InformationService);
  });

  it('should be created', () => {
    expect(informationService).toBeTruthy();
  });

});
