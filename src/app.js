const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (err, req, res, next) => {
  // Creating a new instance of the user model
  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    email: "virat@kohli.com",
    password: "virat@123",
  });
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Established!");
    app.listen(7777, () => {
      console.log("Server is successfully running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database Cannot Be Connected...");
  });
