require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`
  ╔════════════════════════════════════════════╗
  ║                                            ║
  ║   🔐 SecureAuth Pro API Server             ║
  ║   ─────────────────────────────            ║
  ║   Port: ${PORT}                              ║
  ║   Mode: ${process.env.NODE_ENV || "development"}                     ║
  ║   URL:  http://localhost:${PORT}              ║
  ║                                            ║
  ╚════════════════════════════════════════════╝`));
