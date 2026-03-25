import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import HomeCountdownSection from "./components/HomeCountdownSection";
import SponsorOverviewSection from "./components/SponsorOverviewSection";
import SponsorDetailSection from "./components/SponsorDetailSection";
import MilestonesSection from "./components/MilestonesSection";
import "./HomePage.css";

const VenueMapSection = lazy(() => import("./components/VenueMapSection"));
const MAP_MODEL_CANDIDATES = [
    `${import.meta.env.BASE_URL}Map3D.glb`,
    `${import.meta.env.BASE_URL}Map.glb`,
    `${import.meta.env.BASE_URL}Map`,
    "https://media.githubusercontent.com/media/PenguAKAuseless/public-web-JF/main/frontend/public/Map3D.glb",
    "https://media.githubusercontent.com/media/PenguAKAuseless/public-web-JF/main/frontend/public/Map.glb",
];
const MAP_RETRY_DELAY_MS = 30_000;
const MAP_MAX_RETRIES = 2;

const HomePage = () => {
    const [shouldRenderMap, setShouldRenderMap] = useState(false);
    const [mapModelUrl, setMapModelUrl] = useState(MAP_MODEL_CANDIDATES[0]);
    const [isMapModelResolved, setIsMapModelResolved] = useState(false);
    const [mapResolveStatus, setMapResolveStatus] = useState<"idle" | "checking" | "ready" | "failed">("idle");
    const [mapRetryCount, setMapRetryCount] = useState(0);
    const mapTriggerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!shouldRenderMap) {
            return;
        }

        let cancelled = false;
        let retryTimer: number | undefined;

        const resolveMapUrl = async (attempt = 0) => {
            if (!cancelled) {
                setMapResolveStatus("checking");
                setMapRetryCount(attempt);
            }

            for (const candidate of MAP_MODEL_CANDIDATES) {
                try {
                    const response = await fetch(candidate, { method: "HEAD" });
                    if (!cancelled && (response.ok || response.status === 405)) {
                        setMapModelUrl(candidate);
                        setMapResolveStatus("ready");
                        setIsMapModelResolved(true);
                        return;
                    }
                } catch {
                    // Try next candidate URL.
                }
            }

            if (!cancelled) {
                if (attempt < MAP_MAX_RETRIES) {
                    retryTimer = window.setTimeout(() => {
                        void resolveMapUrl(attempt + 1);
                    }, MAP_RETRY_DELAY_MS);
                    return;
                }

                setMapResolveStatus("failed");
                setIsMapModelResolved(true);
            }
        };

        void resolveMapUrl();

        return () => {
            cancelled = true;
            if (retryTimer) {
                window.clearTimeout(retryTimer);
            }
        };
    }, [shouldRenderMap]);

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
                                    <h2>Bản đồ khu vực sự kiện</h2>
                                    <p>Đang tải bản đồ...</p>
                                </div>
                            </section>
                        }
                    >
                        <VenueMapSection
                            modelUrl={mapModelUrl}
                            is3dReady={isMapModelResolved && mapResolveStatus === "ready"}
                            is3dFailed={isMapModelResolved && mapResolveStatus === "failed"}
                            retryLabel={mapRetryCount > 0 ? `lần thử ${mapRetryCount + 1}/${MAP_MAX_RETRIES + 1}` : null}
                        />
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
