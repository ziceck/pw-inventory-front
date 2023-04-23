import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '@services/notifications';
import { CONFIGURATION } from '@shared/local-storage-keys';

/**
 * This component shows configurations to custom actions in application.
 */
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  fgConfiguration: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private notificationService: NotificationService
  ) {
    this.createFgConfiguration();
    const configuration = localStorage.getItem(CONFIGURATION);
    if (configuration) {
      this.fgConfiguration.patchValue(JSON.parse(configuration));
    }
  }

  ngOnInit(): void {
  }

  private createFgConfiguration(): void {
    this.fgConfiguration = this.formBuilder.group({
      ticket: this.formBuilder.group({
        printTicket: [false],
        showDialog: [false]
      })
    });
  }

  onSave(): void {
    localStorage.setItem(CONFIGURATION, JSON.stringify(this.fgConfiguration.value));
    this.notificationService.success('Se ha guardado la configuración');
  }

}
