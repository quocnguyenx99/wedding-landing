import React, { useEffect, useRef } from "react";
// Import file nhạc của bạn ở đây
import bgMusic from "../assets/audio/Ordinary_Violin_Wedding _Version_Alex_Warren_Cover.mp3"; 

const MusicPlayer = () => {
  const audioRef = useRef(null);
  
  // Thời điểm muốn cắt nhạc (3 phút 35 giây = 215 giây)
  const END_TIME = 215; 

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Thiết lập âm lượng
    audio.volume = 0.4;

    // 2. Logic cắt nhạc: Kiểm tra liên tục, nếu vượt quá 3:35 thì quay về 0
    const handleTimeUpdate = () => {
      if (audio.currentTime >= END_TIME) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    // 3. Hàm thử phát nhạc
    const attemptPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Autoplay bị chặn, chờ tương tác người dùng
          console.log("Autoplay prevented. Waiting for interaction.");
        });
      }
    };

    // 4. Fallback: Phát khi người dùng tương tác lần đầu (Click, Scroll, Touch)
    const handleFirstInteraction = () => {
      attemptPlay();
      // Xóa sự kiện ngay sau khi đã kích hoạt để tránh gọi lại
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    // Lắng nghe các sự kiện tương tác phổ biến
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    document.addEventListener("scroll", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    return () => {
      // Cleanup sự kiện khi component unmount
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  // Bỏ thuộc tính loop mặc định của thẻ audio vì ta đã tự xử lý loop bằng code ở trên
  return (
    <audio ref={audioRef} src={bgMusic} hidden />
  );
};

export default MusicPlayer;