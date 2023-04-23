import { Component } from '@angular/core';
import { ItemService, PurchaseService } from '@services/core';
import { Item, Purchase } from '@models/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddItemComponent } from '@shared/.';
import { FormControl } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { NotificationService } from '@services/notifications';
import { Store } from '@ngrx/store';
import * as ItemActions from '../../../store/item.actions';
import { LoginService } from '@services/security';
import { CommonIndexComponent } from '@shared/common/common-index/common-index.component';

/**
 * This component show all items in a table.
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends CommonIndexComponent<Item> {

  inputSearch: FormControl;

  constructor(
      private store: Store<Item>,
      private itemService: ItemService,
      private purchaseService: PurchaseService,
      private matDialog: MatDialog,
      private clipService: ClipboardService,
      private loginService: LoginService,
      private notificationService: NotificationService
  ) {
    super(itemService);
    this.configureInputSearch();
  }

  get displayedColumns(): string[] {
    return [
      '#',
      'name',
      'quantity',
      'price-sale',
      'price-purchase',
      'category',
      'status',
      'options'
    ];
  }

  /**
   * Open mat dialog when click on add inventory.
   * @param item Item you want to add stock.
   */
  openMatDialog(item: Item): void {
    this.matDialog.open(DialogAddItemComponent, {
      width: '400px',
      data: {
        id: item.id,
        pricePurchase: item.pricePurchase
      }
    }).afterClosed().subscribe(result => {
      this.onAfterCloseMatDialog(result, item);
    });
  }

  /**
   * This method is called when dialog is closed, if result is not false sent request to creare purchase.
   * @param result Result from mat dialog.
   * @param item Item you want to add stock.
   */
  private onAfterCloseMatDialog(result: Purchase, item: Item): void {
    if (result) {
      this.purchaseService.create(result, 'Se ha registrado la compra').subscribe((purchase: Purchase) => {
        item.quantity += purchase.items[0].quantity;
      });
    }
  }

  /**
   * Configure input for search items in mat table.
   */
  private configureInputSearch(): void {
    this.inputSearch = new FormControl([undefined]);
    this.inputSearch.valueChanges.subscribe(value => {
      this.dataSource.data = value
          ? (this.indexData as Item[]).filter(i => JSON.stringify(i).toLowerCase().includes(value.toLowerCase()))
          : this.indexData;
    });
  }

  /**
   * Check if current user is admin.
   */
  get isAdmin(): boolean {
    const storageService = this.loginService.storageService;
    return storageService.getCurrentUser().roles.includes('ROLE_ADMIN');
  }

  /**
   * Copy ID from item in mat table when you click on copy ID.
   * @param id ID you want to copy
   */
  copyID(id: number): void {
    this.clipService.copyFromContent(id.toString());
    this.notificationService.success('Ha copiado el ID del producto');
  }

  /**
   * This method is called when you click on see history and save an item
   * in store to be reusable in history view.
   * @param item Item you want to see its history
   */
  onClickHistory(item: Item): void {
    // localStorage.setItem('item', JSON.stringify(item));
    this.store.dispatch(new ItemActions.AddItem(item));
  }

}
