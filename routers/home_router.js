const express = require('express');
const router = express.Router();
const {getOdalar,getPersonel,getTemizlik,getKayit,getTable,getChartData,getChartData2,getChartData3,getChartData4,getChartData5,getChartData6} = require('../controllers/home_controller');

router.get('/get_odalar', getOdalar);
router.get('/get_personel', getPersonel);
router.get('/get_temizlik', getTemizlik);
router.get('/get_kayit', getKayit);
router.get('/get_table', getTable);
router.get("/grafik1",getChartData)
router.get("/grafik2",getChartData2)
router.get("/grafik3",getChartData3)
router.get("/grafik4",getChartData4)
router.get("/grafik5",getChartData5)
router.get("/grafik6",getChartData6)

module.exports = router;