const express = require('express');
const multer = require('multer');
const path = require('path');
const videoController = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');

// Multer yordamida faylni qabul qilish
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routerni yaratish
const router = express.Router();

// Video yuklash (autentifikatsiya bilan)
router.post('/upload', protect, upload.single('file'), videoController.uploadVideo);

// Video ro'yxatini olish
router.get('/', protect, videoController.getVideos);

module.exports = router;
