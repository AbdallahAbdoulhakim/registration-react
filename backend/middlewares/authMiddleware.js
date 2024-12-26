const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const loginMiddleware = expressAsyncHandler(async (req, res, next) => {
  try {
    const token = req?.token;

    if (!token) {
      res.status(401);
      throw new Error(
        "Error 403 : Unauthorized! No token provided in the request! "
      );
    }

    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await userModel.findOne({ ...decoded.UserInfo });

    if (!user) {
      res.status(401);
      throw new Error(
        "Error 403 : Unauthorized! User role combination does not exist ! "
      );
    }

    res.user = {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(403);
      next(new Error("Error 403 Unauthorized: Token Expired!"));
    } else {
      next(error);
    }
  }
});

const adminMiddleware = (req, res, next) => {
  try {
    const user = res?.user;

    if (user.role !== "admin") {
      res.status(403);
      throw new Error(
        "Unauthorized : User is not allowed to access this resource"
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { loginMiddleware, adminMiddleware };
