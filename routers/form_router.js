
const express = require('express');
const router = express.Router();
const path = require('path');
const { post_temizlik } = require('../controllers/form_controller');

router.get('', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'form.html'));
});

router.post('', post_temizlik);

module.exports = router;