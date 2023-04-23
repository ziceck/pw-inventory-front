import { NotificationService } from '@services/notifications';
import { Observable, throwError } from 'rxjs';

/**
 * If the error is 422 shows the first message error in array of errors.
 * If it is any other error shows the message from back end.
 * @param error JSON error from back end.
 * @param notificationService Service to show the notification.
 */
export function errorNotification(
    error: any,
    notificationService: NotificationService
): Observable<never> {
  let err: string;
  if (error instanceof ProgressEvent) {
    err = 'No se pudo conectar con el servidor';
  } else if (error.status === 422) {
    err = error.errors[0].message;
  } else {
    err = error.message;
  }
  notificationService.error(err);
  return throwError(err);
}
