import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcherService } from '@services/error';

/**
 * This method is a custom validator to check if password and confirm password match.
 */
export function matchPasswords(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const confirmPassword = control.parent?.get('confirmPassword');
    const check: boolean = control.value && confirmPassword.value && control.value !== confirmPassword.value;
    return check ? {matchPassword: {value: control.value}} : null;
  };
}

/**
 * This dialog shows a form to change password for current user.
 */
@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.css'],
  providers: [ErrorStateMatcherService]
})
export class DialogChangePasswordComponent implements OnInit {

  fgChangePassword: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<DialogChangePasswordComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder
  ) {
    this.configureFgChangePassword();
  }

  ngOnInit(): void {
  }

  /**
   * Configure the form group to change password.
   */
  private configureFgChangePassword(): void {
    this.fgChangePassword = this.formBuilder.group({
      currentPassword: [undefined, Validators.required],
      newPassword: [undefined, [Validators.required, matchPasswords()]],
      confirmPassword: [undefined, [Validators.required]]
    });
    this.fgChangePassword.get('confirmPassword').valueChanges.subscribe(() => {
      this.fgChangePassword.get('newPassword').updateValueAndValidity();
    });
  }

  /**
   * This method is called when you click on save button, and send the form value
   * when you click close the dialog.
   */
  onSubmit(): void {
    this.dialogRef.close(this.fgChangePassword.value);
  }

}
