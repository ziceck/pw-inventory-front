import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Brand } from '@models/core/brand.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { BrandService } from '@services/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddBrandComponent } from '@shared/dialog-add-brand/dialog-add-brand.component';

/**
 * This component show all brands in a table.
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  brands: Brand[];
  displayedColumns: string[];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  dataSource = new MatTableDataSource<Brand>();

  constructor(
      private formBuilder: FormBuilder,
      private brandService: BrandService,
      private matDialog: MatDialog
  ) {
    this.configureDisplayedColumns();
  }

  ngOnInit(): void {
    this.getBrands();
  }

  /**
   * Init paginator and sort for mat table.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Configure displayed columns in mat table.
   */
  private configureDisplayedColumns(): void {
    this.displayedColumns = [
      '#',
      'name',
      'options'
    ];
  }

  /**
   * Get brands from API and load it dats source
   */
  private getBrands(): void {
    this.brandService.index().subscribe(brands => {
      this.brands = brands;
      this.dataSource.data = brands;
    });
  }

  /**
   * This method is called when you click in add brand button.
   */
  onAddBrand(): void {
    this.openMatDialog();
  }

  /**
   * Open a mat dialog when you edit or add a category and call other function when dialog is closed.
   * @param brand Brand you want to edit.
   */
  openMatDialog(brand?: Brand): void {
    this.matDialog.open(DialogAddBrandComponent, {
      width: '500px',
      data: {
        brand
      }
    }).afterClosed().subscribe(result => {
      this.onAfterCloseMatDialog(brand, result);
    });
  }

  /**
   * This method is called when a dialog is closed, check if request to send is create or update.
   * @param brand Brand you have added or edited.
   * @param result Result of the dialog when you click cancel or save.
   */
  private onAfterCloseMatDialog(brand: Brand, result: any): void {
    if (result) {
      const update = !!result.id;
      const request = update ? this.brandService.update(
          result, 'Se ha actualizado la marca'
      ) : this.brandService.create(
          result, 'Se ha registrado la marca'
      );
      request.subscribe(bran => {
        if (update) {
          brand.name = bran.name;
        } else {
          this.brands.push(bran);
          this.dataSource.data = this.brands;
        }
      });
    }
  }

  /**
   * Delete a brand using the API, also remove the brand from view.
   * @param brand Brand you want to delete.
   * @param index Index in mat table where brand is.
   */
  onDeleteBrand(brand: Brand, index: number): void {
    this.brandService.delete(brand.id, 'Se ha eliminado la marca').subscribe(() => {
      this.brands.splice(index, 1);
      this.dataSource.data = this.brands;
    });
  }

  /**
   * This method is called when you click on edit brand and open a dialog to edit a brand.
   * @param brand Brand you want to edit.
   */
  onEditBrand(brand: Brand): void {
    this.openMatDialog(brand);
  }

}
