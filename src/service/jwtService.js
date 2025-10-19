import mysql from "mysql2";

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "jwt",
});

export { connection };