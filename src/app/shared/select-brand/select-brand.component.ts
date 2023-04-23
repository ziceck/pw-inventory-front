import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrandService } from '@services/core';
import { Brand } from '@models/core';

export const VALUE_ACCESSOR_BRAND = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectBrandComponent),
  multi: true
};

@Component({
  selector: 'app-select-brand',
  templateUrl: './select-brand.component.html',
  styleUrls: ['./select-brand.component.css'],
  providers: [VALUE_ACCESSOR_BRAND]
})
export class SelectBrandComponent implements OnInit, ControlValueAccessor {

  @Input()
  formControl: FormControl;
  @Input()
  required: boolean;
  brands: Brand[];
  value: number;
  isDisabled: boolean;
  onChange = (_: any) => {
  }
  onTouched = () => {
  }

  constructor(
      private brandService: BrandService,
  ) {
    this.brands = [];
  }

  ngOnInit(): void {
    this.getBrands();
  }

  /**
   * Get all roles from API.
   */
  private getBrands(): void {
    this.brandService.index().subscribe(brands => this.brands = brands);
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
