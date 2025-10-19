import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import Bluebird from "bluebird";
import dotenv from "dotenv";
import db from "../models";

let salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (email, password, username) => {
    let hashedPassword = hashPassword(password);
    try {
        const newUser = db.User.build({
            email: email,
            password: hashedPassword,
            username: username,
        });
        await newUser.save();
        console.log("User inserted successfully");
    } catch (err) {
        console.error("Error inserting user:", err);
    }
};

const getUsetList = async () => {
    const newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "email", "username"],
        include: [{ model: db.Group }],
        raw: true,
        nest: true,
    });
    console.log(newUser);

    const newRole = await db.Role.findAll({
        include: [{ model: db.Group, where: { id: 1 } }],
        raw: true,
        nest: true,
    });
    console.log(newRole);

    try {
        const rows = await db.User.findAll();
        return rows;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

const deleteUser = async (userId) => {
    try {
        await db.User.destroy({
            where: { id: userId },
        });
        console.log("User deleted successfully");
    } catch (err) {
        console.error("Error deleting user:", err);
    }
};

const updateUser = async (userId, email, username) => {
    try {
        await db.User.update(
            { email: email, username: username },
            { where: { id: userId } }
        );
        console.log("User updated successfully");
    } catch (err) {
        console.error("Error updating user:", err);
    }
};

const getUserById = async (userId) => {
    try {
        const user = await db.User.findOne({
            where: { id: userId },
        });
        if (user) {
            return user;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
};

module.exports = {
    createNewUser,
    getUsetList,
    deleteUser,
    updateUser,
    getUserById,
};
