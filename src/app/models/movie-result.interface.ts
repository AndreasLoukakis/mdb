import { Movie } from './movie.interface';

export interface MovieResult {
    page?: number;
    results: Movie[];
    total_results?: number;
    total_pages?: number;
}