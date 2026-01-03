import React, { useEffect, useRef } from "react";
// Import file nhạc của bạn ở đây
import bgMusic from "../assets/audio/Ordinary_Violin_Wedding _Version_Alex_Warren_Cover.mp3"; 

const MusicPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Thiết lập âm lượng nhỏ (khoảng 30% - 40%)
    audio.volume = 0.4;

    // 2. Hàm thử phát nhạc
    const attemptPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Autoplay bị chặn bởi trình duyệt, chờ tương tác người dùng
          console.log("Autoplay prevented. Waiting for interaction.");
        });
      }
    };

    // 3. Thử phát ngay lập tức khi component mount
    attemptPlay();

    // 4. Fallback: Nếu trình duyệt chặn, phát ngay khi người dùng click/scroll/touch lần đầu
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
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  // Chỉ render thẻ audio ẩn, không có giao diện nút bấm
  return (
    <audio ref={audioRef} src={bgMusic} loop hidden />
  );
};

export default MusicPlayer;