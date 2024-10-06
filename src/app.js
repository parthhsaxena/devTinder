const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utils/validation");

app.use(express.json());

// API for adding a user
app.post("/signup", async (req, res) => {
  try {
    // Validation of the data
    validateSignupData(req);
    const { firstName, lastName, email, password } = req.body;
    // Password Encryption
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    // Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    // user.save will save the user in the database
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// API to get users with same email id
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// API to get all users from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// API to delete a user based on ID
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const users = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// API to update user data (query on email)
app.patch("/user", async (req, res) => {
  const userEmail = req.body.email;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "email",
      "userId",
      "age",
      "photoUrl",
      "gender",
      "skills",
      "about",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Cannot be updated");
    }
    const user = await User.findOneAndUpdate({ email: userEmail }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED: " + err.message);
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
