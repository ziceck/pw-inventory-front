/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService, UserService } from '@services/security';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PersonalInformationService } from '@services/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { TranslateStore } from '@ngx-translate/core';
import { MaterialModule } from '@material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SharedModule } from '@shared/shared.module';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let loginService: LoginService;
  let userService: UserService;
  let personalInformationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        FormBuilder,
        LoginService,
        MatDialog,
        UserService,
        PersonalInformationService,
        HttpClient,
        NotificationService,
        TranslateStore,
        MatDialog,
        MatSnackBar,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        Overlay
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        SharedModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    loginService = TestBed.inject(LoginService);
    userService = TestBed.inject(UserService);
    personalInformationService = TestBed.inject(PersonalInformationService);
    spyOn(loginService.storageService, 'getCurrentUser').and.callFake(() => {
      return {
        id: null,
        username: 'admin',
        token_type: '',
        access_token: '',
        expires_in: 4,
        refresh_token: '',
        personalInformation: null,
        roles: ['ROLE_ADMIN']
      };
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on submit personal information update', () => {
    const spy = spyOn(personalInformationService, 'update').and.returnValue(
        of({})
    );
    component.fgPersonalInformation.patchValue({
      id: 1
    });
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('change password', () => {
    const spy = spyOn(userService, 'changePassword').and.returnValue(
        of({})
    );
    component['changePassword']({});
    expect(spy).toHaveBeenCalled();
  });

});
