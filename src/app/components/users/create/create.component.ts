import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/security';
import { matchPasswords } from '@shared/dialog-change-password/dialog-change-password.component';
import { UserRoleService } from '@services/security/user-role.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * This component is to create a new user with username, role and password.
 */
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  fgUser: FormGroup;
  displayPasswordRow = true;

  constructor(
      protected formBuilder: FormBuilder,
      protected userService: UserService,
      protected userRoleService: UserRoleService,
      protected router: Router,
      protected activatedRoute: ActivatedRoute
  ) {
    this.configureFgUser();
  }

  ngOnInit(): void {
  }

  /**
   * Configure form group for user, override parent method because
   * you only can edit username and role but not password.
   */
  protected configureFgUser(): void {
    this.fgUser = this.formBuilder.group({
      username: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]],
      confirmPassword: [undefined, [Validators.required, matchPasswords]],
      role: [undefined, [Validators.required]]
    });
    this.fgUser.get('confirmPassword').valueChanges.subscribe(() => {
      this.fgUser.get('password').updateValueAndValidity();
    });
  }

  /**
   * This method is called on ngSubmit in form (save button) and send a request
   * to save a user.
   */
  onCreateUser(): void {
    this.userService.create({
      username: this.fgUser.get('username').value,
      password: this.fgUser.get('password').value
    }).subscribe(user => this.createUserRole(user.id));
  }

  /**
   * This method is called after you save a user to add its role.
   * @param userId ID of the user you want to add a role.
   */
  private createUserRole(userId: number): void {
    this.userRoleService.create({user: userId, role: this.fgUser.get('role').value})
        .subscribe(() => this.redirectIndex());
  }

  /**
   * Redirect to index of items.
   */
  private redirectIndex(): void {
    this.router.navigate(['.'], {relativeTo: this.activatedRoute.parent}).then();
  }

}
