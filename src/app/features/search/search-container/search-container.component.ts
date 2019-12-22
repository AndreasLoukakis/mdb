import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MoviesService } from './../../../services/movies.service';
import { Movie } from './../../../models/movie.interface';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements AfterViewInit, OnDestroy {

  tableData : MatTableDataSource<Movie> = new MatTableDataSource();
  displayedColumns: string[] = ['poster_path', 'title', 'vote_average'];
  searchString: string;
  currentSearchString: string;
  searching: boolean = false;
  resultsLength = 0;

  subs: Subscription[] = [];
  
  @ViewChild('searchForm', { static: true }) form: any;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private movieService: MoviesService) {
    this.tableData.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.subs.push(
      this.paginator.page.subscribe(
        pageData => this.search(null, ++pageData.pageIndex)
      )
    )
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }

  search(e, page = 1) {
    this.searching = true;
    this.movieService.searchMovies(this.searchString, page).pipe(
      take(1),
      catchError(error => {
        this.searching = false;
        return throwError(error);
      })
    ).subscribe(
      (data) => {
        this.resultsLength = data.total_results;
        this.tableData.data = data.results;
        this.paginator.pageIndex = --page;
        this.searching = false;
      }
    );
  }

}
