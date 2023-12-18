const dbConn = require("../db/mysql_connect");

exports.getPersonel = (req, res) => {
  try {
    dbConn.query("SELECT * FROM personel", (error, results) => {
      if (error) {
        console.error("MySQL connection error:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ message: results });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOdalar = (req, res) => {
  try {
    dbConn.query("SELECT * FROM oda", (error, results) => {
      if (error) {
        console.error("MySQL connection error:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.json({ message: results });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTemizlik = (req, res) => {
  try {
    dbConn.query(
      "SELECT round((SELECT COUNT(temizlik.temizlik_cesit) FROM temizlik WHERE temizlik_cesit in (1,2))/(SELECT COUNT(temizlik.temizlik_cesit) FROM temizlik)*100,2) as sorgu",
      (error, results) => {
        if (error) {
          console.error("MySQL connection error:", error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        res.json({ message: results });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getKayit = (req, res) => {
  try {
    dbConn.query(
      "SELECT count(temizlik.id) as temizlik FROM temizlik",
      (error, results) => {
        if (error) {
          console.error("MySQL connection error:", error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        res.json({ message: results });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getChartData = (req, res) => {
  try {
    dbConn.query(
      "SELECT oda.oda_ad, count(temizlik.id)gunluk FROM\
    temizlik,oda\
    WHERE temizlik.oda_no=oda.oda_no AND temizlik.temizlik_cesit=1\
    GROUP BY temizlik.oda_no",
      (error, results) => {
        if (error) {
          console.error("MySQL connection error:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const labels = results.map((result) => result.oda_ad);
        const dataValues = results.map((result) => result.gunluk);

        const data = {
          labels: labels,
          datasets: [
            {
              label: "Günlük Temizlik Sayısı",
              data: dataValues,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,255,192,1)",
              borderWidth: 3,
            },
          ],
        };

        res.json(data);
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getChartData2 = (req, res) => {
  try {
    dbConn.query(
      "SELECT temizlik_durum.durum, COUNT(temizlik.id) as temizlik_sayisi \
      FROM temizlik, temizlik_durum WHERE temizlik.temizlik_cesit = temizlik_durum.id GROUP BY temizlik.temizlik_cesit",
      (error, results) => {
        if (error) {
          console.error("MySQL connection error:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const labels = results.map((result) => result.durum);
        const dataValues = results.map((result) => result.temizlik_sayisi);

        const data = {
          labels: labels,
          datasets: [
            {
              label: "Temizlik Sayısı",
              data: dataValues,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)", // Kırmızı
                "rgba(54, 162, 235, 1)", // Mavi
                "rgba(255, 206, 86, 1)", // Sarı
              ],
              borderWidth: 2,
            },
          ],
        };

        res.json(data);
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getChartData3 = (req, res) => {
  try {
    dbConn.query(
      'SELECT concat(personel.ad," ",personel.soyad) as kisi , count(temizlik.id)as temizlik_sayi FROM\
    temizlik,personel\
    WHERE temizlik.p_id=personel.p_id\
    GROUP BY personel.p_id',
      (error, results) => {
        if (error) {
          console.error("MySQL connection error:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const labels = results.map((result) => result.kisi);
        const dataValues = results.map((result) => result.temizlik_sayi);
        const data = {
          labels: labels,
          datasets: [
            {
              label: "Personel Temizlik Sayısı",
              data: dataValues,
              backgroundColor: "rgba(255, 155, 132, 0.2)",
              borderColor: "rgb(255, 155, 132)",
              pointBackgroundColor: "rgb(255, 155, 132)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(255, 155, 132)",
            },
          ],
        };

        res.json(data);
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getChartData4 = (req, res) => {
  try {
    dbConn.query(
      "SELECT oda.oda_ad, count(temizlik.id)gunluk FROM\
    temizlik,oda\
    WHERE temizlik.oda_no=oda.oda_no AND temizlik.temizlik_cesit=2\
    GROUP BY temizlik.oda_no",
      (error, results) => {
        if (error) {
          console.error("MySQL connection error:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const labels = results.map((result) => result.oda_ad);
        const dataValues = results.map((result) => result.gunluk);

        const data = {
          labels: labels,
          datasets: [
            {
              label: "Genel Temizlik Sayısı",
              data: dataValues,
              backgroundColor: "rgba(255, 298, 86, 1)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 3,
            },
          ],
        };

        res.json(data);
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getChartData5 = (req, res) => {
  try {
    dbConn.query(
      "SELECT \
    CONCAT(personel.ad, ' ', personel.soyad) AS personel_ad_soyad,\
    GROUP_CONCAT(ROUND(TIMESTAMPDIFF(MINUTE, temizlik.giris_tarih_saat, temizlik.cikis_tarih_saat))) AS temizlik_sureleri\
    FROM temizlik\
    JOIN personel ON personel.p_id = temizlik.p_id\
    GROUP BY personel.p_id, personel_ad_soyad",
      (error, results) => {
        if (error) {
          console.error("MySQL connection error:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const labels = results.map((result) => result.personel_ad_soyad);
        const dataValues = results.map((result) =>
          result.temizlik_sureleri.split(",").map(Number)
        );

        const data = {
          labels: ["", "", "", "", "", "", "", "", "", ""],
          datasets: [
            {
              label: labels[0],
              data: dataValues[0],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderWidth: 2,
            },
            {
              label: labels[1],
              data: dataValues[1],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderWidth: 2,
            },
            {
              label: labels[2],
              data: dataValues[2],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderWidth: 2,
            },
            {
              label: labels[3],
              data: dataValues[3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderWidth: 2,
            },
            {
              label: labels[4],
              data: dataValues[4],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderWidth: 2,
            },
            {
              label: labels[5],
              data: dataValues[5],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderWidth: 2,
            },
            {
              label: labels[6],
              data: dataValues[6],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderWidth: 2,
            },
            {
              label: labels[7],
              data: dataValues[7],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderWidth: 2,
            },
          ],
        };

        res.json(data);
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getChartData6 = (req, res) => {
  try {
    dbConn.query(
      'SELECT \
    concat(personel.ad," ",personel.soyad) as personel,round(AVG(TIMESTAMPDIFF(MINUTE, temizlik.giris_tarih_saat, temizlik.cikis_tarih_saat))) AS ortalama_sure\
    FROM \
    temizlik,personel\
    WHERE personel.p_id=temizlik.p_id\
    GROUP BY personel.p_id',
      (error, results) => {
        if (error) {
          console.error("MySQL connection error:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const labels = results.map((result) => result.personel);
        const dataValues = results.map((result) => result.ortalama_sure);

        const data = {
          labels: labels,
          datasets: [
            {
              label: "Ortalama Personel Temizlik Süresi",
              data: dataValues,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)", // Kırmızı
                "rgba(54, 162, 235, 0.5)", // Mavi
                "rgba(255, 206, 86, 0.5)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)", // Kırmızı
                "rgba(54, 162, 235, 1)", // Mavi
                "rgba(255, 206, 86, 1)", // Sarı
                "rgba(33, 255, 145, 0.5)",
                "rgba(65, 100, 145, 0.5)",
                "rgba(92, 185, 20, 0.5)",
                "rgba(12, 150, 1, 0.5)",
                "rgba(159, 25, 145, 0.5)",
              ],

              borderWidth: 2,
            },
          ],
        };

        res.json(data);
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTable = (req, res) => {
  try {
    dbConn.query(
      'SELECT temizlik.id, temizlik.oda_no ,oda.oda_ad,concat(personel.ad," ",personel.soyad)as personel_ad_soyad,\
     temizlik_durum.durum,temizlik.giris_tarih_saat,temizlik.cikis_tarih_saat\
     FROM temizlik,oda,personel,temizlik_durum\
     WHERE temizlik.temizlik_cesit=temizlik_durum.id AND temizlik.oda_no=oda.oda_no AND temizlik.p_id=personel.p_id\
     ORDER BY `temizlik`.`id` ASC',
      (error, results) => {
        if (error) {
          console.error("MySQL connection error:", error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        res.json({ message: results });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const path = require("path");

exports.login_control = async (req, res) => {
  try {
    const k_adi = req.body.k_adi;
    const sifre = req.body.sifre;

    await dbConn.query(
      "SELECT ad, soyad FROM login WHERE k_adi=? AND sifre=?",
      [k_adi, sifre],
      (error, results) => {
        if (error) {
          console.error("MySQL Giriş hatası:", error);
          res.status(500).json({ error: "Giriş başarısız" });
        } else if (results.length === 0) {
          res
            .status(401)
            .sendFile(path.join(__dirname, "../views", "login.html"));
        } else {
          const user = results[0];
          res.cookie("user", JSON.stringify(user));
          res.redirect("/");
        }
      }
    );
  } catch (error) {
    console.error("Giriş hatası:", error);
    res.status(500).json({ error: "İç Sunucu Hatası" });
  }
};

exports.register_control = async (req, res) => {
  try {
    const ad = req.body.ad;
    const soyad = req.body.soyad;
    const k_adi = req.body.k_adi;
    const email = req.body.email;
    const sifre = req.body.sifre;

    await dbConn.query(
      "INSERT INTO login (ad, soyad, email,k_adi, sifre) VALUES (?,?,?,?,?)",
      [ad, soyad, email, k_adi, sifre],
      (error, results) => {
        if (error) {
          // console.error("MySQL register error:", error);
          // res.status(500).json({ error: "Registration failed" });
          res.redirect("/register");
        } else {
          res.redirect("/login");
        }
      }
    );
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
