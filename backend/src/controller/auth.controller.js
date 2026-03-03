const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const isExistUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isExistUser) {
      return res.status(400).json({
        message: "User with the same email or username is already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_TOKEN,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Serve not reachable",
      error: err,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, username, password } = req.body;

    const user = await userModel
      .findOne({
        $or: [{ email }, { username }],
      })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invaild credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invaild credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_TOKEN,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token);
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Serve not reachable",
      error: err,
    });
  }
}

async function getMeUser(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User fetched successfully",
    user,
  });
}

async function logOutUser(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        message: "No token found",
      });
    }

    const decoded = jwt.decode(token);

    if (!decoded || !decoded.exp) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }

    const remainingTime = decoded.exp - Math.floor(Date.now() / 1000);

    if (remainingTime > 0) {
      await redis.set(token, Date.now().toString(), "EX", remainingTime);
    }

    // Clear cookie properly
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logout successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = { registerUser, loginUser, getMeUser, logOutUser };
