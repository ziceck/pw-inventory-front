import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * This dialog show a form to finish a sale.
 */
@Component({
  selector: 'app-dialog-sale',
  templateUrl: './dialog-sale.component.html',
  styleUrls: ['./dialog-sale.component.css']
})
export class DialogSaleComponent implements OnInit {

  fgFinishSale: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<DialogSaleComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder
  ) {
    this.configureFgFinishSale();
    this.fgFinishSale.get('recibido').valueChanges.subscribe(value => {
      if (value && value >= this.data.total) {
        this.fgFinishSale.patchValue({cambio: value - this.data.total});
      } else {
        this.fgFinishSale.patchValue({cambio: '----------'});
      }
    });
  }

  ngOnInit(): void {
  }

  /**
   * Configure the form group for a ticket sale.
   */
  /* TODO:Rename recibido to cash and cambio to change */
  private configureFgFinishSale(): void {
    this.fgFinishSale = this.formBuilder.group({
      total: [this.data.total],
      recibido: [undefined, [Validators.required, Validators.min(this.data.total)]],
      cambio: ['----------'],
      sale: [undefined]
    });
  }

  /**
   * This method is called when you click on save button and send the form group value when close method.
   */
  onSubmit(): void {
    this.dialogRef.close(this.fgFinishSale.value);
  }

}
