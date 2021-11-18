import axios from "axios";
import { Giphy } from "./Giphy";

interface Movie {
  name: string;
  url?: string;
  releaseDate: string;
  description: string;
}

interface Person {
  name: string;
  birth: string;
  gender: string;
  eyeColor: string;
  image: string;
  movies: Movie[];
}

export interface GiphyGif {
  id: string;
  url: string;
}

export class SWAPI {

  private cachedMovies: Movie[] = [];
  private cachedGifs: GiphyGif[] = [];

  constructor() { }

  /**
   * Get movies from SWAPI by url list
   * @param movies 
   */
  private async getMovies(moviesUrl: string[]) {

    // define variable to concat movie data
    let movies: Movie[] = [];

    // loop the movies
    for (let i = 0; i < moviesUrl.length; i++) {

      // define movie url by index
      const url: string = moviesUrl[i];

      // if this movie was cached continue the loop flow
      if (this.cachedMovies.find((m: Movie) => m.url === url)) continue;

      // get movie data from url
      const { data } = await axios.get(url);

      // define movie data
      const movie = {
        name: data.title,
        url,
        releaseDate: data.release_date,
        description: data.opening_crawl
      }

      // add movie data to array
      movies = movies.concat(movie);

      // add to cache
      this.cachedMovies.push(movie);

    }

    // return array with movies data
    return movies;

  }

  /**
   * Method to a random gif link by keyword
   * @returns string | null
   */
  async getData(
    name?: string,
    page?: string
  ) {

    // intance Giphy repository
    const giphy = new Giphy();

    // search gifs by keyword
    const { data } = await axios.get('https://swapi.dev/api/people/', {
      params: {
        search: name,
        page
      }
    });

    // list of persons from Star Wars
    let persons = <Person[]>[];

    // loop results from api
    for (let i = 0; i < data.results.length; i++) {

      // define person by array index
      const person = data.results[i];

      // get movies data
      const movies = await this.getMovies(person.films);

      let gif = this.cachedGifs.find((g: GiphyGif) => g.id === person.name)?.url;

      if (!gif) {

        // get gif image from Giphy API by person name
        gif = await giphy.getData(person.name) as string;

        // add to cache
        this.cachedGifs.push({
          id: person.name,
          url: gif
        });

      }

      // add person data to array
      persons = persons.concat({
        name: person.name,
        birth: person.birth_year,
        gender: person.gender,
        eyeColor: person.eye_color,
        image: gif,
        movies,
      });

    }

    // return person data
    return {
      total: data.count,
      pagination: {
        next: data.next,
        previous: data.previous
      },
      persons
    }

  }

}