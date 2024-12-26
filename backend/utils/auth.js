const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyHashed = async (plainText, hashed) => {
  return await bcrypt.compare(plainText, hashed);
};

const generateToken = async (payload) => {
  return await jwt.sign({ id: payload }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_KEY);
};
module.exports = { verifyHashed, generateToken, verifyToken };
