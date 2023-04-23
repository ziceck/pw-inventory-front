/* tslint:disable:no-string-literal */
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { PersonalInformationService } from '@services/core/personal-information.service';
import { of } from 'rxjs';
import { PersonalInformation } from '@models/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PersonalInformationService', () => {

  let personalInformationService: PersonalInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay
      ],
      imports: [HttpClientModule, BrowserAnimationsModule]
    });

    personalInformationService = TestBed.inject(PersonalInformationService);
  });

  it('should be created', () => {
    expect(personalInformationService).toBeTruthy();
  });

  it('create', () => {
    const mockPersonalInformation: PersonalInformation = {
      id: null,
      name: 'Yo',
      lastName: 'Yo',
      secondLastName: 'Yo',
      user: null
    };
    const spy = spyOn(personalInformationService['httpClient'], 'post').and.returnValue(of(mockPersonalInformation));
    personalInformationService.create(mockPersonalInformation).subscribe(value => {
      expect(value.name === mockPersonalInformation.name).toBeTrue();
    });
    expect(spy).toHaveBeenCalled();
  });

});
