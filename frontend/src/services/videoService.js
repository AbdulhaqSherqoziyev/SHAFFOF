// videoService.js

// Video faylini serverga yuklash uchun funksiya
const uploadVideo = async (videoBlob) => {
    const formData = new FormData();
    formData.append('video', videoBlob, 'exam_recording.webm');
  
    try {
      // Serverga video faylini yuborish
      const response = await fetch('https://your-server-endpoint.com/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        return await response.json();  // Agar muvaffaqiyatli bo'lsa, serverdan javob qaytariladi
      } else {
        console.error('Failed to upload video:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };
  
  export default {
    uploadVideo,
  };
  