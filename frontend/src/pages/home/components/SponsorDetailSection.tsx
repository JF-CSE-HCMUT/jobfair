import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import "./SponsorDetailSection.css";

type Sponsor = {
    id: number;
    name: string;
    image: string;
    description: string;
    websiteUrl: string;
};

const sponsors: Sponsor[] = [
    {
        id: 1,
        name: "NVIDIA",
        image: "/NVIDIA2.png",
        description: "NVIDIA dẫn dắt làn sóng AI toàn cầu với nền tảng tính toán hiệu năng cao.",
        websiteUrl: "https://www.nvidia.com",
    },
    {
        id: 2,
        name: "VNG",
        image: "/VNG.png",
        description: "VNG là một trong những doanh nghiệp công nghệ tiêu biểu với hệ sinh thái số đa dạng.",
        websiteUrl: "https://vng.com.vn",
    },
    {
        id: 3,
        name: "KMS",
        image: "/KMS.png",
        description: "KMS tập trung phát triển sản phẩm phần mềm và nuôi dưỡng kỹ sư theo chuẩn quốc tế.",
        websiteUrl: "https://kms-technology.com",
    },
    {
        id: 4,
        name: "FPT Software",
        image: "/FS.png",
        description: "FPT Software có mạng lưới triển khai toàn cầu và môi trường kỹ thuật quy mô lớn.",
        websiteUrl: "https://fptsoftware.com",
    },
    {
        id: 5,
        name: "Sacombank",
        image: "/SACOM.png",
        description: "Sacombank đẩy mạnh chuyển đổi số và nhiều vị trí công nghệ trong lĩnh vực tài chính.",
        websiteUrl: "https://www.sacombank.com.vn",
    },
    {
        id: 6,
        name: "Veri Silicon",
        image: "/Veri.png",
        description: "Veri Silicon là doanh nghiệp nổi bật trong thiết kế vi mạch và giải pháp bán dẫn.",
        websiteUrl: "https://www.verisilicon.com",
    },
];

const SponsorDetailSection = () => {
    const [page, setPage] = useState(0);
    const perPage = 3;
    const pageCount = Math.ceil(sponsors.length / perPage);

    return (
        <section id="partners" className="home-sponsor-detail">
            <div className="home-sponsor-detail__container">
                <div className="home-sponsor-detail__header">
                    <h2>Đơn vị đồng hành</h2>
                    <div className="home-sponsor-detail__actions">
                        <button type="button" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
                            <ChevronLeft size={18} />
                        </button>
                        <button type="button" onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))} disabled={page >= pageCount - 1}>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                <div className="home-sponsor-detail__cards">
                    {sponsors.slice(page * perPage, (page + 1) * perPage).map((sponsor, index) => (
                        <motion.article
                            key={sponsor.id}
                            className="home-sponsor-detail__card"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="home-sponsor-detail__logo-wrap">
                                <img src={sponsor.image} alt={sponsor.name} />
                            </div>
                            <p>{sponsor.description}</p>
                            <a
                                href={sponsor.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="home-sponsor-detail__visit-link"
                                aria-label={`Truy cập trang chủ ${sponsor.name}`}
                            >
                                Trang chủ
                            </a>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SponsorDetailSection;
