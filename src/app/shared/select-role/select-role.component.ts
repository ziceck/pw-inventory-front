import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { RoleService } from '@services/security/role.service';
import { Role } from '@models/security';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

export const VALUE_ACCESSOR_ROLE = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectRoleComponent),
  multi: true
};

/**
 * This component is used to load all roles into a select component.
 */
@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.css'],
  providers: [VALUE_ACCESSOR_ROLE]
})
export class SelectRoleComponent implements OnInit, ControlValueAccessor {

  @Input()
  formControl: FormControl;
  @Input()
  required: boolean;
  roles: Role[];
  value: number;
  isDisabled: boolean;
  onChange = (_: any) => {
  }
  onTouched = () => {
  }

  constructor(
      private roleService: RoleService
  ) {
    this.roles = [];
  }

  ngOnInit(): void {
    this.getRoles();
  }

  /**
   * Get all roles from API.
   */
  private getRoles(): void {
    this.roleService.index().subscribe(roles => this.roles = roles);
  }

  /**
   * This method is called from selectionChange in mat-option.
   * @param event Event from selectionChange.
   */
  onSelectionChange(event: any): void {
    this.value = event.source.value;
    this.onTouched();
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
  }

}
