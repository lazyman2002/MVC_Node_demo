import mysql from "mysql2";

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "jwt",
});

const handleHelloWorld = (req, res) => {
    return res.render("home");
};

const handleUserPage = (req, res) => {
    return res.render("user");
};

const handleCreateNewUser = (req, res) => {
    let email = req.body.emailName;
    let password = req.body.passwordName;
    let username = req.body.usernameName;

    connection.query(
        "insert into `users`(`email`, `password`, `username`) values (?, ?, ?);",
        [email, password, username],
        (err, results, fields) => {
            if (err) {
                console.error("Error inserting user:", err);
                return res.status(500).send("Error creating user.");
            }
            console.log(results);
            console.log(fields);
            // return res.send("User created successfully.");
        }
    );
    return res.send("User creation logic not implemented yet.", req);
};

module.exports = { handleHelloWorld, handleUserPage, handleCreateNewUser };
