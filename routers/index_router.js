const express = require("express");
const router = express.Router();
const path = require("path");
const {
  login_control,
  register_control,
} = require("../controllers/home_controller");

router.get("", (req, res) => {
  const user = req.cookies.user ? JSON.parse(req.cookies.user) : undefined;
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.get("/table", (req, res) => {
  const user = req.cookies.user ? JSON.parse(req.cookies.user) : undefined;
  res.sendFile(path.join(__dirname, "../views", "table.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "login.html"));
});

router.post("/login", login_control);

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "kayit-ol.html"));
});

router.post("/register", register_control);

module.exports = router;
