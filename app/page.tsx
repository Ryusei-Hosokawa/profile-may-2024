"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClientLayout from "@/components/client-layout";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!container || !video || !hero) return;

    const sections = gsap.utils.toArray<HTMLDivElement>(
      ".class_container > .class_flex-box > section, .class_container > footer"
    );

    const updateWidth = () => {
      const totalWidth = sections.length * window.innerWidth;
      container.style.width = `${totalWidth}px`;
    };

    updateWidth();

    // 横スクロールのアニメーション
    gsap.to(container, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
        markers: true, // デバッグ用
      },
    });

    // ビデオのサイズを縮小するアニメーション
    gsap.to(video, {
      scale: 0.5,
      borderRadius: "300px",
      opacity: 0,
      x: "20%",
      scrollTrigger: {
        trigger: hero,
        scrub: 1,
        start: "top top", // class_heroの上部がビューポートの上部に達したとき
        end: "bottom top", // class_heroの下部がビューポートの上部に達したとき
        markers: false, // デバッグ用
      },
    });

    const handleResize = () => {
      updateWidth();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <ClientLayout />
      <main>
        <div ref={containerRef} className="class_container overflow-x-hidden">
          <div className="class_flex-box flex">
            <section
              ref={heroRef}
              className="class_hero min-w-[100vw] w-[100vw] h-[100vh] relative"
            >
              <video
                ref={videoRef}
                className="pointer-events-none absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
                autoPlay
                loop
                muted
              >
                <source src="/videos/hero_video.mp4" type="video/mp4" />
              </video>
            </section>
            <section className="class_introduction w-fit h-[100vh] flex">
              <div className="class__about-area">
                <h2 className="font-abril text-[#BD6060] text-[300px]">
                  ABOUT
                </h2>
                <div className="flex gap-[10px]">
                  <h3 className="text-[14px] font-[600] text-[#BD6060]">私について</h3>
                  <div className="w-full max-w-[225px]">
                    <h4 className="text-[18px] mt-[-5px] mb-[5px]">Hosokawa Ryusei</h4>
                    <p className="text-[14px]">
                      <span>
                        1999年に北海道札幌市で生まれ育ち製菓の専門学校を卒業後、
                        <br />
                        フレンチレストランでパティシエとしてスキルを身につける。
                      </span>
                      <span>
                        一人前に仕事を出来るようになり新しいことに挑戦したいと思い、
                        <br />
                        以前から興味のあったIT業界に入るため職業訓練校に入りWEBフロントエンドの勉強をし現在に至ります。
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="class__interest-area">
                <h2 className="font-abril text-[#BD6060] text-[300px]">
                  INTEREST
                </h2>
                <p>
                  私は物作りが昔から好きで趣味で写真動画の撮影から編集をすることや、
                  <br />
                  絵を描いたり最近ではコーダーのポジションに近いデザインも興味があったり、
                  <br />
                  JSやその系統のライブラリやフレームワークなどにも関心が高く勉強し始めています。
                  どれも奥が深く難しいですが一つ一つ学んでいきたいと思っています。
                </p>
              </div>
            </section>
          </div>
          <section className="class_portfolios w-[100vw] h-[100vh] bg-[#F9FAF5]">
            <div className="class__description-area">
              <h2 className="font-abril text-[#BD6060] text-[300px]">
                PORTFOLIO
              </h2>
              <p className="text-center">
                HTML、CSSのみのシンプルな実装でコーディングの練習をしたものや、
                <br />
                通っていた訓練校のサイトをデザインから作り直し実装したもの、
                <br />
                SCSSのmixinなどの機能を使用しアトミックデザインのロジックで
                <br />
                構成を考え実装したものなど実験的に手を動かしてアウトプットポートフォリオの一覧です。
              </p>
            </div>
          </section>
          <section className="class_portfolios w-[100vw] h-[100vh] bg-[#F9FAF5]"></section>
        </div>
      </main>
      <footer className="w-[100vw] h-[100vh] bg-[#F9FAF5]"></footer>
    </>
  );
};

export default Home;
