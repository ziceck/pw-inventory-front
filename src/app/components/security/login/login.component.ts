import { Component, OnInit } from '@angular/core';
import { LoginService } from '@services/security';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ExpiredSessionService, NotificationService } from '@services/notifications';
import { TranslateService } from '@ngx-translate/core';

/**
 * This component contains the login view
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  loading = false;

  constructor(
      private formBuilder: FormBuilder,
      private loginService: LoginService,
      private router: Router,
      private expiredSessionService: ExpiredSessionService,
      private route: ActivatedRoute,
      private notificationService: NotificationService,
      public translate: TranslateService
  ) {
    this.configureLoginFg();
    this.configureLanguage();
    // funciona cuando se trata de acceder a la url /login
    if (this.loginService.storageService.getCurrentUser()) {
      this.router.navigate(['.']).then(() => {
        // this.notificationService.success('Bienvenido');
      });
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }


  /**
   * If form is valid send a request to login.
   */
  login(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginService.login(this.loginForm.value).subscribe(() => {
            this.onLoginSuccess();
          },
          error => {
            this.onLoginFail(error);
          }
      );
    }
  }

  /**
   * Configure a form group for the login form.
   */
  private configureLoginFg(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Configure main language in the application.
   */
  private configureLanguage(): void {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
  }

  /**
   * This method is called when login in successful, redirect to home
   * and show a success notification.
   */
  private onLoginSuccess(): void {
    this.loading = false;
    this.router.navigate(['/home']).then(() => {
      this.expiredSessionService.initTimer();
      this.notificationService.success('Sesión iniciada correctamente');
    });
  }

  /**
   * This method is called when login fails.
   * @param error Error object from the request.
   */
  private onLoginFail(error: any): void {
    this.loading = false;
    if (error.status === undefined) {
      this.notificationService.error('Ocurrió un error');
    } else if (error.status !== 0) {
      this.notificationService.error(error.error.message);
    } else {
      this.notificationService.error('No hay conexión por el momento, inténtelo más tarde');
    }
  }

}
