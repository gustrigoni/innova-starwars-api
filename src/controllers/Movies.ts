import { Request, Response } from "express";
import { Movie, SWAPI } from "../repositories/SWAPI";

export class Movies {

  public cachedMovies: Movie[] = [];

  // method to handle the request
  async getData(
    { query }: Request,
    response: Response,
  ) {

    // instance SWAPI repository
    const swapi = new SWAPI();

    // get properties from params
    const { url } = query;

    // get movies data
    const data = await swapi.getMovies(url as string[]);

    // request response
    return response.json(data);

  }

}