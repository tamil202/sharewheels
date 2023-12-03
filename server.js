// import requirements
const express = require("express");
const mongoose = require("mongoose");
// const cookieParser = require("cookies-parser");
// swapping
const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("veiw engine", "ejs");
app.use(express.static("./public"));


// routes
app.use(require("./routers/authroutes"));

// listen and mongoose connect
mongoose
  .connect(
    "your connection string"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`server start from localhost : ${port}`);
    });
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// not found in route
app.get("*", (req, res) => {
  res.send("404 found");
});