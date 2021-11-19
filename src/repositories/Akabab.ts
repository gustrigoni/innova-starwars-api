import axios from "axios";

interface PersonAPI {
  name: string;
}

export class Akabab {

  constructor() { }

  /**
   * Method to a random gif link by keyword
   * @returns string | null
   */
  async getData(name: string) {

    // image instance
    let image = null;

    // search gifs by keyword
    let { data } = await axios.get('https://akabab.github.io/starwars-api/api/all.json');

    // find person image by name
    const akababImg = data.find((person: PersonAPI) => person.name === name);

    // check if exists a person with this name in the API
    if (akababImg) {

      // define the image
      image = akababImg.image;

    }

    // return imagfe
    return image;

  }

}