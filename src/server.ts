require('dotenv').config();

import { app } from "./app";

// get data from the environment
const {
  PORT
} = process.env;

// listen the server
app.listen(PORT || 3000, () => console.log(`[UP] endpoint port: ${PORT}`));
