import db from "../models/index";
import bcrypt from "bcryptjs";

let salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};
let isEmailExist = async (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: userEmail } });

            if (!user) {
                //not found
                resolve(false);
            }

            //found a record
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};
let isPhoneExist = async (userPhone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { phone: userPhone } });

            if (!user) {
                //not found
                resolve(false);
            }

            //found a record
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};

let getPasswordFromKeyLogin = async (keyLogin) => {
    try {
        let user = await db.User.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { email: keyLogin },
                    { phone: keyLogin },
                ],
            },
            attributes: ["id", "email", "phone", "password"],
        });

        if (!user) {
            return null; // không tìm thấy
        }

        return user;
    } catch (e) {
        console.error("Error in getPasswordFromKeyLogin:", e);
        throw e;
    }
};

const registerNewUser = async (rawData) => {
    try {
        let emailExisted = await isEmailExist(rawData.email);
        if (emailExisted) {
            return {
                EM: "Email already exist",
                EC: 1,
            };
        }
        let phoneExisted = await isPhoneExist(rawData.phone);
        if (phoneExisted) {
            return {
                EM: "Phone already exist",
                EC: 1,
            };
        }
        let hashedPassword = hashPassword(rawData.password);

        await db.User.build({
            email: rawData.email,
            username: rawData.username,
            password: hashedPassword,
            phone: rawData.phone,
        }).save();
        return {
            EM: "Created user",
            EC: 0,
        };
    } catch (e) {
        return {
            EM: "func registerNewUser failed",
            EC: 1,
        };
    }
};
const loginUser = async (rawData) => {
    try {
        const hashedPassword = await getPasswordFromKeyLogin(rawData.keyLogin);
        if (!hashedPassword) {
            return {
                EM: "Wrong Email or Phone number",
                EC: 1,
            };
        }
        if (!bcrypt.compareSync(rawData.password, hashedPassword.password)) {
            return {
                EM: "Wrong Password",
                EC: 1,
            };
        }
        return {
            EM: "Logged in",
            EC: 0,
        };
    } catch (e) {
        return {
            EM: "func loginUser failed",
            EC: 1,
        };
    }
};
export default { registerNewUser, loginUser };
