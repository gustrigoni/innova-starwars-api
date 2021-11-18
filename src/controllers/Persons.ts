import { Request, Response } from "express";

export class Persons {

  constructor() { }

  // method to handle the request
  async getData({ params }: Request, res: Response) {

    res.json({
      name: params.name,
      key: process.env.GIPHY_API_KEY,
    });

  }

}