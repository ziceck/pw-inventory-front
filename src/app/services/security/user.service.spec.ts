import { TestBed } from '@angular/core/testing';
import { UserService } from '@services/security/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('UserService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay
      ],
      imports: [HttpClientModule]
    });
  });

  it('should create', () => {
    const userService: UserService = TestBed.inject(UserService);
    expect(userService).toBeTruthy();
  });

});
