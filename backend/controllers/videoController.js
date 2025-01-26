const Video = require('../models/videoModel');
const path = require('path');

// Video yuklash
exports.uploadVideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const videoPath = path.join(__dirname, '../uploads', req.file.filename); // Faylni serverga saqlash

  try {
    const newVideo = new Video({
      title: req.body.title,  // Foydalanuvchidan video nomini olish
      filePath: videoPath,    // Faylning serverdagi yo'li
    });

    await newVideo.save();

    res.status(200).json({
      message: 'Video uploaded successfully',
      videoData: newVideo,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading video' });
  }
};

// Video ro'yxatini olish
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching videos' });
  }
};
