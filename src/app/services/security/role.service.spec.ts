import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpClientModule
      ],
      providers: [
        NotificationService,
        MatSnackBar,
        Overlay
      ]
    });
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
