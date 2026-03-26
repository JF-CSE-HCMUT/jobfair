import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import heroLeft from "../../assets/hero/hero-10.jpg";
import heroRight from "../../assets/hero/hero-03.jpg";
import "./RegisterPage.css";

type RegisterOption = {
    key: "bk" | "other" | "cv";
    title: string;
    description: string;
    formUrl: string;
    backgroundImage: string;
};

const registerOptions: RegisterOption[] = [
    {
        key: "bk",
        title: "Dành cho sinh viên Bách khoa",
        description: "Đăng ký tham gia CSE Job Fair 2026 (Bách khoa)",
        formUrl: "https://forms.gle/k4gBCc76BXHQov6A9",
        backgroundImage: heroLeft,
    },
    {
        key: "other",
        title: "Dành cho sinh viên trường bạn",
        description: "Đăng ký tham gia CSE Job Fair 2026 (trường bạn)",
        formUrl: "https://forms.gle/R62qQTdFwcThbJSF9",
        backgroundImage: heroRight,
    },
    {
        key: "cv",
        title: "CV Clinic 2026",
        description: "Tư vấn CV 1 - 1 từ chuyên gia tuyển dụng, phỏng vấn nhanh với doanh nghiệp hàng đầu",
        formUrl: "https://forms.gle/pCxy3QuDaxD9Wzme8",
        backgroundImage: heroLeft,
    },
];

const RegisterPage = () => {
    return (
        <div className="register-page">
            <Navbar />
            <main className="register-page__main">
                <section className="register-page__options" aria-label="Khu vực đăng ký">
                    <div className="register-page__top-grid">
                        {registerOptions.slice(0, 2).map((option) => (
                            <article
                                key={option.key}
                                className="register-page__option-card"
                                style={{ backgroundImage: `url(${option.backgroundImage})` }}
                            >
                                <span className="register-page__option-overlay" />
                                <div className="register-page__option-content">
                                    <span className="register-page__option-title">{option.title}</span>
                                    <span className="register-page__option-desc">{option.description}</span>
                                    <a
                                        href={option.formUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="register-page__option-btn"
                                    >
                                        ĐĂNG KÝ NGAY
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>

                    <article
                        className="register-page__option-card register-page__option-card--bottom"
                        style={{ backgroundImage: `url(${registerOptions[2].backgroundImage})` }}
                    >
                        <span className="register-page__option-overlay register-page__option-overlay--clinic" />
                        <div className="register-page__option-content">
                            <span className="register-page__option-title">{registerOptions[2].title}</span>
                            <span className="register-page__option-desc">{registerOptions[2].description}</span>
                            <a
                                href={registerOptions[2].formUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="register-page__option-btn"
                            >
                                ĐĂNG KÝ NGAY
                            </a>
                        </div>
                    </article>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default RegisterPage;
