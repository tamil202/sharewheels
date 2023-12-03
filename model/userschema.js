const { Schema, model } = require("mongoose");
// const {hashSync, genSaltSync, compareSync} = require('bcrypt')  // password encrypt and decrypt

const schema = Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
    validate: {
      validator: (value) => {
        return isAlpha(value.replace(/\s/g, ""), "en-US", { ignore: " " });
      },
      message: "Please Enter a valid Name",
    },
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please Enter validate Email"],
  },
  password: {
    type: String,
    require: [true, "Please Enter Password"],
    minLength: [6, "Please Enter Minimux 6 Characters"],
  },
});
// schema.post('save', (doc, next) => {
//   console.log(`new user ${doc} mail and password was saved`);
//   next();
// });

// another method view above code

schema.pre("save",async function(next){
  let salt =  genSaltSync()  // from bcrypt
  this.password =  hashSync(this.password, salt)
  next();
  console.log(this);
});
schema.static.login = async function(email,password){
    const user = await this.findOne({ email, password });
  if (user) {
    const auth = compareSync(password, user.password);
    if (auth) {
      return user
    }
    throw Error("incorrect password")
  }
  throw Error('incorrect email')
}
const collection = model("userdatastore", schema);
module.exports = collection;
