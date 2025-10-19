import userService from "../service/userService";

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

    // userService.createNewUser(email, password, username);
    userService.getUsetList();

    return res.send("User creation logic not implemented yet.");
};

module.exports = { handleHelloWorld, handleUserPage, handleCreateNewUser };
