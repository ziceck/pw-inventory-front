import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PersonalInformation } from '@models/core';
import { catchError, tap } from 'rxjs/operators';
import { errorNotification } from '@helpers/.';
import { CommonService } from '@services/common/common.service';

/**
 * This service is used to send requests about personal information.
 */
@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService extends CommonService<PersonalInformation> {

  private readonly URL_PERSONAL_INFORMATION: string;

  constructor(
      protected httpClient: HttpClient,
      protected notificationService: NotificationService
  ) {
    super(httpClient, notificationService);
    this.URL_PERSONAL_INFORMATION = environment.URL_API + 'v1/personal-information/';
  }

  get fullUrl(): string {
    return this.URL_PERSONAL_INFORMATION;
  }

}
