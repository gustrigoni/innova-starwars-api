import { Router } from "express";
import { Persons } from "../controllers/Persons";

// init rountes instance
const routes = Router();
const persons = new Persons();

// create route for get person data from Star Wards
routes.get('/persons/:name', persons.getData);

export { routes };