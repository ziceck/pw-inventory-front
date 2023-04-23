import { Component, OnInit } from '@angular/core';
import { SaleService } from '@services/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '@models/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@services/notifications';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogSaleComponent } from '@shared/dialog-sale/dialog-sale.component';
import { Ticket } from '@models/reports';
import { ErrorStateMatcherService } from '@services/error';

/**
 * This component is used to create a sale.
 */
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ErrorStateMatcherService]
})
export class CreateComponent implements OnInit {

  fgSale: FormGroup;
  displayedColumns: string[];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);

  constructor(
      private formBuilder: FormBuilder,
      private saleService: SaleService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private matDialog: MatDialog,
      private notificationService: NotificationService,
      public errorStateMatcher: ErrorStateMatcherService
  ) {
    this.configureFgSale();
    this.configureDisplayedColumns();
  }

  ngOnInit(): void {
  }

  /**
   * Configure a form group for a sale.
   */
  private configureFgSale(): void {
    this.fgSale = this.formBuilder.group({
      id: [undefined],
      description: ['Venta', Validators.required],
      items: new FormArray([])
    });
  }

  /**
   * Configure displayed columns in mat table.
   */
  configureDisplayedColumns(): void {
    this.displayedColumns = ['name', 'quantity', 'price', 'options'];
  }

  /**
   * Create a form group for ItemSale.
   */
  private createFgItemSale(item: Item): FormGroup {
    const formGroup = this.formBuilder.group({
      id: [undefined],
      item: this.formBuilder.group({
        id: [item.id],
        name: [item.name],
        priceSale: [item.priceSale]
      }),
      sale: [undefined],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(item.quantity)]],
      price: [item.priceSale, [Validators.required, Validators.min(0)]]
    });
    formGroup.get('quantity').valueChanges.subscribe(quantity => {
      formGroup.patchValue({price: quantity * formGroup.get('item').get('priceSale').value});
    });
    return formGroup;
  }

  /**
   * This method is a short way to access to items of a sale.
   */
  get items(): FormArray {
    return this.fgSale.get('items') as FormArray;
  }

  /**
   * This method is called when an item is found in app-search.
   * If product has stock add it to the sale, else show a warning notification.
   */
  onItem(item: Item): void {
    if (item.quantity > 0) {
      const previous: AbstractControl = this.items.controls.find(i => i.get('item').get('id').value === item.id);
      this.addItem(previous, item);
    } else {
      this.notificationService.warning('El producto no tiene inventario');
    }
  }

  /**
   * If item already exist in sale increase the quantity, else add then item in the sale.
   */
  private addItem(previous: AbstractControl, item: Item): void {
    if (previous) {
      previous.patchValue({
        quantity: previous.get('quantity').value + 1,
        price: previous.get('price').value + item.priceSale
      });
    } else {
      this.items.push(this.createFgItemSale(item));
    }
    this.updateDataSource();
  }

  /**
   * This method is called when you click on save button.
   * If form is valid open a dialog, else show an error notification.
   */
  onSubmit(): void {
    if (this.items.valid) {
      // this.saleService.create(this.fgSale.value).subscribe(() => this.redirectIndex());
      this.openMatDialog();
    } else {
      this.notificationService.error('El formulario tiene errores');
    }
  }

  /**
   * Redirect to the index of sales.
   */
  private redirectIndex(): void {
    this.router.navigate(['.'], {relativeTo: this.activatedRoute.parent}).then();
  }

  /**
   * This method is called when you click on delete option.
   * Remove the item of the sale.
   * @param index Index of element you want to delete.
   */
  onDelete(index: number): void {
    this.items.removeAt(index);
    this.updateDataSource();
  }

  /**
   * Update datasource to refresh it in the view.
   */
  private updateDataSource(): void {
    this.dataSource.next(this.items.controls);
  }

  /**
   * This method is a short way to get the total price of all items.
   */
  get total(): number {
    return this.items.controls.reduce((a, b) => a + b.get('price').value, 0);
  }

  /**
   * Open a dialog to request cash and finalize the sale.
   */
  openMatDialog(): void {
    this.matDialog.open(DialogSaleComponent, {
      width: '400px',
      data: {
        total: this.total,
      }
    }).afterClosed().subscribe((ticket: Ticket) => {
      if (ticket) {
        this.createSale(ticket);
      }
    });
  }

  /**
   * Send a request to create a sale, also send a request to generate a ticker.
   * @param ticket Information in DialogSaleComponent.
   */
  private createSale(ticket: Ticket): void {
    this.saleService.create(this.fgSale.value, 'Se ha registrado la venta')
        .subscribe((sale) => ticket.sale = sale.id,
            () => {
            },
            () => {
              this.saleService.ticket(ticket).subscribe(
                  () => this.redirectIndex(),
                  () => this.redirectIndex(),
              );
            }
        );
  }

}
