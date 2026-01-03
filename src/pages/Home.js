import React, { useMemo, useState } from "react";
import heroSrc from "../assets/images/banner-img.jpg";

import sectionInfo1 from "../assets/images/section-info-1.jpg";
import sectionInfoMain from "../assets/images/section-info-main.jpg";
import sectionInfo2 from "../assets/images/section-info-2.jpg";

import sectionInfoRow1 from "../assets/images/section-info-row-1.jpg";
import sectionInfoRow2 from "../assets/images/section-info-row-2.jpg";
import sectionInfoRow3 from "../assets/images/section-info-row-3.jpg";

import starSrc from "../assets/images/star.png";
import sectionInfoLocation from "../assets/images/section-location-bg.jpg";

import sectionTimeline from "../assets/images/section-timeline.jpg";

// Import icons cho Dresscode
import sectionDresscodeBg from "../assets/images/section-dresscode.jpg";
import ladiesIcon from "../assets/images/Ladies.png";
import gentlemenIcon from "../assets/images/Gentlemen.png";

import sectionWeddingVenue from "../assets/images/section-weding-venue-1.jpg";
import sectionWeddingVenue2 from "../assets/images/section-weding-venue-2.jpg";

// Import assets cho section Accommodation
import sectionAccommodationBg from "../assets/images/section-weding-venue-3.jpg";
import coco1 from "../assets/images/coco-1.png";
import coco2 from "../assets/images/coco-2.png";
import planeDoodle from "../assets/images/plane.png";

import coco1Sub from "../assets/images/coco-1-sub.png";
import coco2Sub from "../assets/images/coco-2-sub.png";
import birdLeft1 from "../assets/images/bird1/bird-left-1.png";
import birdLeft2 from "../assets/images/bird1/bird-left-2.png";
import birdRight1 from "../assets/images/bird2/bird-right-1.png";
import birdRight2 from "../assets/images/bird2/bird-right-2.png";
import birdRight3 from "../assets/images/bird2/bird-right-3.png";

// Import hình bản đồ
import mapAdventure from "../assets/images/section-after-wedding-map.jpg";

// Import hình ảnh cho section cuối
import footerImg from "../assets/images/section-end.jpg";
import { Link } from "react-router-dom";

import MusicPlayer from "../components/MusicPlayer";

function Home() {
  // --- STATE CHO RSVP FORM ---
  // State quản lý danh sách khách. Mặc định luôn có 1 khách (Guest 1)
  const [guests, setGuests] = useState([
    { id: Date.now(), name: "", dietary: "" },
  ]);

  // State popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  // State popup lỗi
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // State validation errors
  const [errors, setErrors] = useState({});

  // State loading
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý thêm khách (Max 5)
  const handleAddGuest = () => {
    if (guests.length < 5) {
      setGuests([...guests, { id: Date.now(), name: "", dietary: "" }]);
    }
  };

  // Xử lý xóa khách
  const handleRemoveGuest = (id) => {
    // Nếu chỉ còn 1 khách thì không cho xóa (hoặc reset data tùy logic, ở đây chặn xóa để giữ Guest 1)
    if (guests.length <= 1) return;

    setGuests(guests.filter((g) => g.id !== id));
    // Xóa lỗi tương ứng nếu có
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);
  };

  // Xử lý thay đổi thông tin khách
  const handleGuestChange = (id, field, value) => {
    setGuests(guests.map((g) => (g.id === id ? { ...g, [field]: value } : g)));

    // Clear error khi user gõ
    if (field === "name" && errors[id]) {
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate từng guest
    guests.forEach((guest, index) => {
      // Guest 1 bắt buộc phải có tên (vì là Main Guest)
      // Các guest sau nếu đã add dòng thì cũng nên bắt buộc nhập
      if (!guest.name.trim()) {
        newErrors[guest.id] = `Guest ${index + 1} name is required`;
        isValid = false;
      } else if (guest.name.length > 150) {
        newErrors[guest.id] = "Name must not exceed 150 characters";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Xử lý submit
  const handleSubmit = async () => {
    // 1. Validate
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // 2. Prepare Payload
    // Logic mới: Guest 1 là Main, Guest 2-5 là Companions
    const mainGuest = guests[0];
    const companionGuests = guests.slice(1);

    const payload = {
      full_name: mainGuest.name,
      dietary: mainGuest.dietary,
      note: "",
      status: "attending",
      companions: companionGuests.map((g) => ({
        full_name: g.name,
        dietary: g.dietary,
      })),
    };

    try {
      // 3. Call API
      const response = await fetch(
        "https://be.dudoanchungketlcp-tta.vn/api/member",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        // 4. Success
        setShowSuccessPopup(true);
        // Reset form về trạng thái ban đầu (1 khách rỗng)
        setGuests([{ id: Date.now(), name: "", dietary: "" }]);
        setErrors({});
      } else {
        // 5. API Error
        setShowErrorPopup(true);
      }
    } catch (error) {
      // Network Error
      console.error("Error submitting RSVP:", error);
      setShowErrorPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const particles = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      size: Math.random() * 10 + 5 + "px", // Kích thước từ 5px đến 15px
      duration: Math.random() * 10 + 10 + "s", // Thời gian bay từ 10s đến 20s
      delay: Math.random() * 5 + "s",
    }));
  }, []);

  return (
    <>
      <MusicPlayer />
      <style>
        {`
          @keyframes float {
            0% { transform: translate(0, 0); opacity: 0.2; }
            50% { transform: translate(20px, -20px); opacity: 0.8; }
            100% { transform: translate(0, 0); opacity: 0.2; }
          }

          /* New: smooth popup + backdrop animations */
          @keyframes backdropFade {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes popupIn {
            0% { opacity: 0; transform: translateY(12px) scale(0.98); filter: blur(2px); }
            60% { opacity: 1; transform: translateY(-6px) scale(1.02); filter: blur(0); }
            100% { opacity: 1; transform: translateY(0) scale(1); filter: none; }
          }

          .popup-backdrop {
            animation: backdropFade 420ms ease both;
          }

          .popup-box {
            animation: popupIn 700ms cubic-bezier(.2,.9,.3,1) 120ms both;
            box-shadow: 0 18px 45px rgba(44,44,44,0.12); /* softer, elegant shadow */
            will-change: transform, opacity;
          }

          /* new: lightweight font helpers (fallbacks) */
          .font-tempting {
            font-family: "Tempting", "Great Vibes", "cursive";
            letter-spacing: 0.5px;
          }
          .font-acid {
            font-family: "Acid 200", "Playfair Display", serif;
            font-weight: 200;
            letter-spacing: 0.2px;
          }
          
          /* Error text animation */
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
          .error-text {
            color: #e53e3e;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            margin-left: 1rem;
            font-family: sans-serif;
            animation: shake 0.4s ease-in-out;
          }
        `}
      </style>

      {/* HERO */}
      <section className="relative h-[76vh] min-h-[600px] md:min-h-[1000px] lg:min-h-[1400px] xl:min-h-[1750px] 2xl:min-h-[2200px] w-full overflow-hidden">
        {/* Banner image */}
        <img
          src={heroSrc}
          alt="Wedding banner"
          className=" absolute left-0 top-0 h-[110%] w-full object-cover -translate-y-[16%] md:h-[115%] md:-translate-y-[12%]"
        />

        {/* Overlay*/}
        <div className="absolute inset-0 z-10 bg-black/70" />

        {/* --- HIỆU ỨNG ĐỐM SÁNG (Đặt sau Overlay, trước Content) --- */}
        <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-orange-200 blur-[1px]"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                opacity: 0.8,
                animation: `float ${p.duration} infinite ease-in-out ${p.delay}`,
              }}
            />
          ))}
        </div>

        {/* Center content */}
        {/* Container chính: overflow-visible để không cắt nét, pointer-events-none để click xuyên qua nếu cần */}
        <div className="absolute inset-x-0 bottom-[70%] mb:bottom-[65%] md:bottom-[70%] lg:bottom-[68%] z-20 flex justify-center px-4 overflow-visible pointer-events-none">
          {/* Flex container giữ bố cục ngang: [S] [Phần còn lại] */}
          <div className="relative flex flex-row items-center justify-center gap-[0.5] md:gap-2 lg:gap-5 text-wedding-white">
            {/* --- KHỐI TRÁI: CHỮ S --- */}
            {/* 
               - leading-[1.3]: Quan trọng nhất để fix lỗi mất nét trên iPhone.
               - p-4: Tạo vùng đệm an toàn xung quanh chữ.
               - -mr-3: Kéo khối bên phải lại gần chữ S hơn (vì chữ S có khoảng trắng bên phải).
            */}
            <div
              className="font-script text-wedding-beige 
                            text-[4rem] leading-[1.3] mb:text-[5rem]   mb:leading-[1.3]  
                            md:text-[6rem] md:leading-[1.3]
                            lg:text-[8.5rem] lg:leading-[1.3]
                            xl:text-[10rem]
                            p-4
                            -mr-3 md:-mr-6 lg:-mr-8
                            -mb-2 md:-mb-4
                            inline-block whitespace-nowrap z-10 relative"
            >
              S
            </div>

            {/* --- KHỐI PHẢI: TÊN + AVE THE DATE + NGÀY --- */}
            <div className="flex flex-col items-start justify-center z-20 translate-y-2 md:translate-y-4">
              {/* 1. Names (Hasley... & JB...) */}
              <p
                className="font-sans text-wedding-beige font-light 
                            text-xs mb:text-sm md:text-[18px] lg:text-2xl xl:text-3xl
                            mb-2 md:mb-1 lg:mb-3 ml-4 md:ml-8 lg:ml-14 xl:ml-24
                            whitespace-nowrap opacity-90"
              >
                Hasley Huong Nghiem &amp; JB Moni Lek
              </p>

              {/* 2. "ave the date" */}
              <h1
                className="font-script text-wedding-beige text-4xl leading-none mb:text-[40px] md:text-[4rem] lg:text-[6rem] xl:text-[8rem] whitespace-nowrap"
              >
                ave the date
              </h1>

              {/* 3. Date (08 / 08 / 2026) */}
              <p
                className="font-sans text-wedding-beige font-extralight 
                            text-[22px] tracking-[0.15em]
                            mb:text-2xl  mb:tracking-[0.15em]
                            md:text-4xl md:tracking-[0.2em]
                            lg:text-5xl lg:tracking-[0.25em]
                            xl:text-6xl
                            w-full mt-1 md:mt-2"
              >
                08 / 08 / 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: WE ARE GETTING MARRIED --- */}

      <section className="relative z-30 w-full bg-wedding-beige -mt-80 md:-mt-[450px] lg:-mt-[650px] xl:-mt-[800px] rounded-t-[50vw] pt-24 md:pt-32 lg:pt-44 xl:pt-52  pb-48 md:pb-[480px] lg:pb-[580px] xl:pb-[650px] px-4 text-center overflow-hidden">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-script text-[28px] md:text-4xl lg:text-6xl">
            We are getting married!
          </h2>

          <div className="max-w-3xl text-center">
            <p className="font-sans font-light text-[10px] mb:text-sm md:text-base lg:text-lg xl:text-xl tracking-wide leading-relaxed">
              We are delighted to invite you to celebrate our wedding as we
              exchange vows and share this joyful moment with our dearest family and friends.
            </p>
          </div>
        </div>
      </section>

      {/* --- IMAGE GALLERY SECTION --- */}
      <section className="relative z-40 mx-auto -mt-44 md:-mt-[420px] lg:-mt-[500px] xl:-mt-[600px] h-[390px] w-full max-w-6xl md:h-[900px]">
        <div className="absolute left-1/2 top-0 z-10 h-[320px] w-[180px] -translate-x-1/2 overflow-hidden rounded-t-full mb:h-[320px] md:h-[650px] md:w-[380px] lg:w-[500px] lg:h-[800px] xl:h-[900px]">
          <img
            src={sectionInfoMain}
            alt="Center Couple"
            className="h-full w-full object-cover"
          />
          {/* Text Overlay: Hương and Moni */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-4 md:pt-10 text-white">
            <span className="font-display text-3xl tracking-tight font-medium md:text-6xl xl:text-7xl drop-shadow-lg">
              Hương
            </span>
            <span className="font-display text-base font-light tracking-widest md:my-3 md:text-2xl xl:text-3xl">
              and
            </span>
            <span className="font-display text-3xl tracking-tight font-medium md:text-6xl xl:text-7xl drop-shadow-lg">
              Moni
            </span>
          </div>
        </div>
        {/* 2. LEFT IMAGE (Landscape, B&W) */}
        {/* Đè lên hình giữa (z-20) */}
        <div className="absolute bottom-[58px] left-3 md:left-6 mb:left-3 lg:left-10 z-20 h-[160px] w-[100px] overflow-hidden mb:bottom-[50px] md:bottom-52 mb:w-[120px] mb:h-[180px] md:h-[300px] md:w-[180px] lg:w-[240px] lg:h-[380px] lg:bottom-20 xl:h-[480px] xl:w-[300px] xl:-bottom-24">
          <img
            src={sectionInfo1}
            alt="Left Moment"
            className="h-full w-full object-cover grayscale"
          />
        </div>

        {/* 3. RIGHT IMAGE (Landscape, B&W) */}
        {/* Đè lên hình giữa (z-20) */}
        <div className="absolute bottom-0 right-0 z-20 h-[120px] w-[190px] overflow-hidden md:bottom-40 md:right-0 mb:h-[110px] md:h-[200px] md:w-[380px] lg:w-[450px] lg:h-[220px] lg:bottom-0 xl:w-[600px] xl:h-[320px] xl:-bottom-56 xl:-right-16">
          <img
            src={sectionInfo2}
            alt="Right Moment"
            className="h-full w-full object-cover grayscale"
          />
        </div>
      </section>

      {/* --- THREE IMAGES SECTION AND WEDDING INFO--- */}
      <section className="relative z-30 w-full bg-wedding-beige mt-2 md:-mt-32 lg:mt-4 xl:mt-60 px-0 md:pb-0">
        <div className="grid grid-cols-3 gap-1 md:gap-2 max-w-7xl mx-auto h-[200px] md:h-[380px] xl:h-[550px]">
          {/* Image 1 */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={sectionInfoRow1}
              alt="Couple Moment 1"
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Image 2 */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={sectionInfoRow2}
              alt="Couple Moment 2"
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Image 3 */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={sectionInfoRow3}
              alt="Couple Moment 3"
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* --- INFO DIV: LOCATION & DATE --- */}
        <div className="relative w-full mt-2 h-[200px] md:h-[300px] xl:h-[400px]  overflow-hidden flex items-center justify-center">
          {/* 1. Background Image */}
          <img
            src={sectionInfoLocation}
            alt="Background Pattern"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* 2. Beige Overlay (Adjust opacity to see image) */}
          <div className="absolute inset-0 bg-[#F3E9D9]/85" />

          {/* 3. Content Info */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4">
            <div className="flex flex-row items-center justify-center w-full">
              {/* Column 1: Location (Align Right) */}
              <div className="flex-1 flex flex-col items-end text-right pr-6 md:pr-12 space-y-2">
                <h3 className="font-script text-lg mb:text-xl md:text-2xl xl:text-3xl">
                  Location
                </h3>
                <p className="font-sans font-extralight text-xl mb:text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                  Meliá Danang
                  <br />
                  Beach Resort,
                  <br />
                  Vietnam
                </p>
              </div>

              {/* Divider: 2px solid charcoal (lighter) */}
              <div className="h-24 mb:h-28 md:h-36 xl:h-48 w-[1px] bg-wedding-charcoal/40"></div>

              {/* Column 2: Date (Align Left) */}
              <div className="flex-1 flex flex-col items-start text-left pl-6 md:pl-12 space-y-2">
                <h3 className="font-script text-lg mb:text-xl md:text-2xl xl:text-3xl">
                  Date
                </h3>
                <p className="font-sans font-extralight text-xl mb:text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                  Saturday,
                  <br />
                  August 8th,
                  <br />
                  2026
                </p>
              </div>
            </div>

            {/* 5 Stars */}
            <div className="flex flex-row gap-3 mt-4 md:mt-16 lg:mt-12">
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  src={starSrc}
                  alt="star"
                  className="h-4 w-4 mb:h-5 mb:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- WEDDING DAY TIMELINE SECTION --- */}
      <section className="w-full bg-white pt-8 pb-3 px-3 md:pb-7 md:pt-10 md:px-7">
        {/* flex-row để giữ bố cục ngang trên mọi màn hình */}
        <div className="max-w-7xl mx-auto flex flex-row items-start md:gap-2">
          {/* 1. Left Column: Image (40%) */}
          <div className="w-[40%] h-[280px] mb:h-[320px] md:h-[500px] lg:h-[650px] xl:h-[800px]">
            <div className="w-full h-full rounded-t-full bg-wedding-beige p-[2px] md:p-1 overflow-hidden">
              <img
                src={sectionTimeline}
                alt="Timeline Couple"
                className="w-full h-full object-cover rounded-t-full blur-[0.5px] md:blur-[0.5px]"
              />
            </div>
          </div>

          {/* 2. Right Column: Timeline (60%) */}
          <div className="w-[60%] flex flex-col pt-2 md:pt-12">
            <h2 className="font-script xs:text-lg text-[22px] mb:text-[23px] md:text-4xl lg:text-5xl xl:text-6xl mb-6 xs:mb-4 md:mb-8 lg:mb-10 xl:mb-16 text-center">
              Wedding day timeline
            </h2>

            {/* Timeline List */}
            <div className="flex flex-col w-full border-t border-gray-300">
              {[
                { time: "14:30", event: "Guest Arrival & Welcome" },
                { time: "15:00", event: "Vow Ceremony" },
                { time: "16:00", event: "Cocktail Hour" },
                { time: "18:00", event: "Dinner Reception" },
                { time: "20:00", event: "First Dance & Celebration" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center md:items-center py-3 px-4 xs:py-[10px] mb:py-3 md:py-5 lg:py-8 xl:py-10 border-b border-gray-300"
                >
                  <span className="w-10 md:w-40 font-sans font-extralight xs:text-[10px] text-xs mb:text-sm md:text-lg lg:text-xl xl:text-2xl pt-1 md:pt-0">
                    {item.time}
                  </span>
                  <span className="flex-1 font-sans font-extralight xs:text-[10px] mb:text-sm text-xs md:text-lg lg:text-xl xl:text-2xl pl-2 md:pl-0">
                    {item.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- DRESSCODE SECTION --- */}
      <section className="relative w-full h-[350px] xs:h-[380px] mb:h-[420px] md:h-[500px] overflow-hidden">
        {/* 1. Background Image (Centered & Overlay) */}
        <img
          src={sectionDresscodeBg}
          alt="Dresscode Background"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Overlay tối màu để nổi bật text trắng */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 text-wedding-beige">
          {/* 1. Header Section */}
          <div className="flex flex-col items-center text-center mb-8 md:mb-10">
            <h2 className="font-script text-[28px] mb:text-3xl md:text-4xl">Dresscode</h2>
            <p className="font-sans font-extralight text-xs mb:text-sm md:text-base lg:text-xl tracking-wide opacity-90">
              Festive summer glam, chic & elegant
            </p>
            {/* Line separator */}
            <div className="w-16 md:w-24 h-[1px] bg-wedding-beige mt-4 md:mt-6"></div>
          </div>

          {/* 2. Columns: Ladies & Gentlemen */}
          <div className="flex flex-row justify-center items-start w-full max-w-5xl gap-4 md:gap-20 mb-6 md:mb-8">
            {/* Ladies Column */}
            <div className="flex-1 flex flex-col items-center text-center">
              <img
                src={ladiesIcon}
                alt="Ladies Icon"
                className="w-6 h-6 mb:w-8 mb:h-8 md:w-8 md:h-8 object-contain mb-4 lg:mb-6"
              />
              <h3 className="font-script text-xl mb:text-2xl md:text-2xl lg:text-4xl mb-2 md:mb-4">
                Ladies
              </h3>
              <p className="font-sans font-extralight text-xs mb:text-sm md:text-base lg:text-lg max-w-[200px] md:max-w-xs leading-relaxed">
                Long dresses or gowns are preferred
              </p>
            </div>

            {/* Gentlemen Column */}
            <div className="flex-1 flex flex-col items-center text-center">
              <img
                src={gentlemenIcon}
                alt="Gentlemen Icon"
                className="w-6 h-6 mb:w-8 mb:h-8 md:w-8 md:h-8 object-contain mb-4 lg:mb-6"
              /> 
              <h3 className="font-script text-xl mb:text-2xl md:text-2xl lg:text-4xl mb-2 md:mb-4">
                Gentlemen
              </h3>
              <p className="font-sans font-extralight text-xs mb:text-sm md:text-base lg:text-lg max-w-[200px] md:max-w-xs leading-relaxed">
                Suits, dress shirts with trousers, or smart-casual ensembles
              </p>
            </div>
          </div>

          {/* 3. Color Palette */}
          <div className="flex flex-row gap-4 md:gap-8">
            {[
              { color: "#c0d1ad", name: "Pistachio\nGreen" },
              { color: "#f2e7b1", name: "Buttery\nYellow" },
              { color: "#b5dceb", name: "Blue\nPastel" },
              { color: "#f0e1ce", name: "Light\nBeige" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1 md:gap-2"
              >
                <div
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 shadow-lg"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="font-sans font-extralight text-[10px] mb:text-xs md:text-xs lg:text-sm text-center whitespace-pre-line opacity-80">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RSVP / JOIN US SECTION --- */}
      <section className="relative w-full bg-white py-12 px-4 mb:py-16 md:py-16">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Title: Join us */}
          <h2 className="relative z-10 font-script text-4xl md:text-6xl -mb-2 md:-mb-4">
            Join us
          </h2>

          {/* Form Container */}
          <div className="w-full bg-[#F3E9D9] rounded-[30px] pt-16 pb-10 px-6 md:px-16 md:pt-20 lg:px-12 shadow-sm flex flex-col gap-4">
            
            {/* Guest List Area - Hiển thị trực tiếp */}
            <div className="flex flex-col gap-6 mt-2">
              {/* Bỏ text (Max 5 guests) */}

              {guests.map((guest, index) => (
                <div
                  key={guest.id}
                  className="flex flex-col gap-3 border-b border-[#dcd0c0]/50 pb-6 last:border-0 animate-[fadeIn_0.3s_ease-out]"
                >
                  <div className="flex justify-between items-end px-1">
                    <p className="font-sans text-sm mb:text-lg xl:text-sm font-bold text-wedding-charcoal uppercase tracking-wider">
                      Guest {index + 1}
                    </p>

                    {/* Chỉ hiện nút Remove cho Guest 2 trở đi */}
                    {index > 0 && (
                      <button
                        onClick={() => handleRemoveGuest(guest.id)}
                        className="text-xs mb:text-sm md:text-xs xl:text-sm font-sans uppercase tracking-widest text-[#8b786d] hover:text-[#2c2c2c] border-b border-transparent hover:border-[#2c2c2c] transition-all duration-300 pb-[1px]"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Guest Name Input */}
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={guest.name}
                      onChange={(e) =>
                        handleGuestChange(guest.id, "name", e.target.value)
                      }
                      // Style giống input chính cũ: rounded-full, bg-white, h-12/14
                      className={`w-full h-12 md:h-14 rounded-2xl px-6 border bg-white font-sans font-light text-sm mb:text-base md:text-lg text-wedding-charcoal placeholder:text-wedding-charcoal/60 outline-none transition-all shadow-sm ${
                        errors[guest.id]
                          ? "border-red-400 focus:border-red-400"
                          : "border-transparent focus:border-[#dcd0c0]"
                      }`}
                    />
                    {errors[guest.id] && (
                      <p className="error-text">{errors[guest.id]}</p>
                    )}
                  </div>

                  {/* Guest Dietary Input */}
                   <textarea
                    placeholder="Do you have any special dietary requirements? (e.g. Vegeterian, No seafood,...)"
                    value={guest.dietary}
                    onChange={(e) =>
                      handleGuestChange(guest.id, "dietary", e.target.value)
                    }
                    rows={4}
                    className="w-full rounded-2xl px-6 py-3 md:py-4 border border-transparent bg-white font-sans font-light text-sm mb:text-base md:text-lg text-wedding-charcoal placeholder:text-wedding-charcoal/60 outline-none transition-all shadow-sm focus:border-[#dcd0c0] resize-none"
                  />
                </div>
              ))}

              {/* Nút Add Guest */}
              {guests.length < 5 && (
                <button
                  onClick={handleAddGuest}
                  className="self-center mt-2 group flex items-center gap-3 px-6 py-3 rounded-full border border-[#dcd0c0] bg-white hover:bg-[#fcfcfc] hover:shadow-md transition-all duration-300"
                >
                  <span className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-[#8b786d] text-white text-sm leading-none select-none group-hover:bg-[#5e5048] transition-colors">
                    +
                  </span>
                  <span className="font-sans text-sm mb:text-base md:text-base text-[#5e5048] tracking-wide group-hover:text-[#2c2c2c]">
                    Add another guest
                  </span>
                </button>
              )}
            </div>

            {/* Adult Note */}
            <p className="font-sans italic font-light text-xs mb:text-sm md:text-sm lg:text-base text-center text-wedding-charcoal mt-4">
              *Adult celebration — we respectfully ask that guests be 15 years
              old and over.
            </p>

            {/* Submit Button */}
            <div className="flex justify-center mt-6 -mb-16 md:-mb-20 relative z-20">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-white border border-[#F3E9D9] shadow-md rounded-full px-8 py-3 md:px-12 md:py-4 font-sans font-bold text-sm mb:text-base md:text-sm xl:text-base tracking-widest  text-[#2c2c2c] hover:scale-105 transition-transform duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Confirm the registration"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SUCCESS POPUP --- */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm popup-backdrop"
            onClick={() => setShowSuccessPopup(false)}
          ></div>

          {/* Popup Content */}
          <div className="relative bg-[#F3E9D9] p-8 md:p-12 rounded-2xl popup-box max-w-md w-full text-center">
            <h3 className="font-script text-xl mb:text-base md:text-2xl mb-4">
              Thank you for your registration
            </h3>
            <p className="font-sans font-light text-base mb:text-lg md:text-xl leading-relaxed">
              We are looking forward to welcoming you in our wedding.
            </p>

            {/* Close Button */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-8 bg-white border border-[#F3E9D9] shadow-md rounded-full px-8 py-3 md:px-12 md:py-4 font-sans font-bold text-xs md:text-sm tracking-widest hover:scale-105 transition-transform duration-300 uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- ERROR POPUP --- */}
      {showErrorPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm popup-backdrop"
            onClick={() => setShowErrorPopup(false)}
          ></div>

          {/* Popup Content */}
          <div className="relative bg-[#F3E9D9] p-8 md:p-12 rounded-2xl popup-box max-w-md w-full text-center">
            <h3 className="font-script text-xl mb:text-base md:text-2xl mb-4 text-red-800">
              Something went wrong
            </h3>
            <p className="font-sans font-light text-base mb:text-lg md:text-xl leading-relaxed">
              Sorry, we couldn't process your registration. Please try again
              later.
            </p>

            {/* Close Button */}
            <button
              onClick={() => setShowErrorPopup(false)}
              className="mt-8 bg-white border border-[#F3E9D9] shadow-md rounded-full px-8 py-3 md:px-12 md:py-4 font-sans font-bold text-xs md:text-sm tracking-widest hover:scale-105 transition-transform duration-300 uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- WEDDING VENUE SECTION --- */}
      <section className="w-full bg-white">
        <div className="relative w-full h-[220px] mb:h-[250px] md:h-[300px] overflow-hidden">
          {/* faint map background */}
          <img
            src={sectionWeddingVenue}
            alt="Map background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          {/* beige overlay + content */}
          <div className="absolute inset-0 bg-[#F3E9D9]/95 flex flex-col items-center justify-center text-center px-6">
            <h3 className="font-tempting text-[28px] mb:text-[30px] md:text-4xl">
              Wedding venue
            </h3>
            <p className="font-sans font-extralight text-base mb:text-xl md:text-3xl mt-2">
              Meliá Danang Beach Resort
            </p>
            <p className="font-sans text-sm mb:text-base md:text-xl mt-2">
              Address: 19 Truong Sa, Group 39, Ngu Hanh Son, Danang, Vietnam
            </p>

            <Link
              to="https://www.google.com/maps/place/Meli%C3%A1+Danang+Beach+Resort/@16.0002912,108.2664412,17z/data=!4m9!3m8!1s0x314210c5cab81527:0xfd5b35311bbbd0fc!5m2!4m1!1i2!8m2!3d16.0002912!4d108.2690161!16s%2Fg%2F1q67pwtd0?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-white border border-[#F3E9D9] shadow-md rounded-full px-5 py-3 md:px-6 md:py-3 font-sans font-bold uppercase text-xs mb:text-sm md:text-sm tracking-wide text-[#2c2c2c] hover:scale-105 transition-transform duration-300"
            >
              See map
            </Link>
          </div>
        </div>

        {/* image below */}
        <div className="w-full">
          <img
            src={sectionWeddingVenue2}
            alt="Meliá Danang Beach Resort"
            className="w-full h-[360px] md:h-[480px] xl:h-full object-cover"
          />
        </div>
      </section>

      {/* --- ACCOMMODATION SECTION --- */}
      <section className="relative w-full py-8 md:py-12 overflow-hidden">
        {/* 1. Background Image & Beige Overlay */}
        <img
          src={sectionAccommodationBg}
          alt="Accommodation Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F3E9D9]/90" />

        {/* Cây dừa trái */}
        <div className="absolute bottom-0 left-0 z-0 pointer-events-none">
          <img
            src={coco2}
            alt="Coconut Tree Left"
            className="w-32 md:w-[400px] object-contain opacity-80"
          />
          {/* Sub image dưới gốc dừa trái */}
          <img
            src={coco2Sub}
            alt="Coconut Sub Left"
            className="absolute -bottom-5 left-0 w-20 md:w-[250px] object-contain opacity-70"
          />
        </div>

        {/* Cây dừa phải */}
        <div className="absolute bottom-0 right-0 z-0 pointer-events-none flex flex-col items-end">
          <img
            src={coco1}
            alt="Coconut Tree Right"
            className="w-32 md:w-[400px] object-contain opacity-80"
          />
          {/* Sub image dưới gốc dừa phải */}
          <img
            src={coco1Sub}
            alt="Coconut Sub Right"
            className="absolute -bottom-5 right-0 w-20 md:w-[250px] object-contain opacity-70"
          />
        </div>

        {/* Birds Group Left */}
        <div className="absolute top-10 left-[5%] md:left-[10%] z-0 pointer-events-none">
          <img
            src={birdLeft1}
            alt="bird"
            className="w-4 md:w-8 opacity-60 animate-[float_8s_infinite]"
          />
          <img
            src={birdLeft2}
            alt="bird"
            className="absolute top-4 left-6 w-3 md:w-6 opacity-50 animate-[float_9s_infinite_1s]"
          />
        </div>

        {/* Birds Group Right */}
        <div className="absolute top-20 right-[5%] md:right-[15%] z-50 pointer-events-none">
          <img
            src={birdRight1}
            alt="bird"
            className="top-0 right-0 w-5 md:w-10 opacity-60 animate-[float_10s_infinite]"
          />
          <img
            src={birdRight2}
            alt="bird"
            className="absolute top-6 right-8 w-3 md:w-6 opacity-50 animate-[float_11s_infinite_0.5s]"
          />
          <img
            src={birdRight3}
            alt="bird"
            className="absolute top-2 right-16 w-2 md:w-5 opacity-40 animate-[float_12s_infinite_1.5s]"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-10 max-w-5xl mx-auto text-[#2c2c2c]">
          {/* Title */}
          <h2 className="font-tempting text-[28px] mb:text-[30px] md:text-4xl leading-[2.2]">
            Accommodation
          </h2>

          {/* Block 1: Melia Resort */}
          <h3 className="font-sans font-bold text-base mb:text-lg md:text-2xl mb-4">
            Booking at Melia Danang Beach Resort
          </h3>
          <p className="font-sans font-light text-xs mb:text-sm md:text-base lg:text-lg leading-relaxed max-w-4xl mb-4">
            We have negotiated a special night rate if you wish to stay at the
            Melia Resort! When submitting your booking, please follow the instructions to receive the special wedding rate.
          </p>

          {/* Button Instruction */}
          <Link
            to="https://drive.google.com/file/d/1nCn5NvcGxg4u-oeqVDUlTzgOgtFvWLIt/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-[#F3E9D9] shadow-md rounded-full px-5 py-3 md:px-8 md:py-3 font-sans font-bold text-xs mb:text-sm md:text-sm tracking-widest uppercase hover:scale-105 transition-transform duration-300 mb-8 inline-block text-center"
          >
            Instruction
          </Link>

          {/* Block 2: Other Hotels */}
          <h3 className="font-sans font-bold text-base mb:text-lg md:text-2xl mb-4">
            Book your stay at other hotels / resorts
          </h3>
          <p className="font-sans font-light text-xs mb:text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl mb-5">
            You can also book at other hotels nearby, Danang is a small city and Melia Resort is easily accessible from
            any location!
          </p>

          {/* Plane Image */}
          <div className="w-full flex justify-center mb-4">
            <img
              src={planeDoodle}
              alt="Flying to Danang"
              className="w-72 md:w-96 object-contain opacity-80"
            />
          </div>

          {/* Block 3: Flying Info */}
          <h2 className="font-sans font-extralight text-3xl mb:text-4xl md:text-5xl mb-6">
            Flying to Danang (DAD)
          </h2>

          <h3 className="font-sans font-bold text-base mb:text-lg md:text-2xl mb-4">
            Danang is easily reachable from around the world. You may:
          </h3>

          <ul className="font-sans font-light text-xs mb:text-sm md:text-base text-left list-disc pl-5 md:pl-0 space-y-2 max-w-3xl mx-auto mb-8 marker:text-[#8b786d]">
            <li>
              Take a direct or connecting flight via hubs such as Doha,
              Singapore, Dubai, Bangkok, or Seoul.
            </li>
            <li>
              Combine your trip with a short tour of Vietnam, visiting Hanoi or
              Ho Chi Minh City
              <br className="hidden md:block" />
              (many more international direct flights) before flying to Danang
              with Vietnam Airlines.
            </li>
          </ul>

          {/* Footer Note */}
          <p className="font-sans font-light text-sm mb:text-base md:text-lg leading-relaxed max-w-4xl">
            From the airport, Meliá Danang Beach Resort{" "}
            <span className="font-bold">is just 15 minutes away by taxi</span>, ready to welcome you for our celebration.
          </p>
        </div>
      </section>

      {/* --- ADVENTURE SECTION --- */}
      <section className="w-full bg-white py-16 px-4 md:px-10 md:pb-20">
        <div className="max-w-7xl mx-auto">
          {/* 1. Title: Acid 200 */}
          <h2 className="font-sans font-extralight text-3xl mb:text-4xl md:text-4xl xl:text-6xl text-center mb-12">
            Adventure Before or After the Wedding
          </h2>

          {/* 2. Layout Rows: 60% Text - 40% Image */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-8 items-start">
            {/* Left Column: Text (60%) */}
            <div className="w-full md:w-[60%] flex flex-col gap-8">
              {/* North */}
              <div>
                <h3 className="font-sans !font-bold text-base mb:text-lg md:text-xl mb-2">
                  North of Vietnam
                </h3>
                <ul className="font-sans text-sm mb:text-base md:text-base list-disc pl-5 space-y-2 marker:text-wedding-charcoal leading-relaxed">
                  <li>
                    <span className="font-bold">Hanoi (2 – 3 days)</span> – The
                    charming northern capital with lakes, Indochine
                    architecture, and a bustling Old Quarter.
                  </li>
                  <li>
                    <span className="font-bold">Ninh Binh (1 – 2 days)</span> –
                    The tranquil landscape of towering limestone peaks, calm
                    rivers, and vibrant rice fields.
                  </li>
                  <li>
                    <span className="font-bold">Halong Bay (1 – 2 days)</span> –
                    UNESCO World Heritage site with limestone karsts; perfect
                    for a scenic cruise.
                  </li>
                </ul>
              </div>

              {/* Center */}
              <div>
                <h3 className="font-sans !font-bold text-base mb:text-lg md:text-xl mb-2">
                  Center of Vietnam
                </h3>
                <ul className="font-sans text-sm mb:text-base md:text-base list-disc pl-5 space-y-2 marker:text-wedding-charcoal leading-relaxed">
                  <li>
                    <span className="font-bold">
                      Danang and nearby Hoi An (2 - 3 days)
                    </span>{" "}
                    – The perfect mix of modern coastal energy and timeless
                    lantern-lit charm, with beautiful beaches, bridges, and
                    ancient streets.
                  </li>
                  <li>
                    <span className="font-bold">Hue (1 – 2 days)</span> – The
                    former imperial capital with historic citadels and royal
                    tombs.
                  </li>
                </ul>
              </div>

              {/* South */}
              <div>
                <h3 className="font-sans !font-bold text-base mb:text-lg md:text-xl mb-2">
                  South of Vietnam
                </h3>
                <ul className="font-sans text-sm mb:text-base md:text-base list-disc pl-5 space-y-2 marker:text-wedding-charcoal leading-relaxed">
                  <li>
                    <span className="font-bold">
                      Ho Chi Minh City (2 – 3 days)
                    </span>{" "}
                    – Vibrant southern metropolis with lively markets, and rich
                    history.
                  </li>
                  <li>
                    <span className="font-bold">Mekong Delta (1 – 2 days)</span>{" "}
                    – Explore rivers, floating markets, and traditional villages
                    in southern Vietnam.
                  </li>
                </ul>
              </div>

              {/* Cambodia */}
              <div>
                <h3 className="font-sans !font-bold text-base mb:text-lg md:text-xl mb-2">
                  Nearby Country to Explore: Cambodia - The Hometown of The
                  Groom
                </h3>
                <ul className="font-sans text-sm mb:text-base md:text-base list-disc pl-5 space-y-2 marker:text-wedding-charcoal leading-relaxed">
                  <li>
                    <span className="font-bold">Phnom Penh (2 – 3 days)</span> –
                    Gritty, soulful, and raw Cambodia - royal palaces, river
                    sunsets, and deep history.
                  </li>
                  <li>
                    <span className="font-bold">Siem Reap (3 – 4 days)</span> –
                    Ancient wonders by day, laid-back bars by night - Angkor
                    magic never gets old.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Image (40%) */}
            <div className="w-full md:w-[40%] flex flex-col justify-center md:justify-end">
              <img
                src={mapAdventure}
                alt="Vietnam and Cambodia Map"
                className="w-full h-auto max-w-[500px] md:max-w-[600px] object-contain"
              />

              {/* Footer Note with Sparkle */}
              <div className="mt-4 flex items-start gap-2">
                <span className="text-yellow-500 text-xl">✨</span>
                <p className="font-sans font-medium italic leading-relaxed text-sm mb:text-base md:text-base xl:text-lg">
                  Whether you choose a cultural tour, a beach escape, or both,
                  Vietnam and Cambodia offer unforgettable experiences before
                  or after our celebration in Danang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL SECTION: SEE YOU SOON --- */}
      <section className="relative w-full h-[50vh] md:h-[70vh] xl:h-[96vh] overflow-hidden">
        <img
          src={footerImg}
          alt="See you soon"
          className="w-full h-full object-cover"
        />

        {/* Lớp phủ tối nhẹ để làm nổi bật chữ (tùy chọn) */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Text Container */}
        <div className="absolute top-[36%] xs:top-[28%] mb:top-[32%] md:top-[28%] xl:top-[22%] left-0 w-full text-center -translate-y-1/2 z-10 px-4">
          <h2 className="font-tempting text-wedding-beige text-[32px] mb:text-4xl md:text-6xl xl:text-8xl leading-none drop-shadow-lg">
            See you soon.
          </h2>
        </div>
      </section>
    </>
  );
}

export default Home;
