const express = require('express');
const multer = require('multer');


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    let lecture = req.body.lecture || '';

    if (req.file) {


    if (!lecture) {
      return res.status(400).json({ error: 'lecture text or PDF file is required' });
    }


  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
