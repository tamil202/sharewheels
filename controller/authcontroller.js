// import section
const userschema = require("../model/userschema");
const { sign } = require("jsonwebtoken");

// error handler
const handlererrors = (err) => {
  console.log(err.message, err.code);
  let errors = { name: "", email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "This Email Already Exists ";
    return errors;
  }

  if (err.message.includes("userdatastore validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
};

module.exports.signupPage = (req, res) => {
  res.render("signup.ejs");
};

module.exports.loginPage = (req, res) => {
  res.render("login.ejs");
};
// jsonwebtoekn
let maxAge = 3 * 24 * 60 * 60;
const createtoken = (id) => {
  return sign({ id }, "TVA", {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userschema.create({ name, email, password });
    const token = createtoken(userschema._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({user:user._id});
  } catch (err) {
    const error = handlererrors(err);
    res.status(400).send(error);
    return;
  }
};

module.exports.login = async(req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userschema.login(email, password);
    res.status(200).json({user:user._id});
  }catch(err){
    res.status(400).json({});
    console.log(err);
  }
};
