const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
} = require("../services/tokenService");

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const sendTokens = async (res, user) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);
  res.cookie("refreshToken", refreshToken, COOKIE_OPTS);
  return { accessToken, user: { id: user._id, name: user.name, email: user.email } };
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });
    if (password.length < 6) return res.status(400).json({ message: "Password min 6 characters" });
    if (await User.findOne({ email })) return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({ name, email, password });
    const data = await sendTokens(res, user);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const data = await sendTokens(res, user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const payload = await verifyRefreshToken(token);
    await deleteRefreshToken(token);

    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    const data = await sendTokens(res, user);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) await deleteRefreshToken(token);
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name.trim();
    if (email && email !== user.email) {
      if (await User.findOne({ email, _id: { $ne: user._id } }))
        return res.status(409).json({ message: "Email already in use" });
      user.email = email.toLowerCase().trim();
    }

    await user.save();
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
};
