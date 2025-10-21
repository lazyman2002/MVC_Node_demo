import { response } from "express";
import loginRegisterService from "../service/loginRegisterService";

const testAPI = (req, res) => {
    return res.status(200).json({ message: "API is working!", data: "ok" });
};

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters", // error message
                EC: "1", //error code
                DT: "", //date
            });
        }

        let data = await loginRegisterService.registerNewUser(req.body);
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, //error code
                DT: "", //data
            });
        }
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, //error code
            DT: "", //data
        });
    } catch (e) {
        return res.status(500).json({
            EM: "handleRegister unknow error",
            EC: "-1",
            DT: "",
        });
    }
};

const handleLogin = async (req, res) => {
    try {
        if (!req.body.keyLogin || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters", // error message
                EC: "1", //error code
                DT: "", //date
            });
        }
        let data = await loginRegisterService.loginUser(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, //error code
            DT: "", //data
        });
    } catch (e) {
        return res.status(500).json({
            EM: "handleLogin unknow error",
            EC: "-1",
            DT: "",
        });
    }
};
export default { testAPI, handleRegister, handleLogin };
