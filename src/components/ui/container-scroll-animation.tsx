"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue, easeOut } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.75, 0.8, 0.85, 0.9, 0.9] : [1.05, 1.04, 1.03, 1.02, 1.01, 1];
  };

  const rotate = useTransform(scrollYProgress, [-0.3, 0, 0.1, 0.2, 0.3, 0.4], [25, 20, 15, 10, 5, 0], { ease: easeOut });
  const scale = useTransform(scrollYProgress, [-0.3, 0, 0.1, 0.2, 0.3, 0.4], scaleDimensions(), { ease: easeOut });
  const translate = useTransform(scrollYProgress, [-0.3, 0, 0.1, 0.2, 0.3, 0.4], [20, 0, -25, -50, -75, -100], { ease: easeOut });

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-start justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center mb-8"
    >
      <div className="w-16 h-1 mb-4 rounded mx-auto" style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }}></div>
      <h3 
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{ 
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      >
        {titleComponent}
      </h3>
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl mx-auto h-[40rem] md:h-[50rem] w-full border-4 border-[#3b82f6] p-2 md:p-6 bg-[#b91c1c] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
}; 