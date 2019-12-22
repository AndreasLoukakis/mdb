import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, mergeMap } from 'rxjs/operators';

import { MovieResult } from './../models/movie-result.interface';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiURL = 'https://api.themoviedb.org/3';
  private default_params = new HttpParams();
  private guest_session_id: string = null;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar
  ) {
    this.default_params = this.default_params.append('api_key', '85204a8cc33baf447559fb6d51b18313');
    this.default_params = this.default_params.append('language', 'el_GR');
  }


  // add paging
  searchMovies(str: string, page: number): Observable<MovieResult> {
    const searchParams = this.default_params
      .append('query', str).append('page', String(page))
      .append('include_adult', 'false');
    return this.http.get<MovieResult>(`${this.apiURL}/search/movie/`, { params: searchParams }).pipe(
      catchError(this.errorNotify)
    )
  }

  getMovieDetails(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiURL}/movie/${movieId}`, { params: this.default_params }).pipe(
      catchError(this.errorNotify.bind(this))
    );
  }

  rateMovie(movieId: string, rating: string): Observable<RateResponse> {
    const url = `${this.apiURL}/movie/${movieId}/rating`;
    if (this.guest_session_id === null) {
      return this.getGuestSession().pipe(
        mergeMap(response => {
          const searchParams = this.default_params
            .append('guest_session_id', response.guest_session_id)
          return this.http.post<RateResponse>(url, { value: rating }, { params: searchParams })
        }),
        catchError(this.errorNotify.bind(this))
      )
    };
    const searchParams = this.default_params
      .append('guest_session_id', this.guest_session_id)
    return this.http.post<RateResponse>(url, {value: rating}, { params: searchParams }).pipe(
      catchError(this.errorNotify.bind(this))
    );
  }

  getGuestSession() {
    return this.http.get<SessionResponse>(`${this.apiURL}/authentication/guest_session/new`, { params: this.default_params }).pipe(
      tap(response => this.guest_session_id = response.guest_session_id)
    )
  }

  errorNotify(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
    } else {
        errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;
    }
    const smallMessage = errorMessage.substr(0, 50).padEnd(53, '.');
    this.snack.open('Error:', smallMessage, {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    return throwError(errorMessage);
  }

}

export interface RateResponse { status_code: number, status_message: string }
export interface SessionResponse { success: boolean, guest_session_id: string, expires_at: string }