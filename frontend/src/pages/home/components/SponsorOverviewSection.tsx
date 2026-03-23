import { motion } from "framer-motion";
import "./SponsorOverviewSection.css";

type Tier = {
    name: string;
    content: "diamond" | "gold" | "silver" | "bronze" | "empty";
};

const tiers: Tier[] = [
    { name: "Nhà tài trợ năm", content: "empty" },
    { name: "Kim cương", content: "diamond" },
    { name: "Vàng", content: "gold" },
    { name: "Bạc", content: "silver" },
    { name: "Đồng", content: "bronze" },
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
                    <div>
                        <h2 className="home-sponsor-overview__title">Chào mừng bạn đến với CSE JOB FAIR 2026</h2>
                        <p className="home-sponsor-overview__desc">
                            Kết nối với các công ty hàng đầu và khám phá cơ hội nghề nghiệp tại sự kiện việc làm lớn nhất của khoa.
                        </p>
                    </div>
                    <img src="/CSExJF.png" alt="CSE Job Fair" className="home-sponsor-overview__hero-logo" />
                </motion.div>

                <div className="home-sponsor-overview__tiers">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            className="home-sponsor-overview__tier"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.22 }}
                            transition={{ duration: 0.55, delay: index * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                        >
                            <p className="home-sponsor-overview__tier-name">{tier.name}</p>
                            {tier.content === "diamond" && (
                                <div className="home-sponsor-overview__tier-logos home-sponsor-overview__tier-logos--diamond">
                                    <img src="/NVIDIA2.png" alt="NVIDIA" />
                                    <img src="/VNG.png" alt="VNG" />
                                    <img src="/KMS.png" alt="KMS" />
                                </div>
                            )}

                            {tier.content === "gold" && (
                                <div className="home-sponsor-overview__tier-rows">
                                    <div className="home-sponsor-overview__tier-logos home-sponsor-overview__tier-logos--gold-row-3">
                                        <img src="/FS.png" alt="FPT Software" />
                                        <img src="/Veri.png" alt="Veri Silicon" />
                                        <img src="/Nexon.png" alt="Nexon" />
                                    </div>
                                    <div className="home-sponsor-overview__tier-logos home-sponsor-overview__tier-logos--gold-row-2">
                                        <img src="/ISB.png" alt="ISB" />
                                        <img src="/SACOM.png" alt="Sacombank" />
                                    </div>
                                </div>
                            )}

                            {tier.content === "silver" && (
                                <div className="home-sponsor-overview__tier-rows">
                                    <div className="home-sponsor-overview__tier-logos home-sponsor-overview__tier-logos--silver-row">
                                        <img src="/GL.png" alt="Gameloft" />
                                    </div>
                                </div>
                            )}

                            {tier.content === "bronze" && (
                                <div className="home-sponsor-overview__tier-rows">
                                    <div className="home-sponsor-overview__tier-logos home-sponsor-overview__tier-logos--bronze-row">
                                        <img src="/FJ.png" alt="Fujinet" />
                                        <img src="/BV.png" alt="BV" />
                                    </div>
                                </div>
                            )}

                            {tier.content === "empty" && <div className="home-sponsor-overview__tier-empty">Đang cập nhật nhà tài trợ</div>}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SponsorOverviewSection;
