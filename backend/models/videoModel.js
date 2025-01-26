const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Video nomi majburiy
  },
  filePath: {
    type: String,
    required: true,  // Video fayl yo'li majburiy
  },
  uploadDate: {
    type: Date,
    default: Date.now,  // Video yuklangan sana
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
