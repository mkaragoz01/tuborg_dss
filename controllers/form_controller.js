const dbConn = require('../db/mysql_connect');


const post_temizlik = (req, res) => {

  const { personel_sec, oda_sec, temizlik_tur,giris_input,cikis_input } = req.body;
  let tur_id;
  let personel_id;
  console.log(personel_sec, oda_sec, temizlik_tur,giris_input,cikis_input)

  tur_id = (temizlik_tur === "Günlük") ? 1 : (temizlik_tur === "Haftalık") ? 2 : 3;
  personel_id = (personel_sec === "Ahmet Demir") ? 1 : (personel_sec === "Mustafa Karagöz") ? 2 : (personel_sec === "Canberk Dinçer") ? 3 : 4;

  const query = 'INSERT INTO temizlik (oda_no, temizlik_cesit, p_id, giris_tarih_saat, cikis_tarih_saat) VALUES (?, ?, ?, ?, ?)';

  dbConn.query(query, [oda_sec,tur_id,personel_id,giris_input,cikis_input], (error, results) => {
    if (error) {
      console.error('Veritabanına kaydetme hatası:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
        res.redirect("/form")
    }
  });
};

module.exports = { post_temizlik };
