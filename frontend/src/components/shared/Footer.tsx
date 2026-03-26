import { Link } from "react-router-dom";
import "./Footer.css";

const quickLinks = [
    { label: "Trang chủ", href: "/#overview" },
    { label: "Tài trợ", href: "/#sponsors" },
    { label: "Đồng hành", href: "/#partners" },
    { label: "Hành trình", href: "/#milestones" },
    { label: "Seminars", href: "/seminars" },
    { label: "Bộ nhận diện", href: "/brand-assets" },
    { label: "Bản đồ", href: "/#venue-map" },
];

const Footer = () => {
    const logoSrc = `${import.meta.env.BASE_URL}logo-name.png`;

    return (
        <footer id="contact" className="shared-footer">
            <div className="shared-footer__inner">
                <div className="shared-footer__brand">
                    <img src={logoSrc} alt="CSE Job Fair" className="shared-footer__logo" />
                    <div className="shared-footer__brand-copy">
                        <p className="shared-footer__subtitle">Ngày hội Việc làm - CSE Job Fair là cầu nối thường niên quan trọng, giúp sinh viên ngành Công nghệ thông tin định hướng và nắm bắt cơ hội nghề nghiệp, đồng thời hỗ trợ doanh nghiệp chiêu mộ nguồn nhân lực chất lượng cao.</p>
                    </div>
                </div>

                <div className="shared-footer__links">
                    <p className="shared-footer__heading">TRUY CẬP NHANH</p>
                    {quickLinks.map((item) => (
                        <Link key={item.label} to={item.href} className="shared-footer__link">
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="shared-footer__infos">
                    <p className="shared-footer__heading">THÔNG TIN SỰ KIỆN</p>
                    <p className="shared-footer__info-time-title">Khai mạc</p>
                    <p className="shared-footer__info-time">07g30, ngày 28/03/2026</p>
                    <p className="shared-footer__info-place-title">Địa điểm</p>
                    <p className="shared-footer__info-place">
                        Sân BK.B6, Trường Đại học Bách khoa - ĐHQG-HCM, cơ sở 2
                    </p>
                </div>

                <div className="shared-footer__contact">
                    <p className="shared-footer__heading">LIÊN HỆ</p>
                    <div className="shared-footer__mail-group">
                        <p><span className="shared-footer__mail-label">Email: </span><a href="mailto:dtn-ktmt@hcmut.edu.vn" className="shared-footer__mail-link">dtn-ktmt@hcmut.edu.vn</a></p>
                    </div>
                    <div className="shared-footer__mail-group">
                        <p><span className="shared-footer__mail-label">Fanpage: </span><a href="https://www.facebook.com/BKCSE.Multimedia" className="shared-footer__mail-title">Ban Truyền thông khoa KH-KT Máy tính</a></p>
                    </div>
                </div>
            </div>

            <div className="shared-footer__bottom">
                <p>© 2026 CSE Job Fair. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
