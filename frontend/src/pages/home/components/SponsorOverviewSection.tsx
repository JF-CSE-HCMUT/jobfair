import { motion } from "framer-motion";
import "./SponsorOverviewSection.css";

type Tier = {
    name: string;
    logos: Array<{ src: string; alt: string }>;
};

const withBase = (assetPath: string) => `${import.meta.env.BASE_URL}${assetPath}`;

const tiers: Tier[] = [
    {
        name: "Kim cương",
        logos: [
            { src: withBase("VNG.png"), alt: "VNG" },
            { src: withBase("KMS.png"), alt: "KMS" },
            { src: withBase("NVIDIA.png"), alt: "NVIDIA" },
        ],
    },
    {
        name: "Vàng",
        logos: [
            { src: withBase("FPT.png"), alt: "FPT Software" },
            { src: withBase("SACOM.png"), alt: "Sacombank" },
            { src: withBase("Veri.png"), alt: "Veri Silicon" },
            { src: withBase("IVC.png"), alt: "IVC" },
            { src: withBase("Nexon.png"), alt: "Nexon" },
        ],
    },
    {
        name: "Bạc",
        logos: [{ src: withBase("GL.png"), alt: "Gameloft" }],
    },
    {
        name: "Đồng",
        logos: [
            { src: withBase("FJ.png"), alt: "Fujinet" },
            { src: withBase("BV.png"), alt: "BV" },
        ],
    },
];

const SponsorOverviewSection = () => {
    return (
        <section id="sponsors" className="home-sponsor-overview">
            <div className="home-sponsor-overview__container">
                <motion.div
                    className="home-sponsor-overview__intro"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="home-sponsor-overview__intro-copy">
                        <h2 className="home-sponsor-overview__title">Chào mừng bạn đến với Ngày hội Việc làm - CSE JOB FAIR 2026</h2>
                        <p className="home-sponsor-overview__desc">
                            Sự kiện thường niên do khoa Khoa học và Kỹ thuật Máy tính, trường Đại học Bách khoa - ĐHQG-HCM tổ chức nhằm kết nối sinh viên với các doanh nghiệp hàng đầu trong lĩnh vực công nghệ. CSE Job Fair 2026 hứa hẹn mang đến một ngày hội việc làm sôi động với sự tham gia của nhiều nhà tuyển dụng uy tín, cơ hội thực tập và việc làm hấp dẫn, cùng nhiều hoạt động thú vị khác. 
                            Hãy cùng khám phá và tận dụng cơ hội để định hướng tương lai nghề nghiệp của bạn tại CSE Job Fair 2026!
                        </p>
                    </div>
                    <img src={withBase("logo.png")} alt="CSE Job Fair" className="home-sponsor-overview__hero-logo" />
                </motion.div>

                <div className="home-sponsor-overview__tiers">
                    <p className="home-sponsor-overview__tier-name home-sponsor-overview__tier-name--annual">CÁC DOANH NGHIỆP TÀI TRỢ NĂM</p>
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            className="home-sponsor-overview__tier"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.22 }}
                            transition={{ duration: 0.55, delay: index * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                        >
                            <p className="home-sponsor-overview__tier-name">{`NHÀ TÀI TRỢ ${tier.name}`}</p>
                            {tier.logos.length > 0 ? (
                                <div className="home-sponsor-overview__tier-logos" aria-label={`Nhà tài trợ hạng ${tier.name}`}>
                                    {tier.logos.map((logo) => (
                                        <div key={logo.alt} className="home-sponsor-overview__tier-logo-item">
                                            <img src={logo.src} alt={logo.alt} />
                                            <span className="home-sponsor-overview__logo-spot-name">{logo.alt}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="home-sponsor-overview__tier-empty">Đang cập nhật nhà tài trợ</div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SponsorOverviewSection;
