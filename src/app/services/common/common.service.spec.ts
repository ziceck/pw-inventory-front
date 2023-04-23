import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import { NotificationService } from '@services/notifications';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonServiceMock } from '@mocks/services-mocks';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('CommonService', () => {
  let service: CommonService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommonServiceMock,
        NotificationService,
        MatSnackBar,
        Overlay
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    });
    service = TestBed.inject(CommonServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
