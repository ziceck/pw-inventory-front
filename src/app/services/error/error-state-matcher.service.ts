import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

/**
 * This service is used to add an error state matcher in inputs.
 */
@Injectable()
export class ErrorStateMatcherService implements ErrorStateMatcher{

  constructor() {
  }

  /**
   * Control the way to notify when error message should be displayed.
   */
  /* TODO: Check if it is necessary mark all as touched using this */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}
