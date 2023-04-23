/* tslint:disable:no-string-literal */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '@services/security';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '@services/notifications';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MaterialModule } from '@material/material.module';
import { TranslateMockModule } from '@hetznercloud/ngx-translate-mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let notificationService: NotificationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        LoginService,
        HttpClient,
        NotificationService,
        MatSnackBar,
        Overlay
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateMockModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    notificationService = TestBed.inject(NotificationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login fail with undefined status', () => {
    const spy = spyOn(notificationService, 'error');
    component['onLoginFail']({status: undefined});
    expect(component.loading).toBeFalse();
    expect(spy).toHaveBeenCalled();
  });

  it('on login fail with no zero status', () => {
    const spy = spyOn(notificationService, 'error');
    component['onLoginFail']({status: 404, error: {message: 'Not found'}});
    expect(component.loading).toBeFalse();
    expect(spy).toHaveBeenCalled();
  });

  it('on login fail wit status zero', () => {
    const spy = spyOn(notificationService, 'error');
    component['onLoginFail']({status: 0});
    expect(component.loading).toBeFalse();
    expect(spy).toHaveBeenCalled();
  });

});
