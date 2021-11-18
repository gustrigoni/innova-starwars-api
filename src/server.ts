require('dotenv').config();

import { app } from "./app";

// get data from the environment
const {
  API_PORT
} = process.env;

// listen the server
app.listen(API_PORT, () => console.log(`[UP] endpoint port: ${API_PORT}`));