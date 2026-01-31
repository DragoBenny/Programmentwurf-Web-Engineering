const registerView = (req, res) => {
    res.render('../views/register.pug');
}

const loginView = (req, res) => {
    res.render('../views/login.pug');
}

const registerUser = (req, res) => {
    const {username, email, password, confirmedPassword} = req.body
    //check if email is already in use
    //check if username is already in use
    //check if password is valid -> number of symbols, lower and upper case, etc.
    //check if confirmed password matches password
    //create new user in database
    //redirect user to start page
}

const loginUser = (req, res) => {
    res.send("controller sagt hi");
}

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser
};