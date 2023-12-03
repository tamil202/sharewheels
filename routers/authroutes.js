// import
const Router = require("express").Router();
const authcontrol = require("../controller/authcontroller");

// home
Router.get("/", (req, res) => {
  res.render("index.ejs");
});
// signup
Router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});
// login
Router.get("/login", (req, res) => {
  res.render("login.ejs");
});
// singup_post
Router.post("/signup", authcontrol.signup);
// login_post
Router.post("/login", authcontrol.login);

module.exports = Router;
