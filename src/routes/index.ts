import { Router } from "express";
import { Movies } from "../controllers/Movies";
import { Persons } from "../controllers/Persons";

// init rountes instance
const routes = Router();
export const persons = new Persons();
export const movies = new Movies();

// create route for get person data from Star Wars
routes.get('/persons', persons.getData);

// create route for get person data from Star Wars
routes.get('/persons/:name', persons.getData);

// create route for get movies data from Star Wars
routes.get('/movies', movies.getData);

export { routes };