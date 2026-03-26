import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import "./BrandAssetsPage.css";

type PaletteColor = {
    hex: string;
    rgb: string;
    cmyk: string;
};

const withBase = (assetPath: string) => `${import.meta.env.BASE_URL}${assetPath}`;

const primaryColors: PaletteColor[] = [
    { hex: "#0e0140", rgb: "R=14 G=1 B=64", cmyk: "CMYK 97 97 33 55" },
    { hex: "#ff6b2c", rgb: "R=255 G=107 B=44", cmyk: "CMYK 0 72 89 0" },
    { hex: "#7521ff", rgb: "R=117 G=33 B=255", cmyk: "CMYK 71 78 0 0" },
];

const secondaryColors: PaletteColor[] = [
    { hex: "#4cd6fe", rgb: "R=76 G=214 B=254", cmyk: "CMYK 54 0 1 0" },
    { hex: "#ffd700", rgb: "R=255 G=215 B=0", cmyk: "CMYK 1 13 100 0" },
    { hex: "#d9d9d9", rgb: "R=217 G=217 B=217", cmyk: "CMYK 14 10 11 0" },
    { hex: "#022b90", rgb: "R=2 G=43 B=144", cmyk: "CMYK 100 93 1 14" },
];

const fontDownloadUrl =
    "https://fonts.google.com/share?selection.family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900|Barlow+Semi+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900|Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900";

const BrandAssetsPage = () => {
    return (
        <div className="brand-assets-page">
            <Navbar />
            <main className="brand-assets-page__main">
                <section className="brand-assets-page__section">
                    <div className="brand-assets-page__container">
                        <section className="brand-assets-page__hero">
                            <p className="brand-assets-page__eyebrow">Brand Guideline</p>
                            <h1>Bộ nhận diện thương hiệu CSE JOB FAIR 2026</h1>
                            <p>
                                Trang guideline tổng hợp logo, font chữ, lưới an toàn và bảng màu chính thức để sử dụng nhất quán.
                            </p>
                        </section>

                        <section className="brand-assets-page__sheet" aria-label="Nội dung guideline thương hiệu">
                            <article className="brand-assets-page__block brand-assets-page__top-row">
                                <div className="brand-assets-page__top-item">
                                    <h2>Logo chính</h2>
                                    <div className="brand-assets-page__media-frame">
                                        <img src={withBase("brand-assets/logo.png")} alt="Logo chính CSE Job Fair" className="brand-assets-page__logo-main" />
                                    </div>
                                    <a href={withBase("brand-assets/logo.png")} download="cse-job-fair-logo.png" className="brand-assets-page__download-link">Tải logo chính</a>
                                </div>

                                <div className="brand-assets-page__top-item">
                                    <h2>Lưới và khoảng cách an toàn</h2>
                                    <div className="brand-assets-page__media-frame">
                                        <img src={withBase("brand-assets/logo-net.png")} alt="Lưới an toàn logo CSE Job Fair" className="brand-assets-page__guide-image" />
                                    </div>
                                    <a href={withBase("brand-assets/logo-net.png")} download="cse-job-fair-logo-net.png" className="brand-assets-page__download-link">Tải lưới logo</a>
                                </div>
                            </article>

                            <article className="brand-assets-page__block brand-assets-page__block--center">
                                <h2>Ý tưởng</h2>
                                <div className="brand-assets-page__idea-grid">
                                    <div className="brand-assets-page__idea-item">
                                        <img src={withBase("brand-assets/JF.png")} alt="JF" />
                                        <span>Tên viết tắt của Job Fair</span>
                                    </div>
                                    <div className="brand-assets-page__idea-item brand-assets-page__idea-item--number">
                                        <strong>20</strong>
                                        <span>20 năm tổ chức</span>
                                    </div>
                                    <div className="brand-assets-page__idea-item">
                                        <img src={withBase("brand-assets/magnifier.png")} alt="Kính lúp" />
                                        <span>Kính lúp</span>
                                    </div>
                                    <div className="brand-assets-page__idea-item">
                                        <img src={withBase("brand-assets/employee.png")} alt="Nhân viên" />
                                        <span>Nhân viên</span>
                                    </div>
                                </div>
                            </article>

                            <article className="brand-assets-page__block brand-assets-page__block--center">
                                <h2>Logo phụ</h2>
                                <img src={withBase("brand-assets/sub-logo.png")} alt="Logo phụ CSE Job Fair" className="brand-assets-page__logo-sub" />
                                <a href={withBase("brand-assets/sub-logo.png")} download="cse-job-fair-sub-logo.png" className="brand-assets-page__download-link">Tải logo phụ</a>
                            </article>

                            <article className="brand-assets-page__block brand-assets-page__block--center">
                                <h2>Typography</h2>
                                <img src={withBase("brand-assets/font.png")} alt="Hệ font CSE Job Fair" className="brand-assets-page__guide-image" />
                                <a href={fontDownloadUrl} target="_blank" rel="noreferrer" className="brand-assets-page__download-link">Tải về font</a>
                            </article>

                            <article className="brand-assets-page__block brand-assets-page__block--center">
                                <h2>Bảng màu</h2>

                                <div className="brand-assets-page__palette-row">
                                    <h3>Màu chính</h3>
                                    <div className="brand-assets-page__swatches brand-assets-page__swatches--primary">
                                        {primaryColors.map((color) => (
                                            <article key={color.hex} className="brand-assets-page__swatch-card">
                                                <div className="brand-assets-page__swatch" style={{ backgroundColor: color.hex }} aria-label={`Màu ${color.hex}`} />
                                                <p>{color.rgb}</p>
                                                <p>HEX {color.hex}</p>
                                                <p>{color.cmyk}</p>
                                            </article>
                                        ))}
                                    </div>
                                </div>

                                <div className="brand-assets-page__palette-row">
                                    <h3>Màu phụ</h3>
                                    <div className="brand-assets-page__swatches">
                                        {secondaryColors.map((color) => (
                                            <article key={color.hex} className="brand-assets-page__swatch-card">
                                                <div className="brand-assets-page__swatch" style={{ backgroundColor: color.hex }} aria-label={`Màu ${color.hex}`} />
                                                <p>{color.rgb}</p>
                                                <p>HEX {color.hex}</p>
                                                <p>{color.cmyk}</p>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </section>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BrandAssetsPage;
