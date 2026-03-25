import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import brand01 from "../../assets/hero/hero-01.jpg";
import brand02 from "../../assets/hero/hero-02.jpg";
import brand03 from "../../assets/hero/hero-03.jpg";
import brand04 from "../../assets/hero/hero-04.jpg";
import brand05 from "../../assets/hero/hero-05.jpg";
import brand06 from "../../assets/hero/hero-06.jpg";
import "./BrandAssetsPage.css";

type BrandAsset = {
    src: string;
    fileName: string;
    alt: string;
};

const brandAssets: BrandAsset[] = [
    { src: brand01, fileName: "cse-brand-01.jpg", alt: "Bộ nhận diện CSE Job Fair 01" },
    { src: brand02, fileName: "cse-brand-02.jpg", alt: "Bộ nhận diện CSE Job Fair 02" },
    { src: brand03, fileName: "cse-brand-03.jpg", alt: "Bộ nhận diện CSE Job Fair 03" },
    { src: brand04, fileName: "cse-brand-04.jpg", alt: "Bộ nhận diện CSE Job Fair 04" },
    { src: brand05, fileName: "cse-brand-05.jpg", alt: "Bộ nhận diện CSE Job Fair 05" },
    { src: brand06, fileName: "cse-brand-06.jpg", alt: "Bộ nhận diện CSE Job Fair 06" },
];

const BrandAssetsPage = () => {
    return (
        <div className="brand-assets-page">
            <Navbar />
            <main className="brand-assets-page__main">
                <section className="brand-assets-page__section">
                    <div className="brand-assets-page__container">
                        <section className="brand-assets-page__hero">
                            <h1>Bộ nhận diện thương hiệu</h1>
                            <p>Tải trực tiếp các hình ảnh được sử dụng trong bộ nhận diện CSE JOB FAIR 2026.</p>
                        </section>

                        <section className="brand-assets-page__grid" aria-label="Danh sách ảnh bộ nhận diện">
                            {brandAssets.map((asset, index) => (
                                <article key={asset.fileName} className="brand-assets-page__item">
                                    <img src={asset.src} alt={asset.alt} className="brand-assets-page__image" />
                                    <div className="brand-assets-page__actions">
                                        <span className="brand-assets-page__name">Ảnh {index + 1}</span>
                                        <a href={asset.src} download={asset.fileName} className="brand-assets-page__download-link">
                                            Tải ảnh
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </section>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BrandAssetsPage;
