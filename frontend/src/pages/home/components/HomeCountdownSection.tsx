import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import hero01 from "../../../assets/hero/hero-01.jpg";
import hero02 from "../../../assets/hero/hero-02.jpg";
import hero03 from "../../../assets/hero/hero-03.jpg";
import hero04 from "../../../assets/hero/hero-04.jpg";
import hero05 from "../../../assets/hero/hero-05.jpg";
import hero06 from "../../../assets/hero/hero-06.jpg";
import hero07 from "../../../assets/hero/hero-07.jpg";
import hero08 from "../../../assets/hero/hero-08.jpg";
import hero09 from "../../../assets/hero/hero-09.jpg";
import hero10 from "../../../assets/hero/hero-10.jpg";
import "./HomeCountdownSection.css";

const heroImages = [hero10, hero09, hero08, hero07, hero06, hero05, hero04, hero03, hero02, hero01];
const targetDate = new Date("2026-03-28T07:00:00");
const HERO_ROTATION_MS = 6500;
const HOME_VIDEO_EMBED_URL =
    "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1&mute=1&controls=1&loop=1&playlist=aqz-KE-bpKQ&playsinline=1&rel=0";

const HomeCountdownSection = () => {
    const [activeImage, setActiveImage] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const videoSectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ticker = window.setInterval(() => {
            setActiveImage((prev) => (prev + 1) % heroImages.length);
        }, HERO_ROTATION_MS);

        return () => window.clearInterval(ticker);
    }, []);

    useEffect(() => {
        const timer = window.setInterval(() => {
            const now = Date.now();
            const diff = Math.max(0, targetDate.getTime() - now);

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                mins: Math.floor((diff / (1000 * 60)) % 60),
                secs: Math.floor((diff / 1000) % 60),
            });
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        if (shouldLoadVideo || !videoSectionRef.current) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoadVideo(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "300px 0px" },
        );

        observer.observe(videoSectionRef.current);

        return () => observer.disconnect();
    }, [shouldLoadVideo]);

    const countdownItems = useMemo(
        () => [
            { label: "Ngày", value: timeLeft.days },
            { label: "Giờ", value: timeLeft.hours },
            { label: "Phút", value: timeLeft.mins },
            { label: "Giây", value: timeLeft.secs },
        ],
        [timeLeft.days, timeLeft.hours, timeLeft.mins, timeLeft.secs],
    );

    return (
        <section id="overview" className="home-countdown">
            <div className="home-countdown__hero">
                <div className="home-countdown__bg-wrap" aria-hidden="true">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.img
                            key={heroImages[activeImage]}
                            src={heroImages[activeImage]}
                            alt=""
                            aria-hidden="true"
                            className="home-countdown__bg-image"
                            initial={{ x: "100%" }}
                            animate={{ x: "0%" }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 1.15, ease: [0.2, 0.8, 0.2, 1] }}
                        />
                    </AnimatePresence>
                    <div className="home-countdown__bg-overlay" />
                </div>

                <div className="home-countdown__content">
                    <div className="home-countdown__brand-row" aria-hidden="true">
                        <img src="/logo.png" alt="" className="home-countdown__brand-logo" />
                        <img src="/CSExJF.png" alt="" className="home-countdown__brand-mark" />
                    </div>

                    <h1 className="home-countdown__title">SỰ KIỆN SẼ BẮT ĐẦU SAU</h1>

                    <div className="home-countdown__timer">
                        {countdownItems.map((item) => (
                            <div key={item.label} className="home-countdown__timer-item">
                                <div className="home-countdown__timer-value">{String(item.value).padStart(2, "0")}</div>
                                <span className="home-countdown__timer-label">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="home-countdown__actions">
                        <Link to="/register" className="home-countdown__register-btn">
                            ĐĂNG KÝ
                        </Link>
                    </div>
                </div>
            </div>

            <div className="home-countdown__video-section" ref={videoSectionRef}>
                <div className="home-countdown__video-wrap">
                    {shouldLoadVideo ? (
                        <iframe
                            src={HOME_VIDEO_EMBED_URL}
                            title="Video giới thiệu CSE Job Fair"
                            className="home-countdown__video"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    ) : (
                        <div className="home-countdown__video-placeholder">Video giới thiệu CSE Job Fair 2026</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HomeCountdownSection;
