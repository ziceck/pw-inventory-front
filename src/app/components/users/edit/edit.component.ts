import { Component, OnInit } from '@angular/core';
import { CreateComponent } from '../create/create.component';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@services/security';
import { UserRoleService } from '@services/security/user-role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@models/security';

/**
 * This component is to edit a user.
 */
@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html'
})
export class EditComponent extends CreateComponent implements OnInit {

  displayPasswordRow = false;

  constructor(
      protected store: Store<any>,
      protected formBuilder: FormBuilder,
      protected userService: UserService,
      protected userRoleService: UserRoleService,
      protected router: Router,
      protected activatedRoute: ActivatedRoute
  ) {
    super(formBuilder, userService, userRoleService, router, activatedRoute);
  }

  ngOnInit(): void {
    this.getParam();
  }

  /**
   * Configure form group for user, override parent method because
   * you only can edit username and role but not password.
   */
  protected configureFgUser(): void {
    this.fgUser = this.formBuilder.group({
      id: [undefined],
      username: [undefined, [Validators.required]],
      role: [undefined, [Validators.required]]
    });
  }

  /**
   * This method get id param on url.
   */
  private getParam(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUser(+id);
  }

  /**
   * Get user if exits on store, else get from request, after get a user
   * patch values on form group.
   * @param paramId ID user you want to get.
   */
  private getUser(paramId: number): void {
    this.store.select('user').subscribe(user => {
      if (paramId === user?.id) {
        this.patchValue(user);
      } else {
        this.userService.show(paramId).subscribe(u => this.patchValue(u));
      }
    });
  }

  /**
   * Assign values from User into form group.
   * @param user User you want to use in form group.
   */
  private patchValue(user: User): void {
    this.fgUser.patchValue({
      id: user.id,
      username: user.username,
      role: user.roles[0].id
    });
  }

}
