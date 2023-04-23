import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * This component shows a dialog to add a category.
 */
@Component({
  selector: 'app-dialog-add-category',
  templateUrl: './dialog-add-category.component.html',
  styleUrls: ['./dialog-add-category.component.css']
})
export class DialogAddCategoryComponent implements OnInit {

  fgCategory: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<DialogAddCategoryComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder
  ) {
    this.configureFormGroupCategory();
  }

  ngOnInit(): void {
  }

  /**
   * Configure the form group for a category.
   */
  private configureFormGroupCategory(): void {
    const category = this.data.category;
    this.fgCategory = this.formBuilder.group({
      id: [category?.id],
      name: [category?.name]
    });
  }

  /**
   * This method is called when you click on save, and send the form group value
   * when close dialog.
   */
  onSubmit(): void {
    this.dialogRef.close(this.fgCategory.value);
  }

}
