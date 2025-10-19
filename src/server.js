import express from "express";
import bodyParser from "body-parser";

import configViewEngine from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";
// import connection from "./config/connectDB.js";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
configViewEngine(app);

//config body parser to read data from req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
// connection();

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
