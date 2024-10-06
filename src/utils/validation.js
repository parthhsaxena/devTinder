const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is invalid!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter a valid Email!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Stronger Password!");
  }
};

module.exports = { validateSignupData };
