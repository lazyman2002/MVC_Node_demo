import bcrypt from "bcryptjs";
import mysql from "mysql2";

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "jwt",
});
let salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = (email, password, username) => {
    let hashedPassword = hashPassword(password);
    connection.query(
        "insert into `users`(`email`, `password`, `username`) values (?, ?, ?);",
        [email, hashedPassword, username],
        (err, results, fields) => {
            if (err) {
                console.error("Error inserting user:", err);
                return callback(err);
            }
            console.log("User inserted successfully");
        }
    );
};

const getUsetList = () => {
    connection.query("select * from `users`", (err, results, fields) => {
        if (err) {
            console.error("Error fetching users:", err);
            return;
        }
        console.log("Fetched users:", results);
    });
};

module.exports = { createNewUser, getUsetList };
