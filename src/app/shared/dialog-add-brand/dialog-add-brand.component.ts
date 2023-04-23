import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * This component shows a dialog to add a brand.
 */
@Component({
  selector: 'app-dialog-add-brand',
  templateUrl: './dialog-add-brand.component.html',
  styleUrls: ['./dialog-add-brand.component.css']
})
export class DialogAddBrandComponent implements OnInit {

  fgBrand: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<DialogAddBrandComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder
  ) {
    this.configureFormGroupBrand();
  }

  ngOnInit(): void {
  }

  /**
   * Configure the form group for a brand.
   */
  private configureFormGroupBrand(): void {
    const brand = this.data.brand;
    /* this.fgBrand = new FormGroup({
      id: new FormControl(),
      name: new FormControl()
    }); */
    this.fgBrand = this.formBuilder.group({
      id: [brand?.id],
      name: [brand?.name, [Validators.required]]
    });
  }

  /**
   * This method is called when you click on save, and send the form group value
   * when close dialog.
   */
  onSubmit(): void {
    this.dialogRef.close(this.fgBrand.value);
  }

}
