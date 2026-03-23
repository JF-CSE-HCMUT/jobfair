import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import HomeCountdownSection from "./components/HomeCountdownSection";
import SponsorOverviewSection from "./components/SponsorOverviewSection";
import SponsorDetailSection from "./components/SponsorDetailSection";
import MilestonesSection from "./components/MilestonesSection";
import "./HomePage.css";

const VenueMapSection = lazy(() => import("./components/VenueMapSection"));

const HomePage = () => {
    const [shouldRenderMap, setShouldRenderMap] = useState(false);
    const mapTriggerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (shouldRenderMap || !mapTriggerRef.current) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRenderMap(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "260px 0px" },
        );

        observer.observe(mapTriggerRef.current);

        return () => observer.disconnect();
    }, [shouldRenderMap]);

    return (
        <div className="home-page">
            <Navbar />
            <main className="home-page__main">
                <HomeCountdownSection />
                <SponsorOverviewSection />
                <SponsorDetailSection />
                <MilestonesSection />
                {shouldRenderMap ? (
                    <Suspense
                        fallback={
                            <section id="venue-map" className="home-page__map-placeholder">
                                <div className="home-page__map-placeholder-inner">
                                    <h2>Bản đồ 3D khu vực sự kiện</h2>
                                    <p>Đang tải bản đồ 3D...</p>
                                </div>
                            </section>
                        }
                    >
                        <VenueMapSection modelUrl="/Map.glb" />
                    </Suspense>
                ) : (
                    <section id="venue-map" className="home-page__map-placeholder" ref={mapTriggerRef}>
                        <div className="home-page__map-placeholder-inner">
                            <h2>Bản đồ 3D khu vực sự kiện</h2>
                            <p>Bản đồ sẽ tải khi bạn cuộn gần đến phần này để tối ưu hiệu năng trang.</p>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
