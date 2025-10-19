import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import Bluebird from "bluebird";
import dotenv from "dotenv";

let salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (email, password, username) => {
    const connection = await mysql.createPool({
        host: dotenv.DB_HOST || "localhost",
        user: dotenv.DB_USER || "root",
        database: dotenv.DB_NAME || "jwt",
        Promise: Bluebird,
    });
    let hashedPassword = hashPassword(password);
    try {
        await connection.execute(
            "insert into `users`(`email`, `password`, `username`) values (?, ?, ?);",
            [email, hashedPassword, username]
        );
        console.log("User inserted successfully");
    } catch (err) {
        console.error("Error inserting user:", err);
    } finally {
        await connection.end();
    }
    //     "insert into `users`(`email`, `password`, `username`) values (?, ?, ?);",
    //     [email, hashedPassword, username],
    //     (err, results, fields) => {
    //         if (err) {
    //             console.error("Error inserting user:", err);
    //             return callback(err);
    //         }
    //         console.log("User inserted successfully");
    //     }
    // );
};

const getUsetList = async () => {
    const connection = await mysql.createPool({
        host: dotenv.DB_HOST || "localhost",
        user: dotenv.DB_USER || "root",
        database: dotenv.DB_NAME || "jwt",
        Promise: Bluebird,
    });
    try {
        const [rows, fields] = await connection.execute(
            "select * from `users`"
        );
        return rows;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    } finally {
        await connection.end();
    }
};

const deleteUser = async (userId) => {
    const connection = await mysql.createPool({
        host: dotenv.DB_HOST || "localhost",
        user: dotenv.DB_USER || "root",
        database: dotenv.DB_NAME || "jwt",
        Promise: Bluebird,
    });
    try {
        await connection.execute("delete from `users` where `id` = ?;", [
            userId,
        ]);
        console.log("User deleted successfully");
    } catch (err) {
        console.error("Error deleting user:", err);
    } finally {
        await connection.end();
    }
};

const updateUser = async (userId, email, username) => {
    const connection = await mysql.createPool({
        host: dotenv.DB_HOST || "localhost",
        user: dotenv.DB_USER || "root",
        database: dotenv.DB_NAME || "jwt",
        Promise: Bluebird,
    });

    try {
        await connection.execute(
            "update `users` set `email` = ?, `username` = ? where `id` = ?;",
            [email, username, userId]
        );
        console.log("User updated successfully");
    } catch (err) {
        console.error("Error updating user:", err);
    } finally {
        await connection.end();
    }
};

const getUserById = async (userId) => {
    const connection = await mysql.createPool({
        host: dotenv.DB_HOST || "localhost",
        user: dotenv.DB_USER || "root",
        database: dotenv.DB_NAME || "jwt",
        Promise: Bluebird,
    });
    try {
        const [rows, fields] = await connection.execute(
            "select * from `users` where `id` = ?;",
            [userId]
        );
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    } finally {
        await connection.end();
    }
};

module.exports = {
    createNewUser,
    getUsetList,
    deleteUser,
    updateUser,
    getUserById,
};
