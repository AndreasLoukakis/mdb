import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  MDB = 'MDB_COLLECTIONS';
  constructor() { }

  getCollections() {
    if (localStorage.getItem(this.MDB) === null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem(this.MDB));
    }
  }

  addNewCollection(title: string, description: string) {
    if (localStorage.getItem(this.MDB) === null) {
      localStorage.setItem(this.MDB, JSON.stringify([{title, description, movies: []}]));
    } else {
      const updated = JSON.parse(localStorage.getItem(this.MDB)).push({ title, description, movies: [] });
      localStorage.setItem(this.MDB, JSON.stringify(updated));
    }
  }

  removeCollection(title: string) {
    if (localStorage.getItem(this.MDB) === null) return;

    const updated = JSON.parse(localStorage.getItem(this.MDB)).filter(collection => collection.title !== title);
    localStorage.setItem(this.MDB, JSON.stringify(updated));
  }

  addMovieToCollection(collectionTitle, movieId) {
    const updated = JSON.parse(localStorage.getItem(this.MDB)).map(collection => {
      if (collection.title === collectionTitle) {
        collection.movies.push(movieId);
      }
    });
    localStorage.setItem(this.MDB, JSON.stringify(updated));
  }

  removeMovieFromCollection(collectionTitle, movieId) {
    const updated = JSON.parse(localStorage.getItem(this.MDB)).map(collection => {
      if (collection.title === collectionTitle) {
        collection.movies = collection.movies.filter(movie => movie.id !== movieId)
      }
    });
    localStorage.setItem(this.MDB, JSON.stringify(updated));
  }
}
