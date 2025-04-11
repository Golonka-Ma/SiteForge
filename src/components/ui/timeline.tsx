"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Calculate which item should be active based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
    const itemHeight = height / data.length;
    const newIndex = Math.min(
      Math.floor((latest * height) / itemHeight),
      data.length - 1
    );
    setActiveIndex(newIndex);
  });

  // Calculate text position based on scroll progress
  const getTextPosition = (index: number) => {
    const itemHeight = height / data.length;
    const itemStart = (index * itemHeight) / height;
    const itemEnd = ((index + 1) * itemHeight) / height;
    
    if (scrollProgress < itemStart) return -100;
    if (scrollProgress > itemEnd) return 100;
    
    const progressInItem = (scrollProgress - itemStart) / (itemEnd - itemStart);
    return progressInItem * 100 - 100;
  };

  return (
    <div
      className="w-full bg-white font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 max-w-4xl">
          Historia projektu
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-sm">
          Poznaj etapy realizacji naszego projektu krok po kroku.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div 
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-100"
                style={{
                  scale: activeIndex === index ? 1.2 : 1,
                  boxShadow: activeIndex === index ? "0 0 20px rgba(99, 102, 241, 0.5)" : "0 0 10px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease"
                }}
              >
                <motion.div 
                  className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  animate={{
                    scale: activeIndex === index ? [1, 1.2, 1] : 1,
                    opacity: activeIndex === index ? [0.5, 1, 0.5] : 0.5
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <motion.h3
                style={{
                  y: `${getTextPosition(index)}%`,
                  opacity: activeIndex === index ? 1 : 0.3,
                  scale: activeIndex === index ? 1.1 : 1,
                }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeOut"
                }}
                className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-gray-800"
              >
                {item.title}
              </motion.h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-gray-800">
                {item.title}
              </h3>
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 transform-gpu"
              >
                {item.content}
              </motion.div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-gray-200 to-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}; 