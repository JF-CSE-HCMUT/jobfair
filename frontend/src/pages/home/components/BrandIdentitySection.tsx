import brand01 from "../../../assets/hero/hero-01.jpg";
import brand02 from "../../../assets/hero/hero-02.jpg";
import brand03 from "../../../assets/hero/hero-03.jpg";
import brand04 from "../../../assets/hero/hero-04.jpg";
import brand05 from "../../../assets/hero/hero-05.jpg";
import brand06 from "../../../assets/hero/hero-06.jpg";
import "./BrandIdentitySection.css";

const images = [brand01, brand02, brand03, brand04, brand05, brand06];

const BrandIdentitySection = () => {
    return (
        <section id="brand-identity" className="home-brand">
            <div className="home-brand__container">
                <h2 className="home-brand__title">Bộ nhận diện thương hiệu</h2>
                <p className="home-brand__intro">
                    Hình ảnh sự kiện được xây dựng đồng bộ để truyền tải tinh thần chuyên nghiệp và kết nối của CSE JOB FAIR 2026.
                </p>

                <div className="home-brand__grid" role="list">
                    {images.map((image, index) => (
                        <article key={image} className="home-brand__item" role="listitem">
                            <img src={image} alt={`Hình ảnh bộ nhận diện ${index + 1}`} />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandIdentitySection;
