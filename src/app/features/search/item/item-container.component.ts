import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { OverlayService, createOverlayParams } from './../../../services/overlay.service';
import { MoviesService } from './../../../services/movies.service';
import { ItemComponent } from './item.component';
import { Movie } from './../../../models/movie.interface';

@Component({
  selector: 'app-item-container',
  template: ``,
  styleUrls: ['./item.component.scss']
})
export class ItemContainerComponent implements OnInit {

  constructor(
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private router: Router,
    private snack: MatSnackBar
  ){ }

  ngOnInit() {
    this.route.paramMap.pipe(first()).subscribe(params => {
      const movieId = params.get('Id');
      if (!movieId) {
        this.snack.open('Error:', 'Looks like this movie is not filmed yet :P', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        return;
      }
      this.movieService.getMovieDetails(movieId).subscribe(
        movie => {
          this.showMovie(movie);
        }
      )
    });
    
  }

  showMovie(movie: Movie) {
    const config: createOverlayParams = {
      component: ItemComponent,
      instanceData: {movie},
      instanceMethods: {
        closeCb: () => { this.router.navigate(['/search']) }
      }
    }
    this.overlayService.createOverlay(config);
  }

}
