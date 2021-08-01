import {Component, OnInit} from '@angular/core';
import {FilterService} from './services/filter.service';
import {Filter} from './interfaces/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wiser-cat-proov-front-end';
  filters: Filter[] = [];

  constructor(
    private filterService: FilterService
  ) {
  }

  ngOnInit(): void {
    this.getAllFilters();
  }
  getAllFilters(): void {
    this.filterService.getFilters().subscribe(filter => {
      this.filters = filter;
    });
  }
}
