import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  readonly title = 'Inventario';

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.setTitle();
  }

  private setTitle(): void {
    this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route?.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route?.outlet === 'primary'),
        mergeMap((route) => route?.data)
    ).subscribe((event) => this.titleService.setTitle(event.title + ' - ' + this.title));
  }

}
