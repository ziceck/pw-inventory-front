import { Component, OnInit } from '@angular/core';
import { Item } from '@models/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemOutputService } from '@services/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorStateMatcherService } from '@services/error';
import { NotificationService } from '@services/notifications';

/**
 * This component shows a form to create an item output.
 */
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ErrorStateMatcherService]
})
export class CreateComponent implements OnInit {

  item: Item;
  fgItemOutput: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      public errorStateMatcher: ErrorStateMatcherService,
      private activatedRoute: ActivatedRoute,
      private itemOutputService: ItemOutputService,
      private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * This method is called when an item is found in app-search and assign that item to item
   * @param item Item founded in app-search.
   */
  onItem(item: Item): void {
    this.item = item;
    this.configureFgItemOutput();
  }

  /**
   * Configure the form group for this view.
   */
  private configureFgItemOutput(): void {
    this.fgItemOutput = this.formBuilder.group({
      id: [undefined],
      item: [this.item.id],
      quantity: [undefined, [Validators.required, Validators.min(1), Validators.max(this.item.quantity)]],
      description: [undefined]
    });
  }

  /**
   * Redirect to index of item outputs.
   */
  private redirectIndex(): void {
    this.router.navigate(['.'], {relativeTo: this.activatedRoute.parent}).then();
  }

  /**
   * Send a request with form value about item output.
   */
  onSubmit(): void {
    if (this.fgItemOutput.valid) {
      this.itemOutputService.create(
          this.fgItemOutput.value, 'Se ha registrado la baja del producto'
      ).subscribe(() => {
        this.redirectIndex();
      });
    } else {
      this.notificationService.error('El formulario tiene errores');
    }
  }

}
