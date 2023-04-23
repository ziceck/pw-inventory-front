import { TestBed } from '@angular/core/testing';

import { ExpiredSessionService } from './expired-session.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ExpiredSessionService', () => {

  let service: ExpiredSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [],
      imports: []
    });
    service = TestBed.inject(ExpiredSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
