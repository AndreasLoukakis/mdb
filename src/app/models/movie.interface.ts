export interface Genre {
    id?: number;
    name?: string;
}
export interface Company {
    name?: string;
    id?: number;
    logo_path: string | null;
    origin_country: string;
}
export interface Country {
    iso_3166_1?: string;
    name?: string;
}
export interface Language {
    iso_639_1?: string;
    name?: string;
}
export enum MovieStatusesEnum {
    Rumored = 'Rumored',
    Planned = 'Planned',
    In_Production = 'In_Production',
    Post_Production = 'Post Production',
    Released = 'Released',
    Canceled = 'Canceled'
}
export interface Movie {
    adult?: boolean;
    backdrop_path?: string | null
    belongs_to_collection?: null | {};
    budget?: number;
    genres: Genre[];
    homepage ?: string | null;
    id: string;
    imdb_id?: string | null;
    original_language?: string;
    original_title?: string | null;
    popularity?: number;
    poster_path?: string | null;
    production_companies?: Company[];
    production_countries?: Country[];
    release_date?: string;
    revenue?: number;
    runtime?: number | null;
    spoken_languages?: Language[];
    status?: MovieStatusesEnum;
    tagline?: string | null;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;   
}