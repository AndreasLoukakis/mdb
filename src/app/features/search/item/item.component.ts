import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoviesService } from './../../../services/movies.service';
import { Movie } from './../../../models/movie.interface';

@Component({
  selector: 'app-item-container',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() movie: Movie;
  @Output() close: EventEmitter<string> = new EventEmitter();

  myRating: string;
  ratingOptions = [
    {value: 1, label: 'One star'},
    {value: 2, label: 'Two stars'},
    {value: 3, label: 'Three stars'},
    {value: 4, label: 'Four stars'},
    {value: 5, label: 'Five stars'},
    {value: 6, label: 'Six stars'},
    {value: 7, label: 'Seven stars'},
    {value: 8, label: 'Eight stars'},
    {value: 9, label: 'Nine stars'},
    {value: 10, label: 'Ten stars'},
  ]
  
  constructor(
    private movieService: MoviesService,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {

  }

  closeEditor() {
    this.close.emit();
  }

  castVote() {
    console.log('reted ', this.myRating)
    this.movieService.rateMovie(this.movie.id, this.myRating).pipe(take(1)).subscribe(
      response => {
        this.myRating = null;
        this.snack.open('Vote casted:', response.status_message, {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    )
  }

}
