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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//*desc Login registered user
//*route POST /api/users/login
//*access Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credantials");
  }
});

//*desc Get user data
//*route GET /api/users/me
//*access Private
exports.getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//*setup JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
