import "./Footer.css";

const quickLinks = [
    { label: "Trang chủ", href: "/#overview" },
    { label: "Tài trợ", href: "/#sponsors" },
    { label: "Đồng hành", href: "/#partners" },
    { label: "Hành trình", href: "/#milestones" },
    { label: "Bộ nhận diện", href: "/brand-assets" },
    { label: "Bản đồ", href: "/#venue-map" },
];

const Footer = () => {
    return (
        <footer id="contact" className="shared-footer">
            <div className="shared-footer__inner">
                <div className="shared-footer__brand">
                    <img src="/logo.png" alt="CSE Job Fair" className="shared-footer__logo" />
                    <div className="shared-footer__brand-copy">
                        <p className="shared-footer__title">CSE JOB FAIR 2026</p>
                        <p className="shared-footer__subtitle">Ngày hội Việc làm khoa Khoa học và Kỹ thuật Máy tính</p>
                    </div>
                </div>

                <div className="shared-footer__links">
                    <p className="shared-footer__heading">Truy cập nhanh</p>
                    {quickLinks.map((item) => (
                        <a key={item.label} href={item.href} className="shared-footer__link">
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="shared-footer__contact">
                    <p className="shared-footer__heading">Liên hệ</p>
                    <p className="shared-footer__contact-line">
                        Sân tòa BK.B6, Trường Đại học Bách khoa - ĐHQG-HCM, cơ sở Dĩ An, TP. Hồ Chí Minh.
                    </p>
                    <div className="shared-footer__mail-group">
                        <p className="shared-footer__mail-title">Đoàn Thanh niên - Hội Sinh viên khoa KH&KT Máy tính</p>
                        <a href="mailto:dtn-ktmt@hcmut.edu.vn" className="shared-footer__mail-link">dtn-ktmt@hcmut.edu.vn</a>
                    </div>
                    <div className="shared-footer__mail-group">
                        <p className="shared-footer__mail-title">Ban tổ chức CSE Job Fair 2026</p>
                        <a href="mailto:csemultimedia@hcmut.edu.vn" className="shared-footer__mail-link">csemultimedia@hcmut.edu.vn</a>
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
