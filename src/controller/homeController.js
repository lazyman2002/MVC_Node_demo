import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
    return res.render("home");
};

const handleUserPage = async (req, res) => {
    let userList = await userService.getUsetList();
    return res.render("user", { userList });
};

const handleCreateNewUser = (req, res) => {
    let email = req.body.emailName;
    let password = req.body.passwordName;
    let username = req.body.usernameName;

    userService.createNewUser(email, password, username);
    return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
};

module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
};
