import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const heroBackgroundImages = ["/10.jpg", "/9.jpg", "/8.jpg","/7.jpg","/6.jpg","/5.jpg","/4.jpg","/3.jpg","/2.jpg","/1.jpg"];
const HERO_ROTATION_MS = 3000;

const HeroSection = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (heroBackgroundImages.length <= 1) {
      return;
    }

    const rotateBackground = () => {
      setBackgroundIndex((current) => (current + 1) % heroBackgroundImages.length);
    };

    const clearRotationTimer = () => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    };

    const scheduleNextRotation = () => {
      timeoutRef.current = window.setTimeout(() => {
        rotateBackground();

        if (!document.hidden) {
          scheduleNextRotation();
        }
      }, HERO_ROTATION_MS);
    };

    const handleVisibilityChange = () => {
      clearRotationTimer();

      if (!document.hidden) {
        scheduleNextRotation();
      }
    };

    if (!document.hidden) {
      scheduleNextRotation();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearRotationTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-hero">
      {/* Animated background elements */}
      <div className="absolute inset-x-4 inset-y-12 sm:inset-x-8 sm:inset-y-14 md:inset-x-12 md:inset-y-[4.5rem] lg:inset-x-16 lg:inset-y-12 rounded-3xl overflow-hidden ring-1 ring-white/10">
        <AnimatePresence mode="sync" initial={false}>
          <motion.img
            key={heroBackgroundImages[backgroundIndex]}
            src={heroBackgroundImages[backgroundIndex]}
            alt=""
            aria-hidden="true"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              " linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-primary-foreground/40 text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="text-primary-foreground/40" size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
