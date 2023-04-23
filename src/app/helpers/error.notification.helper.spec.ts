import { errorNotification } from './error-notification.helper';
import { TestBed } from '@angular/core/testing';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ErrorNotificationHelper', () => {

  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService, MatSnackBar, Overlay],
      imports: [BrowserAnimationsModule]
    });
    notificationService = TestBed.inject(NotificationService);
  });

  it('errorNotification no connection', () => {
    expect(errorNotification({}, notificationService)).toBeTruthy();
  });

  it('errorNotification 422', () => {
    expect(
        errorNotification({
          status: 422, errors: [{message: 'Mensaje'}]
        }, notificationService)
    ).toBeTruthy();
  });

  it('errorNotification progress event', () => {
    expect(errorNotification(new ProgressEvent('ja'), notificationService)).toBeTruthy();
  });

});
