import express from "express";

import configViewEngine from "./configs/viewEngine.js";
import initWebRoutes from "./routes/web.js";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
configViewEngine(app);

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
