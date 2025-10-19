import express from "express";

const router = express.Router();

/**
 * 
 * @param {*} app 
 * @returns 
 */
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        res.send("Hello World from Express");
        // return res.render('home');
    });
    return app.use("/", router);
};

export default initWebRoutes;