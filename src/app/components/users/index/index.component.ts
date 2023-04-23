import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/security';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@models/security';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../store/user.actions';

/**
 * This component show all users in a table.
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  displayedColumns: string[];
  dataSource = new MatTableDataSource<User>();

  constructor(
      private store: Store<any>,
      private userService: UserService
  ) {
    this.configureDisplayedColumns();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Configure displayed columns in mat table.
   */
  private configureDisplayedColumns(): void {
    this.displayedColumns = [
      '#',
      'user-name',
      'roles',
      'options'
    ];
  }

  /**
   * Get all sales from API and load in datasource.
   */
  private getUsers(): void {
    this.userService.index().subscribe(
        users => this.dataSource.data = users
    );
  }

  /**
   * This method is called when you click on edit icon and save a user in store to be reusable
   * in edit view.
   * @param user User you want to edit.
   */
  onClickEdit(user: User): void {
    this.store.dispatch(new UserActions.AddUser(user));
  }

}
