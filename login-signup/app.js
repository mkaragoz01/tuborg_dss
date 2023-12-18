const mysql = require("mysql");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tuborg",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/login", async (req, res) => {
  try {
    const k_adi = req.body.k_adi;
    const sifre = req.body.sifre;
    // Sorguyu çalıştır
    await db.query(
      "SELECT * FROM login WHERE k_adi=? AND sifre=?",
      [k_adi, sifre],
      (error, results) => {
        if (error) {
          console.error("MySQL Login error:", error);
          res.status(500).json({ error: "Login failed" });
        } else if (results.length === 0) {
          // Kullanıcı adı veya şifre hatalıysa aynı sayfada kal
          res.status(401).json({ error: "Invalid username or password" });
        } else {
          // Yönlendirmeyi gerçekleştir
          res.redirect("/");
        }
      }
    );
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const ad = req.body.ad;
    const soyad = req.body.soyad;
    const k_adi = req.body.k_adi;
    const email = req.body.email;
    const sifre = req.body.sifre;

    await db.query(
      "INSERT INTO login (ad, soyad, email,k_adi, sifre) VALUES (?,?,?,?,?)",
      [ad, soyad, email, k_adi, sifre],
      (error, results) => {
        if (error) {
          console.error("MySQL register error:", error);
          res.status(500).json({ error: "Registration failed" });
        } else {
          res.redirect("/index.html");
        }
      }
    );
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/index", async (req, res) => {
  try {
    const { k_adi, sifre } = req.body;

    db.query(
      "SELECT * FROM login WHERE k_adi = ?",
      [k_adi],
      async (error, results) => {
        if (error) {
          console.error("MySQL login error:", error);
          res.status(500).json({ error: "Login failed" });
        } else if (results.length > 0) {
          if (results[0].sifre == sifre) {
            res.send("Login Complate");
          }
        } else {
          res.status(401).json({ error: "User not found" });
        }
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(express.static(path.join(__dirname, "views")));

app.listen(3000);
