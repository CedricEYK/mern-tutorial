const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

//*desc Register new user
//*route POST /api/users
//*access Public
exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already registered");
  }

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("add a all fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name: name,
    email: email,
    password: hashedPassword,
  };

  user = await User.create(newUser);

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user");
  }
});

//*desc Login registered user
//*route POST /api/users/login
//*access Public
exports.loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);

  res.status(200).json({
    msg: "Login user",
  });
});

//*desc Get user data
//*route GET /api/users/me
//*access Public
exports.getUser = asyncHandler(async (req, res) => {
  console.log(req.body);

  res.status(200).json({
    msg: "Get user data",
  });
});
