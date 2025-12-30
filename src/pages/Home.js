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

function Home() {
  // --- STATE CHO RSVP FORM ---
  const [mainName, setMainName] = useState("");
  const [mainDietary, setMainDietary] = useState("");

  // State quản lý danh sách khách đi cùng
  const [guests, setGuests] = useState([]);
  const [isGuestSectionOpen, setIsGuestSectionOpen] = useState(false);

  // State popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Xử lý thêm khách (Max 5)
  const handleAddGuest = () => {
    if (guests.length < 5) {
      setGuests([...guests, { id: Date.now(), name: "", dietary: "" }]);
    }
  };

  // Xử lý xóa khách
  const handleRemoveGuest = (id) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  // Xử lý thay đổi thông tin khách
  const handleGuestChange = (id, field, value) => {
    setGuests(guests.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  // Xử lý submit
  const handleSubmit = () => {
    // Ở đây bạn có thể thêm logic gửi API
    setShowSuccessPopup(true);
  };

  const particles = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
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
        `}
      </style>

      {/* HERO */}
      <section className="relative h-[76vh] min-h-[600px] md:min-h-[1000px] lg:min-h-[1400px] xl:min-h-[1650px] w-full overflow-hidden">
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
        <div className="absolute inset-x-0 bottom-[65%] md:bottom-[72%] z-20 flex justify-center px-4">
          <div className="relative top-0 md:top-20 flex flex-row text-wedding-white">
            <div className="font-script text-wedding-beige text-[4rem] leading-[0.6] md:text-[7rem] lg:text-[8rem] xl:text-[9rem] -mr-2  pb-4 ">
              S
            </div>

            {/* Right side content */}
            <div className="flex flex-col items-start md:items-center">
              <p className="font-sans text-wedding-beige font-light text-[10px] md:text-[16px] lg:text-lg xl:text-xl mb-1 lg:mb-3 ml-6 md:ml-8 whitespace-nowrap">
                Hasley Huong Nghiem &amp; JB Moni Lek
              </p>

              <h1 className="font-script text-wedding-beige text-4xl font-normal leading-none md:text-5xl md:mr-8 lg:text-6xl  xl:text-7xl">
                ave the date
              </h1>

              <p className="font-sans text-wedding-beige text-[20px] font-extralight tracking-[0.1em] md:text-3xl lg:text-4xl xl:text-5xl md:mr-8 w-full text-center">
                08 / 08 / 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: WE ARE GETTING MARRIED --- */}

      <section className="relative z-30 w-full bg-wedding-beige -mt-80 md:-mt-[450px] lg:-mt-[650px] xl:-mt-[800px] rounded-t-[50vw] pt-24 md:pt-32 lg:pt-44 xl:pt-52  pb-48 md:pb-[480px] lg:pb-[580px] xl:pb-[650px] px-6 text-center overflow-hidden">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-script text-[28px] md:text-4xl lg:text-6xl">
            We are getting married!
          </h2>

          <div className="max-w-3xl text-center">
            <p className="font-sans font-light text-[8px] md:text-base lg:text-lg xl:text-xl tracking-wide leading-relaxed">
              We are delighted to invite you to celebrate our wedding as we
              exchange vows.
            </p>
            <p className="font-sans font-light text-[8px] md:text-base lg:text-lg xl:text-xl tracking-wide leading-relaxed mt-2">
              and share this joyful moment with our dearest family and friends.
            </p>
          </div>
        </div>
      </section>

      {/* --- IMAGE GALLERY SECTION --- */}
      <section className="relative z-40 mx-auto -mt-44 md:-mt-[420px] lg:-mt-[500px] xl:-mt-[600px] h-[390px] w-full max-w-6xl md:h-[900px]">
        <div className="absolute left-1/2 top-0 z-10 h-[300px] w-[180px] -translate-x-1/2 overflow-hidden rounded-t-full md:h-[650px] md:w-[380px] lg:w-[500px] lg:h-[800px] xl:h-[900px]">
          <img
            src={sectionInfoMain}
            alt="Center Couple"
            className="h-full w-full object-cover"
          />
          {/* Text Overlay: Hương and Moni */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-4 md:pt-10 text-white">
            <span className="font-display text-2xl font-medium md:text-6xl xl:text-7xl drop-shadow-lg">
              Hương
            </span>
            <span className="my-1 font-display text-xs font-light tracking-widest md:my-3 md:text-2xl xl:text-3xl">
              and
            </span>
            <span className="font-display text-2xl font-medium md:text-6xl xl:text-7xl drop-shadow-lg">
              Moni
            </span>
          </div>
        </div>
        {/* 2. LEFT IMAGE (Landscape, B&W) */}
        {/* Đè lên hình giữa (z-20) */}
        <div className="absolute bottom-16 left-2 md:left-6 lg:left-10 z-20 h-[160px] w-[100px] overflow-hidden md:bottom-52 md:h-[300px] md:w-[180px] lg:w-[240px] lg:h-[380px] lg:bottom-20 xl:h-[480px] xl:w-[300px] xl:-bottom-24">
          <img
            src={sectionInfo1}
            alt="Left Moment"
            className="h-full w-full object-cover grayscale"
          />
        </div>

        {/* 3. RIGHT IMAGE (Landscape, B&W) */}
        {/* Đè lên hình giữa (z-20) */}
        <div className="absolute bottom-0 right-0 z-20 h-[120px] w-[190px] overflow-hidden md:bottom-40 md:right-0 md:h-[200px] md:w-[380px] lg:w-[450px] lg:h-[220px] lg:bottom-0 xl:w-[600px] xl:h-[320px] xl:-bottom-56 xl:-right-16">
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
                <h3 className="font-script text-sm md:text-2xl xl:text-3xl">Location</h3>
                <p className="font-sans font-extralight text-xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                  Meliá Danang
                  <br />
                  Beach Resort,
                  <br />
                  Vietnam
                </p>
              </div>

              {/* Divider: 2px solid charcoal (lighter) */}
              <div className="h-24 md:h-36 xl:h-48 w-[1px] bg-wedding-charcoal/40"></div>

              {/* Column 2: Date (Align Left) */}
              <div className="flex-1 flex flex-col items-start text-left pl-6 md:pl-12 space-y-2">
                <h3 className="font-script text-sm md:text-2xl xl:text-3xl">Date</h3>
                <p className="font-sans font-extralight text-xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
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
                  className="h-3 w-3 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8"
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
          <div className="w-[40%] h-[280px] md:h-[500px] lg:h-[650px] xl:h-[800px]">
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
            <h2 className="font-script text-xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 xs:mb-4 mb:mb-6 md:mb-8 lg:mb-10 xl:mb-16 text-center">
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
                  className="flex flex-row items-start md:items-center py-3 px-6 xs:py-[10px] mb:py-3 md:py-5 lg:py-8 xl:py-10 border-b border-gray-300"
                >
                  <span className="w-10 md:w-40 font-sans font-extralight text-[10px] md:text-lg lg:text-xl xl:text-2xl pt-1 md:pt-0">
                    {item.time}
                  </span>
                  <span className="flex-1 font-sans font-extralight text-[10px] md:text-lg lg:text-xl xl:text-2xl pl-2 md:pl-0">
                    {item.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- DRESSCODE SECTION --- */}
      <section className="relative w-full h-[380px] md:h-[500px] overflow-hidden">
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
            <h2 className="font-script text-2xl md:text-4xl mb-2">Dresscode</h2>
            <p className="font-sans font-extralight text-xs md:text-base lg:text-xl tracking-wide opacity-90">
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
                className="w-6 h-6 md:w-8 md:h-8 object-contain mb-4 lg:mb-6"
              />
              <h3 className="font-script text-xl md:text-2xl lg:text-4xl mb-2 md:mb-4">
                Ladies
              </h3>
              <p className="font-sans font-extralight text-[8px] md:text-base lg:text-lg max-w-[200px] md:max-w-xs leading-relaxed">
                Long dresses or gowns are preferred
              </p>
            </div>

            {/* Gentlemen Column */}
            <div className="flex-1 flex flex-col items-center text-center">
              <img
                src={gentlemenIcon}
                alt="Gentlemen Icon"
                className="w-6 h-6 md:w-8 md:h-8 object-contain mb-4 lg:mb-6"
              />
              <h3 className="font-script text-xl md:text-2xl lg:text-4xl mb-2 md:mb-4">
                Gentlemen
              </h3>
              <p className="font-sans font-extralight text-[8px] md:text-base lg:text-lg max-w-[200px] md:max-w-xs leading-relaxed">
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
                <span className="font-sans font-extralight text-[8px] md:text-xs lg:text-sm text-center whitespace-pre-line opacity-80">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RSVP / JOIN US SECTION --- */}
      <section className="relative w-full bg-white py-10 px-4 md:py-16">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Title: Join us (Đè lên form một chút bằng negative margin) */}
          <h2 className="relative z-10 font-script text-4xl md:text-6xl -mb-2 md:-mb-4">
            Join us
          </h2>

          {/* Form Container */}
          <div className="w-full bg-[#F3E9D9] rounded-[30px] pt-16 pb-10 px-6 md:px-16 md:pt-20 lg:px-12 shadow-sm flex flex-col gap-4">
            {/* 1. Your Full Name */}
            <input
              type="text"
              placeholder="Your full name"
              value={mainName}
              onChange={(e) => setMainName(e.target.value)}
              className="w-full h-12 md:h-14 rounded-full px-6 text-center font-sans font-light text-sm md:text-lg lg:text-xl outline-none text-wedding-charcoal placeholder:text-wedding-charcoal"
            />

            {/* 2. Who are you coming with? (Toggle Button) */}
            <div className="w-full flex flex-col gap-2">
              <button
                onClick={() => setIsGuestSectionOpen(!isGuestSectionOpen)}
                className="w-full h-12 md:h-14 bg-white rounded-full px-6 flex items-center justify-between font-sans font-light text-sm md:text-lg lg:text-xl text-[#4a4a4a] outline-none"
              >
                <span className="w-full text-center text-wedding-charcoal">
                  Who are you coming with?{" "}
                  {guests.length > 0 && `(${guests.length})`}
                </span>
                <span className="text-2xl font-light text-wedding-charcoal absolute right-12 md:right-40 lg:right-72">
                  {isGuestSectionOpen ? "-" : "+"}
                </span>
              </button>

              {/* Guest List Area (Expandable) */}
              {isGuestSectionOpen && (
                <div className="flex flex-col gap-4 mt-2 p-4 bg-white/50 rounded-2xl border border-white">
                  <p className="text-center font-sans text-xs md:text-base text-wedding-charcoal mb-2 opacity-60">
                    (Max 5 guests)
                  </p>

                  {guests.map((guest, index) => (
                    <div
                      key={guest.id}
                      className="flex flex-col gap-2 border-b border-[#dcd0c0] pb-4 last:border-0 animate-[fadeIn_0.3s_ease-out]"
                    >
                      <div className="flex justify-between items-end">
                        <p className="font-sans text-xs font-bold text-wedding-charcoal uppercase tracking-wider">
                          Guest {index + 1}
                        </p>

                        {/* Nút Remove được làm đẹp lại */}
                        <button
                          onClick={() => handleRemoveGuest(guest.id)}
                          className="text-[10px] md:text-xs font-sans uppercase tracking-widest text-[#8b786d] hover:text-[#2c2c2c] border-b border-transparent hover:border-[#2c2c2c] transition-all duration-300 pb-[1px]"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Guest Name */}
                      <input
                        type="text"
                        placeholder={`Full name`}
                        value={guest.name}
                        onChange={(e) =>
                          handleGuestChange(guest.id, "name", e.target.value)
                        }
                        className="w-full h-10 md:h-12 rounded-lg px-4 border border-white bg-white/80 focus:bg-white focus:border-[#dcd0c0] font-sans font-light text-xs outline-none transition-all"
                      />

                      {/* Guest Dietary */}
                      <input
                        type="text"
                        placeholder="Dietary (optional)"
                        value={guest.dietary}
                        onChange={(e) =>
                          handleGuestChange(guest.id, "dietary", e.target.value)
                        }
                        className="w-full h-10 md:h-12 rounded-lg px-4 border border-white bg-white/80 focus:bg-white focus:border-[#dcd0c0] font-sans font-light text-xs outline-none transition-all"
                      />
                    </div>
                  ))}

                  {/* Nút Add Guest được làm đẹp lại */}
                  {guests.length < 5 && (
                    <button
                      onClick={handleAddGuest}
                      className="self-center mt-2 group flex items-center gap-2 px-5 py-2 rounded-full border border-[#dcd0c0] bg-white/60 hover:bg-white hover:shadow-sm transition-all duration-300"
                    >
                      <span className="w-5 h-5 md:w-6 md:h-6 inline-flex items-center justify-center rounded-full bg-[#dcd0c0] text-white text-[12px] md:text-sm leading-none select-none group-hover:bg-[#8b786d] transition-colors">
                        +
                      </span>
                      <span className="font-sans text-xs text-[#5e5048] tracking-wide group-hover:text-[#2c2c2c]">
                        Add another guest
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 3. Dietary Requirements (Textarea) */}
            <div className="w-full">
              <textarea
                placeholder="Do you have any special dietary requirements?&#10;(e.g. Vegeterian, No seafood,...)"
                value={mainDietary}
                onChange={(e) => setMainDietary(e.target.value)}
                className="w-full h-32 md:h-40 rounded-[20px] py-4 px-6 text-center font-sans font-light text-sm md:text-lg  lg:text-xl outline-none text-wedding-charcoal placeholder:text-wedding-charcoal resize-none leading-relaxed"
              />
            </div>
 
            {/* 4. Adult Note */}
            <p className="font-sans italic font-light text-[10px] md:text-sm lg:text-base text-center text-wedding-charcoal mt-2">
              *Adult celebration — we respectfully ask that guests be 15 years
              old and over.
            </p>

            {/* 5. Submit Button */}
            <div className="flex justify-center mt-6 -mb-16 md:-mb-20 relative z-20">
              <button
                onClick={handleSubmit}
                className="bg-white border border-[#F3E9D9] shadow-md rounded-full px-8 py-3 md:px-12 md:py-4 font-sans font-bold text-xs md:text-sm tracking-widest  text-[#2c2c2c] hover:scale-105 transition-transform duration-300"
              >
                Confirm the registration
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
            <h3 className="font-script text-xl md:text-2xl mb-4">
              Thank you for your registration
            </h3>
            <p className="font-sans font-light text-base md:text-xl leading-relaxed">
              We are looking forward to welcoming you in our wedding.
            </p>

            {/* Close Button (Optional) */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-8 bg-white border border-[#F3E9D9] shadow-md rounded-full px-8 py-3 md:px-12 md:py-4 font-sans font-bold text-xs md:text-sm tracking-widest hover:scale-105 transition-transform duration-300 uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- WEDDING VENUE SECTION --- */}
      <section className="w-full bg-white">
        <div className="relative w-full h-[220px] md:h-[300px] overflow-hidden">
          {/* faint map background */}
          <img
            src={sectionWeddingVenue}
            alt="Map background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          {/* beige overlay + content */}
          <div className="absolute inset-0 bg-[#F3E9D9]/95 flex flex-col items-center justify-center text-center px-6">
            <h3 className="font-tempting text-2xl md:text-4xl">
              Wedding venue
            </h3>
            <p className="font-sans font-extralight text-base md:text-3xl mt-2">
              Meliá Danang Beach Resort
            </p>
            <p className="font-sans text-xs md:text-xl mt-2">
              Address: 19 Truong Sa, Group 39, Ngu Hanh Son, Danang, Vietnam
            </p>

            <Link
              to="https://www.google.com/maps/place/Meli%C3%A1+Danang+Beach+Resort/@16.0002912,108.2664412,17z/data=!4m9!3m8!1s0x314210c5cab81527:0xfd5b35311bbbd0fc!5m2!4m1!1i2!8m2!3d16.0002912!4d108.2690161!16s%2Fg%2F1q67pwtd0?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-white border border-[#F3E9D9] shadow-md rounded-full px-3 py-1 md:px-6 md:py-3 font-sans font-bold uppercase text-xs md:text-sm tracking-wide text-[#2c2c2c] hover:scale-105 transition-transform duration-300"
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
            className="w-full h-[360px] md:h-[480px] object-cover"
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
          <h2 className="font-tempting text-2xl md:text-4xl mb-4">
            Accommodation
          </h2>

          {/* Block 1: Melia Resort */}
          <h3 className="font-sans font-bold text-base md:text-2xl mb-4">
            Booking at Melia Danang Beach Resort
          </h3>
          <p className="font-sans font-light text-xs md:text-base lg:text-lg leading-relaxed max-w-4xl mb-6">
            We have negotiated a special night rate if you wish to stay at the
            Melia Resort! When submitting your booking,
            <br className="hidden md:block" />
            please follow the instructions to receive the special wedding rate.
          </p>

          {/* Button Instruction */}
          <Link
            to="https://drive.google.com/file/d/1nCn5NvcGxg4u-oeqVDUlTzgOgtFvWLIt/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-[#F3E9D9] shadow-md rounded-full px-5 py-1 md:px-8 md:py-3 font-sans font-bold text-xs md:text-sm tracking-widest uppercase hover:scale-105 transition-transform duration-300 mb-8 inline-block text-center"
          >
            Instruction
          </Link>

          {/* Block 2: Other Hotels */}
          <h3 className="font-sans font-bold text-base md:text-2xl mb-4">
            Book your stay at other hotels / resorts
          </h3>
          <p className="font-sans font-light text-xs md:text-base lg:text-lg leading-relaxed max-w-3xl mb-8">
            You can also book at other hotels nearby,
            <br className="hidden md:block" />
            Danang is a small city and Melia Resort is easily accessible from
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
          <h2 className="font-sans font-extralight text-3xl md:text-5xl mb-6">
            Flying to Danang (DAD)
          </h2>

          <h3 className="font-sans font-bold text-base md:text-2xl mb-4">
            Danang is easily reachable from around the world. You may:
          </h3>

          <ul className="font-sans font-light text-xs md:text-base text-left list-disc pl-5 md:pl-0 space-y-2 max-w-3xl mx-auto mb-10 marker:text-[#8b786d]">
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
          <p className="font-sans font-light text-sm md:text-lg leading-relaxed max-w-4xl">
            From the airport, Meliá Danang Beach Resort{" "}
            <span className="font-bold">is just 15 minutes away by taxi</span>,
            <br className="hidden md:block" />
            ready to welcome you for our celebration.
          </p>
        </div>
      </section>

      {/* --- ADVENTURE SECTION --- */}
      <section className="w-full bg-white py-16 px-4 md:px-10 md:pb-20">
        <div className="max-w-7xl mx-auto">
          {/* 1. Title: Acid 200 */}
          <h2 className="font-sans font-extralight text-3xl md:text-4xl text-center mb-12">
            Adventure Before or After the Wedding
          </h2>

          {/* 2. Layout Rows: 60% Text - 40% Image */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-8 items-start">
            {/* Left Column: Text (60%) */}
            <div className="w-full md:w-[60%] flex flex-col gap-8">
              {/* North */}
              <div>
                <h3 className="font-sans !font-bold text-base md:text-xl mb-2">
                  North of Vietnam
                </h3>
                <ul className="font-sans text-xs md:text-base list-disc pl-5 space-y-2 marker:text-wedding-charcoal leading-relaxed">
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
                <h3 className="font-sans !font-bold text-base md:text-xl mb-2">
                  Center of Vietnam
                </h3>
                <ul className="font-sans text-xs md:text-base list-disc pl-5 space-y-2 marker:text-wedding-charcoal leading-relaxed">
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
                <h3 className="font-sans !font-bold text-base md:text-xl mb-2">
                  South of Vietnam
                </h3>
                <ul className="font-sans text-xs md:text-base list-disc pl-5 space-y-2 marker:text-wedding-charcoal leading-relaxed">
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
                <h3 className="font-sans !font-bold text-base md:text-xl mb-2">
                  Nearby Country to Explore: Cambodia - The Hometown of The
                  Groom
                </h3>
                <ul className="font-sans text-xs md:text-base list-disc pl-5 space-y-2 marker:text-wedding-charcoal leading-relaxed">
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
                <p className="font-sans font-medium italic leading-relaxed text-xs md:text-base">
                  Whether you choose a cultural tour, a beach escape, or both,
                  Vietnam and Cambodia offers unforgettable experiences before
                  or after our celebration in Danang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL SECTION: SEE YOU SOON --- */}
      <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <img
          src={footerImg}
          alt="See you soon"
          className="w-full h-full object-cover"
        />

        {/* Lớp phủ tối nhẹ để làm nổi bật chữ (tùy chọn) */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Text Container */}
        <div className="absolute top-[36%] xs:top-[28%] mb:top-[32%] md:top-[28%] left-0 w-full text-center -translate-y-1/2 z-10 px-4">
          <h2 className="font-tempting text-wedding-beige text-[32px] md:text-6xl leading-none drop-shadow-lg">
            See you soon.
          </h2>
        </div>
      </section>
    </>
  );
}

export default Home;
