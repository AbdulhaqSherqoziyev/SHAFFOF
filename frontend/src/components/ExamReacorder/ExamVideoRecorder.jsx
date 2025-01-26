import React, { useState, useRef } from 'react';
import './styles.css'; // Komponentga oid stil

const ExamVideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunks = useRef([]);

  // Video yozishni boshlash
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'video/webm' });
        setVideoURL(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  // Video yozishni to'xtatish
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Yozilgan videoni saqlash
  const saveVideo = () => {
    if (videoURL) {
      const a = document.createElement('a');
      a.href = videoURL;
      a.download = 'exam_recording.webm';
      a.click();
    }
  };

  return (
    <div className="exam-recorder">
      <h2>Imtihon Video Yozuvi</h2>
      <div>
        <video ref={videoRef} autoPlay muted width="100%" height="auto" />
      </div>
      <div>
        {isRecording ? (
          <button onClick={stopRecording}>To'xtatish</button>
        ) : (
          <button onClick={startRecording}>Yozishni Boshlash</button>
        )}
      </div>
      <div>
        {videoURL && (
          <>
            <h3>Yozib bo'lingan video:</h3>
            <video src={videoURL} controls width="100%" />
            <button onClick={saveVideo}>Saqlash</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExamVideoRecorder;
