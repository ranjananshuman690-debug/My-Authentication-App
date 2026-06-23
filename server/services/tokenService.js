const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const generateAccessToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });

const generateRefreshToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await RefreshToken.create({ token, userId, expiresAt });
  return token;
};

const verifyRefreshToken = async (token) => {
  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const stored = await RefreshToken.findOne({ token });
  if (!stored) throw new Error("Invalid refresh token");
  return payload;
};

const deleteRefreshToken = (token) => RefreshToken.deleteOne({ token });

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken, deleteRefreshToken };
