const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the user model
  const user = new User(req.body);
  try {
    // user.save will save the user in the database
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
