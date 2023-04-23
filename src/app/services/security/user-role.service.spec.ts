import { TestBed } from '@angular/core/testing';

import { UserRoleService } from './user-role.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('UserRoleService', () => {
  let service: UserRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        MatSnackBar,
        Overlay
      ],
      imports: [
          HttpClientModule,
      ]
    });
    service = TestBed.inject(UserRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
