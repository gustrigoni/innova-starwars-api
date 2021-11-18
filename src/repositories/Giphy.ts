import axios from "axios";
export class Giphy {

  constructor() { }

  /**
   * Method to a random gif link by keyword
   * @returns string | null
   */
  async getData(name: string) {

    // get data from the environment
    const {
      GIPHY_API_KEY,
      LIMIT_GIPHY_IMG
    } = process.env;

    // image instance
    let image = null;

    // search gifs by keyword
    let { data } = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: GIPHY_API_KEY,
        limit: LIMIT_GIPHY_IMG,
        q: name,
        offset: 0,
        rating: 'r',
        lang: 'en'
      }
    });

    // replace the data variable
    [data] = [data.data];

    // check if have a result by this keyword
    if (data.length > 0) {

      // it does a random index for array between 0 and data values.
      let index = Math.floor(Math.random() * data.length);

      // define image source url
      image = data[index].images.original.url;

    }

    // return imagfe
    return image;

  }

}