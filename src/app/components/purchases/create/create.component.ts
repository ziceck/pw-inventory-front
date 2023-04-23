import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '@services/core';
import { Item } from '@models/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@services/notifications';
import { BehaviorSubject } from 'rxjs';

/**
 * This component is used to create a new purchase.
 */
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  fgPurchase: FormGroup;
  displayedColumns: string[];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);

  constructor(
      private formBuilder: FormBuilder,
      private purchaseService: PurchaseService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private notificationService: NotificationService
  ) {
    this.configureFgPurchase();
    this.configureDisplayedColumns();
  }

  ngOnInit(): void {
  }

  /**
   * Configure form group for purchase.
   */
  private configureFgPurchase(): void {
    this.fgPurchase = this.formBuilder.group({
      id: [undefined],
      description: ['Compra'],
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
   * This method is called when an item is found in app-search and call
   * addItem method.
   */
  onItem(item: Item): void {
    const previous: AbstractControl = this.items.controls.find(i => i.get('item').get('id').value === item.id);
    this.addItem(previous, item);
  }

  /**
   * Create a form group for ItemPurchase.
   */
  private createFgItemPurchase(item: Item): FormGroup {
    const formGroup = this.formBuilder.group({
      id: [undefined],
      item: this.formBuilder.group({
        id: [item.id],
        name: [item.name],
        pricePurchase: [item.pricePurchase]
      }),
      purchase: [undefined],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [item.pricePurchase, [Validators.required, Validators.min(0)]]
    });
    formGroup.get('quantity').valueChanges.subscribe(quantity => {
      formGroup.patchValue({price: quantity * formGroup.get('item').get('pricePurchase').value});
    });
    return formGroup;
  }

  /**
   * This method is a short way to access to items in fgPurchase.
   */
  get items(): FormArray {
    return this.fgPurchase.get('items') as FormArray;
  }

  /**
   * Add an item in purchase, if item exists increase quantity, else add the new item.
   */
  private addItem(previous: AbstractControl, item: Item): void {
    if (previous) {
      previous.patchValue({
        quantity: previous.get('quantity').value + 1,
        price: previous.get('price').value + item.pricePurchase
      });
    } else {
      this.items.push(this.createFgItemPurchase(item));
    }
    this.updateDataSource();
  }

  /**
   * If form is valid send a request to create a purchase, else show an error notification.
   */
  onSubmit(): void {
    if (this.items.valid) {
      this.purchaseService.create(this.fgPurchase.value).subscribe(() => this.redirectIndex());
    } else {
      this.notificationService.error('El formulario tiene errores');
    }
  }

  /**
   * Redirect to index of purchases.
   */
  private redirectIndex(): void {
    this.router.navigate(['.'], {relativeTo: this.activatedRoute.parent}).then();
  }

  /**
   * This method is called when you click on delete option, and remove
   * the item from the form array, also call update source to refresh the view.
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

}
