import express from "express";
import bodyParser from "body-parser";

import configViewEngine from "./configs/viewEngine.js";
import initWebRoutes from "./routes/web.js";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
configViewEngine(app);

//config body parser to read data from req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
