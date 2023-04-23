import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CategoryService } from '@services/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category } from '@models/core';

export const VALUE_ACCESSOR_CATEGORY = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectCategoryComponent),
  multi: true
};

/**
 * This component is used to load all categories into a select component.
 */
@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css'],
  providers: [VALUE_ACCESSOR_CATEGORY]
})
export class SelectCategoryComponent implements OnInit, ControlValueAccessor {

  @Input()
  formControl: FormControl;
  @Input()
  required: boolean;
  categories: Category[];
  value: number;
  isDisabled: boolean;
  onChange = (_: any) => {
  }
  onTouched = () => {
  }

  constructor(private categoryService: CategoryService) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Get all categories from API.
   */
  private getCategories(): void {
    this.categoryService.index().subscribe(categories => this.categories = categories);
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
