const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ParthSaxena:Parth%40123@namastenode.lxcf6.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;
