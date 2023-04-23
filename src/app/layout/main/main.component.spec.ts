/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '@services/security';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Jwt } from '@models/security';
import { CONTINUE_SESSION } from '@shared/dialog-expired-session/dialog-expired-session.component';
import { NotificationService } from '@services/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let loginService: LoginService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [MainComponent, HeaderComponent],
      providers: [
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([{
          path: 'login',
          redirectTo: ''
        }]),
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    loginService = TestBed.inject(LoginService);
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
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open session expired dialog', () => {
    const spy = spyOn(component['matDialog'], 'open').and.returnValue(
        {afterClosed: () => of(CONTINUE_SESSION)} as MatDialogRef<typeof component>
    );
    component['openSessionExpiredDialog']();
    expect(spy).toHaveBeenCalled();
  });

  it('refresh token', () => {
    const jwt: Jwt = {
      access_token: '',
      expires_in: 0,
      id: 0,
      personalInformation: undefined,
      refresh_token: '',
      roles: [],
      token_type: '',
      username: ''
    };
    const spy = spyOn(loginService, 'refreshToken').and.returnValue(of(jwt));
    component['refreshToken']();
    expect(spy).toHaveBeenCalled();
  });

});
