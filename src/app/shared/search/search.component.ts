import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from '@services/core';
import { Item } from '@models/core';
import { Subscription } from 'rxjs';

/**
 * This component is used to search an item by barcode, ID or name.
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  fgSearch: FormGroup;
  @Output()
  item = new EventEmitter<Item>();
  filteredOptions: Item[];
  subscription: Subscription;

  constructor(
      private formBuilder: FormBuilder,
      private itemService: ItemService
  ) {
    this.configureFgSearch();
    this.filteredOptions = [];
  }

  ngOnInit(): void {
    this.subscribeChangesCode();
  }

  /**
   * This method is used to subscribe to changes in search code.
   */
  private subscribeChangesCode(): void {
    this.fgSearch.get('code').valueChanges.subscribe(value => {
      if (value === 3) {
        this.onSearchChange();
      } else {
        this.subscription?.unsubscribe();
      }
    });
  }

  /**
   * Then search input.
   */
  clearInputSearch(): void {
    this.fgSearch.get('search').patchValue(undefined);
  }

  /**
   * Configure form group for a search.
   */
  private configureFgSearch(): void {
    this.fgSearch = this.formBuilder.group({
      code: [1],
      search: [undefined]
    });
  }

  /**
   * This method is called when you click o search button and send a request
   * to find the item by barcode or by ID.
   */
  onSubmit(): void {
    const search = this.fgSearch.get('search').value;
    const request = this.fgSearch.get('code').value === 1
        ? this.itemService.showByBarcode(search)
        : this.itemService.show(search);
    request.subscribe(item => {
      this.emitAndClean(item);
    });
  }

  /**
   * When item is found send the item to the parent component and clean the input search.
   * @param item Item found from back end.
   */
  private emitAndClean(item: Item): void {
    this.item.emit(item);
    this.fgSearch.patchValue({search: undefined});
  }

  /**
   * This method is used to send a request to find all item that match with a name in search input.
   */
  private onSearchChange(): void {
    this.subscription = this.fgSearch.get('search').valueChanges.subscribe(value => {
      this.itemService.findByName(value).subscribe(items => this.filteredOptions = items);
    });
  }

  /**
   * This method is called when you click in a mat option and send the item to the parent component.
   * @param itemSelected Item selected in a mat auto complete.
   */
  onClickOption(itemSelected: Item): void {
    this.emitAndClean(itemSelected);
  }

}
