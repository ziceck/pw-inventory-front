import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '@services/core';
import { FormBuilder } from '@angular/forms';
import { Category } from '@models/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCategoryComponent } from '@shared/.';
import { MatSort } from '@angular/material/sort';
import { overrideSortingDataAccessor } from '@helpers/.';

/**
 * This component show all categories in a table.
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  categories: Category[];
  displayedColumns: string[];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  dataSource = new MatTableDataSource<Category>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(
      private formBuilder: FormBuilder,
      private categoryService: CategoryService,
      private matDialog: MatDialog
  ) {
    this.configureDisplayedColumns();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Init paginator and sort for mat table.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Configure displayed columns in mat table.
   */
  private configureDisplayedColumns(): void {
    this.displayedColumns = [
      '#',
      'name',
      'total-items',
      'options'
    ];
  }

  /**
   * Get categories from API and load in data source.
   */
  private getCategories(): void {
    this.categoryService.index().subscribe(categories => {
      this.categories = categories;
      this.dataSource.data = categories;
      overrideSortingDataAccessor(this.dataSource);
    });
  }

  /**
   * This method is called when you click in add category button.
   */
  onAddCategory(): void {
    this.openMatDialog();
  }

  /**
   * Open a mat dialog when you edit or add a category and call other function when dialog is closed.
   * @param category Category you want to edit.
   */
  openMatDialog(category?: Category): void {
    this.matDialog.open(DialogAddCategoryComponent, {
      width: '500px',
      data: {
        category
      }
    }).afterClosed().subscribe(result => {
      this.onAfterCloseMatDialog(category, result);
    });
  }

  /**
   * This method is called when a dialog is closed, check if request to send is update or crate.
   * @param category Category you have added or edited.
   * @param result Result of the dialog, save or cancel.
   */
  private onAfterCloseMatDialog(category: Category, result: any): void {
    if (result) {
      const update = !!result.id;
      const request = update ? this.categoryService.update(
          result, 'Se ha actualizado la categoría'
      ) : this.categoryService.create(
          result, 'Se ha registrado la categoría'
      );
      request.subscribe(cat => {
        if (update) {
          category.name = cat.name;
        } else {
          this.categories.push(cat);
          this.dataSource.data = this.categories;
        }
      });
    }
  }

  /**
   * Delete a category using the API, also remove the category from view.
   * @param category Category you want to delete.
   * @param index Index in mat table where category is.
   */
  onDeleteCategory(category: Category, index: number): void {
    this.categoryService.delete(category.id, 'Se ha eliminado la categoría').subscribe(() => {
      this.categories.splice(index, 1);
      this.dataSource.data = this.categories;
    });
  }

  /**
   * This method is called when you click on edit category.
   * @param category Category you want to edit.
   */
  onEditCategory(category: Category): void {
    this.openMatDialog(category);
  }

}
