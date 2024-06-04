"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../app/globals.css"; 

gsap.registerPlugin(ScrollTrigger);

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = nameRef.current;
    if (!name) return;

    // スクロールに合わせて名前の画像を縮小しながら左上にアニメーション
    gsap.to(name, {
      scale: 0.4,
      x: "-50%",
      y: "-51%",
      ease: "power1.inOut", 
      scrollTrigger: {
        trigger: name,
        scrub: 1,
        start: "top top", // class_heroの上部がビューポートの上部に達したとき
        end: "bottom top", // class_heroの下部がビューポートの上部に達したとき
        markers: false, // デバッグ用
      },
    });
  }, []);

  return (
    <>
      <div className="pointer-events-none w-full h-full fixed top-0 left-0 z-50">
        <div ref={nameRef} className="w-[1400px] h-[800px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            width={200}
            height={200}
            src={"/images/name_data.svg"}
            alt="名前の手書き画像"
            className="class_name-img w-full h-full object-fit-contain"
          />
        </div>
      </div>
      {children}
    </>
  );
};

export default ClientLayout;
