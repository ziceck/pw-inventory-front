import { Component, OnInit } from '@angular/core';

/**
 * This component is used to show a message when there is no data
 */
@Component({
  selector: 'app-no-records',
  templateUrl: './no-records.component.html',
  styleUrls: ['./no-records.component.css']
})
export class NoRecordsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
