import express from "express";
import apiController from "../controller/apiController.js";
const router = express.Router();

/**
 *
 * @param {*} app
 * @returns
 */
const initAPIRoutes = (app) => {
    router.get("/test-api", apiController.testAPI);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    return app.use("/api", router);
};

export default initAPIRoutes;
