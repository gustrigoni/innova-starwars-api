import axios from "axios";
import { movies as movieInstance } from "./../routes"
import { Giphy } from "./Giphy";
export interface Movie {
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
  films: string[];
  image: string;
}

export interface GiphyGif {
  id: string;
  url: string;
}

export class SWAPI {

  constructor() { }

  /**
   * Get movies from SWAPI by url list
   * @param movies 
   */
  async getMovies(
    moviesUrl: string[] = [],
  ) {

    // define variable to concat movie data
    let movies: Movie[] = [];

    // loop the movies
    for (let i = 0; i < moviesUrl.length; i++) {

      // define movie url by index
      const url: string = moviesUrl[i];

      // try to find movie cached
      let movie = movieInstance.cachedMovies.find((m: Movie) => m.url === url);

      // check if movie is cached
      if (movie) {

        // add movie data to array
        movies = movies.concat({
          name: movie.name,
          url: movie.url,
          releaseDate: movie.releaseDate,
          description: movie.description
        });

        // continue the loop flow
        continue;

      }

      // get movie data from url
      const { data } = await axios.get(url);

      // define movie data
      movie = {
        name: data.title,
        url,
        releaseDate: data.release_date,
        description: data.opening_crawl
      }

      // add movie data to array
      movies = movies.concat(movie);

      // add to cache
      movieInstance.cachedMovies.push(movie);

    }

    // return array with movies data
    return movies;

  }

  /**
   * Method to a random gif link by keyword
   * @returns string | null
   */
  async getPerson(
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

      let gif = await giphy.getData(person.name) as string;

      // add person data to array
      persons = persons.concat({
        name: person.name,
        birth: person.birth_year,
        gender: person.gender,
        eyeColor: person.eye_color,
        films: person.films,
        image: gif,
      });

    }

    // return person data
    return {
      total: data.count,
      pagination: {
        next: data.next ? true : false,
        previous: data.previous ? true : false
      },
      persons
    }

  }

}