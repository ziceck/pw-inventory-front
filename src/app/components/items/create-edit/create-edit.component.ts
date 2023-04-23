import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '@services/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@services/notifications';
import { Store } from '@ngrx/store';
import * as ItemActions from '../../../store/item.actions';
import { ErrorStateMatcherService } from '@services/error';
import { CanComponentDeactivate } from '@guards/.';

/**
 * This component shows a form to create or edit an item.
 */
@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css'],
  providers: [ErrorStateMatcherService]
})
export class CreateEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  fgItem: FormGroup;
  title: string;
  submitted: boolean;

  constructor(
      private store: Store<any>,
      private formBuilder: FormBuilder,
      private itemService: ItemService,
      private notificationService: NotificationService,
      private activatedRoute: ActivatedRoute,
      public errorStateMatcher: ErrorStateMatcherService,
      private router: Router
  ) {
    this.configureFgItem();
    // this.store.select('item').subscribe(state => this.fgItem.patchValue(state[0]));
  }

  ngOnInit(): void {
    this.createOrEdit();
  }

  /**
   * Check if any control has value.
   */
  canDeactivate(): boolean {
    return !Object.keys(this.fgItem.controls).some(key => {
      if (this.fgItem.get(key) instanceof FormControl) {
        return !!this.fgItem.get(key).value;
      } else {
        return !!this.fgItem.get(key).get('id').value;
      }
    }) || this.submitted;
  }

  /**
   * Configure form group for item.
   */
  private configureFgItem(): void {
    this.fgItem = this.formBuilder.group({
      id: [undefined],
      name: [undefined, Validators.required],
      quantity: [0 /*, Validators.required*/],
      priceSale: [undefined, [Validators.required, Validators.min(0)]],
      pricePurchase: [undefined, [Validators.required, Validators.min(0)]],
      minimum: [undefined, [Validators.required, Validators.min(0)]],
      category: this.formBuilder.group({
        id: [undefined, Validators.required]
      }),
      brand: this.formBuilder.group({
        id: [undefined]
      }),
      /*user: [undefined],
      dateCreated: [undefined],*/
      barcode: [undefined]
    });
  }

  /**
   * Create a form group for photo to add it in fgItem.
   */
  private createFgPhoto(): FormGroup {
    return this.formBuilder.group({
      id: [undefined]
    });
  }

  /* Prevent page reloading */

  /* @HostListener('window:beforeunload', ['$event'])
  canReload(e): void {
    if (!this.canDeactivate()) {
      e.returnValue = true;
    }
  } */

  /**
   * This method is called when you click on save button.
   * If item is new send create request else send update request.
   */
  onSubmit(): void {
    if (this.fgItem.valid) {
      const item = this.fgItem.value;
      const request = item.id ? this.itemService.update(
          item, 'Se ha actualizado el producto'
      ) : this.itemService.create(
          item, 'Se ha registrado el producto'
      );
      request.subscribe(
          () => this.submitted = true,
          () => {
          },
          () => this.redirectIndex()
      );
    } else {
      this.notificationService.error('El formulario es incorrecto');
      this.fgItem.markAllAsTouched();
    }
  }

  /*handle(event: ScanDetected): void {
    // this.input.nativeElement.value = event.barcode;
    this.fgItem.get('barcode').setValue(event.barcode);
  }*/

  /**
   * Check if view is for create or edit item.
   */
  private createOrEdit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.title = id ? 'Editar Producto' : 'Registrar Producto';
    if (id) {
      this.getItem(+id);
    }
  }

  /**
   * Get item you want to edit.
   * @param itemId ID item you want to edit.
   */
  private getItem(itemId: number): void {
    this.itemService.show(itemId).subscribe(item => {
      if (item.photo) {
        this.fgItem.addControl('photo', this.createFgPhoto());
      }
      this.fgItem.patchValue(item);
    });
  }

  /**
   * Redirect to index of items.
   */
  private redirectIndex(): void {
    this.router.navigate(['.'], {relativeTo: this.activatedRoute.parent}).then();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ItemActions.AddItem(this.fgItem.value));
  }

  /**
   * This method is called when photo was sent saved in back end.
   * @param id ID of photo saved in back end.
   */
  onSendPhoto(id: number): void {
    if (!this.fgItem.get('photo')) {
      this.fgItem.addControl('photo', this.createFgPhoto());
    }
    this.fgItem.patchValue({photo: {id}});
  }

}
