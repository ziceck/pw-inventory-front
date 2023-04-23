import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * This services contains error, warning and success notifications.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly defaultTime: number;

  constructor(private matSnackBar: MatSnackBar) {
    this.defaultTime = 3500;
  }

  /**
   * Show a success notification.
   * @param message Message you want to show.
   */
  success(message: string): void {
    this.matSnackBar.open(message, '', {
      duration: this.defaultTime,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['bg-success', 'text-white', 'fg-500'] // you can pass all css class to custom text, background, etc.
    });
  }

  /**
   * Show an error notification.
   * @param message Message you want to show.
   */
  error(message: string): void {
    this.matSnackBar.open(message, '', {
      duration: this.defaultTime,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['bg-danger', 'text-white', 'fg-500']
    });
  }

  /**
   * Show a warning notification.
   * @param message Message you want to show.
   */
  warning(message: string): void {
    this.matSnackBar.open(message, '', {
      duration: this.defaultTime,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['bg-warning-orange', 'text-white', 'fg-500']
    });
  }

}
