import { Request, Response } from "express";
import { Giphy } from "../repositories/Giphy";

export class Persons {

  constructor() { }

  // method to handle the request
  async getData(
    { params }: Request,
    response: Response,
  ) {

    // intance giphy
    const giphy = new Giphy();

    // get properties from params
    const { name } = params;

    // get gif image from Giphy API by keyword name
    const gif = await giphy.getGif(name);

    // request response
    return response.json({
      name,
      key: process.env.GIPHY_API_KEY,
      gif
    });

  }

}