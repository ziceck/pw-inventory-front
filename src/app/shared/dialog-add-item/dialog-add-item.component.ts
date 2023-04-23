import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * This component shows a dialog to add a stock.
 */
@Component({
  selector: 'app-dialog-add-item',
  templateUrl: './dialog-add-item.component.html',
  styleUrls: ['./dialog-add-item.component.css']
})
export class DialogAddItemComponent implements OnInit {

  fgPurchase: FormGroup;
  fgItemPurchase: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<DialogAddItemComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder
  ) {
    this.configureFgPurchase();
    this.configureFgItemPurchase();
    (this.fgPurchase.get('items') as FormArray).push(this.fgItemPurchase);
  }

  ngOnInit(): void {
  }

  /**
   * Configure the form group to add stock.
   */
  private configureFgPurchase(): void {
    this.fgPurchase = this.formBuilder.group({
      id: [undefined],
      description: [undefined],
      items: new FormArray([])
    });
  }

  /**
   * Create a form group for ItemPurchase.
   */
  private configureFgItemPurchase(): void {
    this.fgItemPurchase = this.formBuilder.group({
      id: [undefined],
      item: [this.data.id],
      purchase: [undefined],
      quantity: [undefined, [Validators.required, Validators.min(1)]],
      price: ['----------', [Validators.required]]
    });
    this.quantityChange();
  }

  /**
   * Subscribe to quantity control to know when its value changes.
   */
  private quantityChange(): void {
    this.fgItemPurchase.get('quantity').valueChanges.subscribe(value => {
      if (value >= 1) {
        this.fgItemPurchase.patchValue({price: this.data.pricePurchase * value});
      } else {
        this.fgItemPurchase.patchValue({price: '----------'});
      }
    });
  }

  /**
   * This method is called when you click on save button, and send the form value
   * when you close the dialog.
   */
  onSubmit(): void {
    this.dialogRef.close(this.fgPurchase.value);
  }

}
