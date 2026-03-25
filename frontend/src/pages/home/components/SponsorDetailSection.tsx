import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { partners, type Partner } from "../data/partnersData";
import "./SponsorDetailSection.css";

const withBase = (assetPath: string) => `${import.meta.env.BASE_URL}${assetPath}`;

const AUTO_SCROLL_MS = 5000;
const INTERACTION_SCROLL_MS = 15000;

const toPreviewText = (input: string, maxLen = 110) => {
    const compact = input.replace(/\s+/g, " ").trim();
    if (compact.length <= maxLen) {
        return compact;
    }

    return `${compact.slice(0, maxLen - 1).trimEnd()}…`;
};

const getPerPage = () => {
    if (typeof window === "undefined") {
        return 8;
    }

    if (window.innerWidth < 680) {
        return 2;
    }

    if (window.innerWidth < 1080) {
        return 4;
    }

    return 8;
};

const getCardsPerRow = (perPage: number) => {
    if (perPage >= 8) {
        return 4;
    }

    if (perPage >= 4) {
        return 2;
    }

    return 1;
};

const SponsorDetailSection = () => {
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(getPerPage);
    const [isCarouselPaused, setIsCarouselPaused] = useState(false);
    const [useSlowScroll, setUseSlowScroll] = useState(false);
    const [interactionTick, setInteractionTick] = useState(0);

    const resetAutoScrollDelay = () => {
        setUseSlowScroll(true);
        setInteractionTick((prev) => prev + 1);
    };

    const visiblePartners = useMemo(() => partners.filter((partner) => partner.logoFile.trim().length > 0), []);
    const pageCount = Math.max(1, Math.ceil(visiblePartners.length / perPage));
    const normalizedPage = page % pageCount;
    const cardsPerRow = getCardsPerRow(perPage);
    const cardsStyle = { "--cards-per-page": cardsPerRow } as CSSProperties;
    const pageItems = useMemo(() => {
        const start = normalizedPage * perPage;
        return visiblePartners.slice(start, start + perPage);
    }, [normalizedPage, perPage, visiblePartners]);

    useEffect(() => {
        const onResize = () => {
            setPerPage(getPerPage());
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        if (pageCount <= 1 || selectedPartner || isCarouselPaused) {
            return;
        }

        const delay = useSlowScroll ? INTERACTION_SCROLL_MS : AUTO_SCROLL_MS;
        const timer = window.setTimeout(() => {
            setPage((prev) => (prev + 1) % pageCount);
            if (useSlowScroll) {
                setUseSlowScroll(false);
            }
        }, delay);

        return () => window.clearTimeout(timer);
    }, [interactionTick, isCarouselPaused, pageCount, selectedPartner, useSlowScroll]);

    useEffect(() => {
        if (!selectedPartner) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedPartner(null);
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [selectedPartner]);

    return (
        <section id="partners" className="home-partners">
            <div className="home-partners__container">
                <div className="home-partners__header">
                    <h2>Các doanh nghiệp đồng hành cùng CSE Job Fair 2026</h2>
                    <div className="home-partners__pager" aria-label="Điều hướng đối tác đồng hành">
                        <button
                            type="button"
                            onClick={() => {
                                resetAutoScrollDelay();
                                setPage((prev) => (prev - 1 + pageCount) % pageCount);
                            }}
                            disabled={pageCount <= 1}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <p>{`${normalizedPage + 1}/${pageCount}`}</p>
                        <button
                            type="button"
                            onClick={() => {
                                resetAutoScrollDelay();
                                setPage((prev) => (prev + 1) % pageCount);
                            }}
                            disabled={pageCount <= 1}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                <motion.div
                    key={`${normalizedPage}-${perPage}`}
                    className="home-partners__cards"
                    style={cardsStyle}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
                    onMouseEnter={() => setIsCarouselPaused(true)}
                    onMouseLeave={() => setIsCarouselPaused(false)}
                    onClickCapture={resetAutoScrollDelay}
                    onFocusCapture={() => setIsCarouselPaused(true)}
                    onBlurCapture={(event) => {
                        const nextTarget = event.relatedTarget;
                        if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
                            return;
                        }
                        setIsCarouselPaused(false);
                    }}
                >
                    {pageItems.map((partner, index) => (
                        <motion.article
                            key={partner.id}
                            className="home-partners__card"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="home-partners__logo-wrap">
                                <img src={withBase(partner.logoFile)} alt={partner.name} loading="lazy" />
                            </div>
                            <h3 className="home-partners__company-name">{partner.name}</h3>
                            <p>{toPreviewText(partner.description, 130)}</p>
                            <ul className="home-partners__news-preview">
                                {partner.recruitmentNews.slice(0, 2).map((item) => (
                                    <li key={`${partner.id}-${item}`}>{toPreviewText(item, 92)}</li>
                                ))}
                            </ul>
                            <a
                                href={partner.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="home-partners__visit-link"
                                aria-label={`Truy cập trang chủ ${partner.name}`}
                            >
                                Trang chủ
                            </a>
                            <button
                                type="button"
                                className="home-partners__detail-btn"
                                onClick={() => setSelectedPartner(partner)}
                            >
                                Xem chi tiết tuyển dụng
                            </button>
                        </motion.article>
                    ))}
                </motion.div>

                {pageCount > 1 && (
                    <div className="home-partners__dots" role="tablist" aria-label="Trang đối tác đồng hành">
                        {Array.from({ length: pageCount }).map((_, dotIndex) => (
                            <button
                                key={`dot-${dotIndex}`}
                                type="button"
                                role="tab"
                                aria-selected={normalizedPage === dotIndex}
                                className={normalizedPage === dotIndex ? "is-active" : ""}
                                onClick={() => {
                                    resetAutoScrollDelay();
                                    setPage(dotIndex);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedPartner && (
                <div className="home-partners__modal-backdrop" role="presentation" onClick={() => setSelectedPartner(null)}>
                    <div
                        className="home-partners__modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="partner-detail-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="home-partners__modal-close"
                            aria-label="Đóng chi tiết"
                            onClick={() => setSelectedPartner(null)}
                        >
                            <X size={18} />
                        </button>

                        <div className="home-partners__modal-head">
                            <img src={withBase(selectedPartner.logoFile)} alt={selectedPartner.name} loading="lazy" />
                            <div>
                                <h3 id="partner-detail-title">{selectedPartner.name}</h3>
                                <a href={selectedPartner.websiteUrl} target="_blank" rel="noopener noreferrer">
                                    {selectedPartner.websiteUrl}
                                </a>
                            </div>
                        </div>

                        <p className="home-partners__modal-desc">{selectedPartner.description}</p>

                        <div className="home-partners__modal-block">
                            <p className="home-partners__modal-label">Tin tuyển dụng</p>
                            <ul>
                                {selectedPartner.recruitmentNews.map((item) => (
                                    <li key={`${selectedPartner.id}-${item}`}>{toPreviewText(item, 280)}</li>
                                ))}
                            </ul>
                        </div>

                        {selectedPartner.documents.length > 0 && (
                            <div className="home-partners__modal-block">
                                <p className="home-partners__modal-label">Tài liệu liên quan</p>
                                <ul>
                                    {selectedPartner.documents.map((url) => (
                                        <li key={url}>
                                            <a href={url} target="_blank" rel="noopener noreferrer">
                                                {url}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default SponsorDetailSection;
