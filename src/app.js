const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello From Parth");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello");
});

app.use("/", (req, res) => {
  res.send("Test command");
});

app.listen(7777, () => {
  console.log("Server is successfully running on port 7777");
});
