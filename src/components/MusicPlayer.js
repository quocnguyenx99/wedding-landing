import React, { useState, useEffect, useRef } from "react";
// Import file nhạc của bạn ở đây
import bgMusic from "../assets/audio/Ordinary_Violin_Wedding _Version_Alex_Warren_Cover.mp3"; 

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Xử lý Auto-play khi người dùng tương tác lần đầu
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Cố gắng phát nhạc ngay lập tức (có thể bị chặn bởi trình duyệt)
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay prevented. Waiting for user interaction.");
          setIsPlaying(false);
        });
    }

    // Nếu autoplay bị chặn, lắng nghe sự kiện click đầu tiên để phát nhạc
    const handleFirstInteraction = () => {
      if (audio.paused) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.error("Play failed:", e));
      }
      // Xóa sự kiện sau khi đã tương tác
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={bgMusic} loop />
      
      {/* Nút điều khiển nhạc */}
      <button
        onClick={toggleMusic}
        className={`fixed top-24 right-0 z-50 flex items-center transition-transform duration-500 ease-in-out hover:scale-105
          ${isPlaying ? "translate-x-0" : "translate-x-0"} 
        `}
        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))" }}
      >
        {/* Phần thân dài chứa chữ */}
        <div className="bg-[#8b786d] h-8 md:h-10 pl-3 md:pl-4 pr-8 md:pr-10 rounded-l-full flex items-center border border-[#a69080]">
          <span className="text-white font-serif text-[10px] md:text-xs tracking-widest font-bold uppercase whitespace-nowrap">
            {isPlaying ? "Music On" : "Click Music"}
          </span>
        </div>

        {/* Phần tròn chứa icon nốt nhạc */}
        <div className="absolute right-0 w-10 h-10 md:w-12 md:h-12 bg-[#8b786d] rounded-full border-2 border-[#dcd0c0] border-dashed flex items-center justify-center shadow-md">
           {/* Icon nốt nhạc */}
           <svg 
             xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 24 24" 
             fill="currentColor" 
             className={`w-5 h-5 md:w-6 md:h-6 text-white ${isPlaying ? "animate-spin-slow" : ""}`}
           >
             <path fillRule="evenodd" d="M19.957 4.297a.75.75 0 01.293.578v6.75c0 1.312-1.063 2.375-2.375 2.375a2.375 2.375 0 01-2.375-2.375c0-1.313 1.063-2.375 2.375-2.375.256 0 .504.041.735.118v-4.56l-9 2.813v7.372a2.375 2.375 0 01-2.375 2.375 2.375 2.375 0 01-2.375-2.375c0-1.313 1.063-2.375 2.375-2.375.256 0 .505.041.735.118V8.5a.75.75 0 01.523-.716l10.5-3.281a.75.75 0 01.943.794z" clipRule="evenodd" />
           </svg>
        </div>
      </button>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;