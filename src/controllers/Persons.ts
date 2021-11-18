import { Request, Response } from "express";
import { SWAPI } from "../repositories/SWAPI";

export class Persons {

  constructor() { }

  // method to handle the request
  async getData(
    { params, query }: Request,
    response: Response,
  ) {

    // instance SWAPI repository
    const swapi = new SWAPI();

    // get properties from params
    const { name } = params;

    // get persons data
    const data = await swapi.getData(name, query.page as string);

    // request response
    return response.json(data);

  }

}