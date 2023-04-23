import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@services/notifications';
import { versions } from '../../../../environments/versions';
import { environment } from '../../../../environments/environment';

interface Versions {
  version: string;
  revision: string;
  branch: string;
  date: string;
}

/**
 * This component shows information about the application.
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  versions: Versions;
  env: string;

  constructor(
      private notificationService: NotificationService
  ) {
    this.versions = versions;
    this.env = environment.production ? 'Prod' : 'Dev';
  }

  ngOnInit(): void {
  }

  /**
   * Copy content in inputs and show notification about what you have copied.
   * @param value Value you have copied.
   */
  onCopy(value: string): void {
    this.notificationService.success('Ha copiado ' + value);
  }

}
