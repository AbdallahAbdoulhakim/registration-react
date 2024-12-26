const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  validateEmail,
  validateUsername,
  validatePassword,
} = require("../utils/validate");

const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      res.status(400);
      throw new Error(
        "Error 403: Bad request! You must provide valid username, email and password!"
      );
    }

    const validUsername = validateUsername(username);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    const valid =
      validUsername.valid && validPassword.valid && validPassword.valid;

    if (!valid) {
      res.status(400);
      const errMsg = `${validUsername.message} ${validEmail.message} ${validPassword.message}`;
      throw new Error(errMsg);
    }

    const newUser = await userModel.create({ username, email, password });

    res.status(201).json({
      success: true,
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      message: "User created successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username | !password) {
      res.status(400);
      throw new Error("Bad Request : You must provide username and password!");
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      res.status(401);
      throw new Error("Error 401: Unauthorized, Invalid credentials!");
    }

    const verified = await bcrypt.compare(password, user.password);

    if (!verified) {
      res.status(401);
      throw new Error("Error 401: Unauthorized, Invalid credentials!");
    }

    const accessToken = await jwt.sign(
      {
        UserInfo: {
          username: user.username,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = await jwt.sign(
      {
        UserInfo: {
          username: user.username,
          id: user._id,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("jwt", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: "none",
    });

    res.status(200).json({
      success: true,
      data: {
        accessToken,
      },
      message: "User successfully logged in!",
    });
  } catch (error) {
    next(error);
  }
});

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find();

  res.status(200).json({
    success: true,
    data: users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    })),
    message: "Users retrieved successfully!",
  });
});

const refreshToken = asyncHandler(async (req, res, next) => {
  try {
    const { jwt: token } = req?.cookies;

    if (!token) {
      res.status(400);
      throw new Error(
        "Error 400 : Bad request! not JWT Token present in the request!"
      );
    }

    const decoded = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const foundUser = await userModel.findOne({
      _id: decoded.UserInfo.id,
      username: decoded.UserInfo.username,
    });

    if (!foundUser) {
      res.status(401);
      throw new Error(
        "Error 401 Unauthorized : The provided user does not exist!"
      );
    }

    const newAccessToken = await jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      success: true,
      data: {
        accessToken: newAccessToken,
      },
      message: "Token refreshed successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.sendStatus(204);
    return;
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

  res.sendStatus(204);
});

module.exports = { createUser, loginUser, getUsers, refreshToken, logoutUser };
