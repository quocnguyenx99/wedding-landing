import React, { useMemo } from "react";
import heroSrc from "../assets/images/banner-img.jpg";

import sectionInfo1 from "../assets/images/section-info-1.jpg";
import sectionInfoMain from "../assets/images/section-info-main.jpg";
import sectionInfo2 from "../assets/images/section-info-2.jpg";

import sectionInfoRow1 from "../assets/images/section-info-row-1.jpg";
import sectionInfoRow2 from "../assets/images/section-info-row-2.jpg";
import sectionInfoRow3 from "../assets/images/section-info-row-3.jpg";

function Home() {
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
        `}
      </style>

      {/* HERO */}
      <section className="relative h-[76vh] min-h-[560px] w-full overflow-hidden">
        {/* Banner image */}
        <img
          src={heroSrc}
          alt="Wedding banner"
          className=" absolute left-0 top-0 h-[110%] w-full object-cover -translate-y-[16%] md:h-[115%] md:-translate-y-[12%]"
        />

        {/* Overlay*/}
        <div className="absolute inset-0 z-10 bg-black/70" />

        {/* --- HIỆU ỨNG ĐỐM SÁNG (Đặt sau Overlay, trước Content) --- */}
        <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
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
        <div className="absolute inset-0 z-20 flex justify-center px-4 mt-36">
          <div className="relative top-0 flex flex-row  text-wedding-white">
            <div className="font-script text-wedding-beige text-[4rem] leading-[0.6] md:text-[16rem] -mr-2 md:-mr-6 pb-4">
              S
            </div>

            {/* Right side content */}
            <div className="flex flex-col items-start">
              <p className="font-sans text-wedding-beige font-light text-[10px] md:text-[16px] mb-1 ml-6 md:ml-32 whitespace-nowrap">
                Hasley Huong Nghiem &amp; JB Moni Lek
              </p>

              <h1 className="font-script text-wedding-beige text-4xl font-normal leading-none md:text-8xl">
                ave the date
              </h1>

              <p className="font-sans text-wedding-beige text-[20px] font-extralight tracking-[0.1em] md:text-4xl w-full text-center">
                08 / 08 / 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: WE ARE GETTING MARRIED --- */}

      <section className="relative z-30 w-full bg-wedding-beige -mt-80 rounded-t-[50vw] pt-24 pb-48 px-6 text-center overflow-hidden">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-script text-[28px] md:text-8xl">
            We are getting married!
          </h2>

          <div className="max-w-xl text-center">
            <p className="font-sans font-light text-[8px] md:text-lg tracking-wide leading-relaxed">
              We are delighted to invite you to celebrate our wedding as we
              exchange vows.
            </p>
            <p className="font-sans font-light text-[8px] md:text-lg tracking-wide leading-relaxed mt-2">
              and share this joyful moment with our dearest family and friends.
            </p>
          </div>
        </div>
      </section>

      {/* --- IMAGE GALLERY SECTION --- */}
      <section className="relative z-40 mx-auto -mt-44 h-[390px] w-full max-w-6xl md:-mt-64 md:h-[900px]">
        <div className="absolute left-1/2 top-0 z-10 h-[300px] w-[180px] -translate-x-1/2 overflow-hidden rounded-t-full md:h-[750px] md:w-[450px]">
          <img
            src={sectionInfoMain}
            alt="Center Couple"
            className="h-full w-full object-cover"
          />
          {/* Text Overlay: Hương and Moni */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-6 text-white md:pt-24">
            <span className="font-display text-2xl font-medium md:text-8xl drop-shadow-lg">
              Hương
            </span>
            <span className="my-1 font-display text-xs font-light tracking-widest md:my-3 md:text-xl">
              and
            </span>
            <span className="font-display text-2xl font-medium md:text-8xl drop-shadow-lg">
              Moni
            </span>
          </div>
        </div>
        {/* 2. LEFT IMAGE (Landscape, B&W) */}
        {/* Đè lên hình giữa (z-20) */}
        <div className="absolute bottom-16 left-2 z-20 h-[160px] w-[100px] overflow-hidden md:bottom-20 md:left-10 md:h-[450px] md:w-[320px]">
          <img
            src={sectionInfo1} // Thay bằng hình trái
            alt="Left Moment"
            className="h-full w-full object-cover grayscale"
          />
        </div>

        {/* 3. RIGHT IMAGE (Landscape, B&W) */}
        {/* Đè lên hình giữa (z-20) */}
        <div className="absolute bottom-0 right-0 z-20 h-[120px] w-[190px] overflow-hidden md:bottom-10 md:right-10 md:h-[350px] md:w-[480px]">
          <img
            src={sectionInfo2} // Thay bằng hình phải
            alt="Right Moment"
            className="h-full w-full object-cover grayscale"
          />
        </div>
      </section>

      {/* --- THREE IMAGES SECTION --- */}
      <section className="relative  z-30 w-full bg-wedding-beige mt-2 px-0 pb-20 md:px-10 md:pb-32">
        <div className="grid grid-cols-3 gap-1 md:gap-4 max-w-7xl mx-auto h-[200px] md:h-[600px]">
          {/* Image 1 */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={sectionInfoRow1} // Replace with your first image
              alt="Couple Moment 1"
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Image 2 */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={sectionInfoRow2} // Replace with your second image
              alt="Couple Moment 2"
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Image 3 */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={sectionInfoRow3} // Replace with your third image
              alt="Couple Moment 3"
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
