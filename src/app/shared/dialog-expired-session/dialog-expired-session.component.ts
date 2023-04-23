import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { timer } from 'rxjs';

export const CONTINUE_SESSION = 1;
export const CLOSE_SESSION = 2;
export const EXPIRED_SESSION = 3;

/**
 * This component shows a notification when session is near to expire.
 */
@Component({
  selector: 'app-dialog-expired-session',
  templateUrl: './dialog-expired-session.component.html',
  styleUrls: ['./dialog-expired-session.component.css']
})
export class DialogExpiredSessionComponent implements OnInit {

  SECONDS: number;
  readonly continueSession = CONTINUE_SESSION;
  readonly closeSession = CLOSE_SESSION;
  private readonly expiredSession = EXPIRED_SESSION;

  constructor(
      public dialogRef: MatDialogRef<DialogExpiredSessionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.SECONDS = 15;
  }

  ngOnInit(): void {
    this.callTimer();
  }

  /**
   * Call a timer to show a countdown in the dialog.
   */
  callTimer(): void {
    timer(1000).subscribe(() => {
      if (this.SECONDS > 0) {
        this.SECONDS = this.SECONDS - 1;
        this.callTimer();
      } else {
        this.dialogRef.close(this.expiredSession);
      }
    });
  }

}
