import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalInformationService } from '@services/core';
import { LoginService, UserService } from '@services/security';
import { Jwt } from '@models/security';
import { MatDialog } from '@angular/material/dialog';
import { DialogChangePasswordComponent } from '@shared/dialog-change-password/dialog-change-password.component';

/**
 * This component shows information about the current user.
 */
@Component({
  selector: 'app-profiles',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  fgPersonalInformation: FormGroup;
  currentUser: Jwt;

  constructor(
      private formBuilder: FormBuilder,
      private loginService: LoginService,
      private personalInformationService: PersonalInformationService,
      private matDialog: MatDialog,
      private userService: UserService
  ) {
    this.currentUser = this.loginService.storageService.getCurrentUser();
    this.configureFgPersonalInformation();
  }

  ngOnInit(): void {
  }

  /**
   * Configure form group for personal information.
   */
  private configureFgPersonalInformation(): void {
    const personalInformation = this.currentUser.personalInformation;
    this.fgPersonalInformation = this.formBuilder.group({
      id: [personalInformation?.id],
      name: [personalInformation?.name, [Validators.required]],
      lastName: [personalInformation?.lastName, [Validators.required]],
      secondLastName: [personalInformation?.secondLastName],
      user: this.formBuilder.group({
        id: [this.currentUser.id]
      })
    });
  }

  /**
   * This method is called when click on save button, if user doesn't have personal information
   * send a request to create it, else send a request to update information.
   */
  onSubmit(): void {
    const personalInformation = this.fgPersonalInformation.value;
    const request = personalInformation.id
        ? this.personalInformationService.update(
            personalInformation, 'Se ha guardado la información personal'
        )
        : this.personalInformationService.create(
            personalInformation, 'Se ha actualizado la información personal'
        );
    request.subscribe(pi => {
      this.fgPersonalInformation.patchValue(pi);
      this.currentUser.personalInformation = pi;
      this.loginService.storageService.setCurrentUser(JSON.stringify(this.currentUser));
    });
  }

  /**
   * This method is called when you click on change password button and open
   * a dialog to change password.
   */
  onChangePassword(): void {
    this.matDialog.open(DialogChangePasswordComponent, {
      width: '400px',
      data: {}
    }).afterClosed().subscribe((passwords: any) => {
      if (passwords) {
        this.userService.matchPassword(passwords.currentPassword).subscribe(
            () => this.changePassword(passwords)
        );
      }
    });
  }

  /**
   * Send a request to change password.
   * @param passwords Value of newPassword
   */
  private changePassword(passwords: any): void {
    this.userService.changePassword(passwords).subscribe();
  }

  get username(): string {
    return this.loginService.storageService.getCurrentUser().username;
  }

  get rol(): string[] {
    return this.loginService.storageService.getCurrentUser().roles;
  }

}
