import Navbar from "../../components/shared/Navbar";
import { useState } from "react";
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
        description: "Đăng ký tham gia CSE Job Fair 2026 (BK)",
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
        title: "Đăng ký CV Clinic",
        description: "Đăng ký chương trình CV Clinic 2026",
        formUrl: "https://forms.gle/pCxy3QuDaxD9Wzme8",
        backgroundImage: heroLeft,
    },
];

const RegisterPage = () => {
    const [activeOption, setActiveOption] = useState<RegisterOption["key"] | null>(null);

    const selectedOption = registerOptions.find((item) => item.key === activeOption) ?? null;
    const activeFormUrl = `${(selectedOption ?? registerOptions[0]).formUrl}?embedded=true`;

    const showSelection = selectedOption === null;

    return (
        <div className="register-page">
            <Navbar />
            <main className="register-page__main">
                {showSelection ? (
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
                                        <button
                                            type="button"
                                            className="register-page__option-btn"
                                            onClick={() => setActiveOption(option.key)}
                                        >
                                            Mở biểu mẫu
                                        </button>
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
                                <button
                                    type="button"
                                    className="register-page__option-btn"
                                    onClick={() => setActiveOption("cv")}
                                >
                                    Mở biểu mẫu
                                </button>
                            </div>
                        </article>
                    </section>
                ) : (
                    <section className="register-page__embed-view" aria-label="Biểu mẫu đăng ký">
                        <iframe
                            src={activeFormUrl}
                            title="Biểu mẫu đăng ký"
                            className="register-page__embed-frame"
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                        <button
                            type="button"
                            className="register-page__back-button"
                            onClick={() => setActiveOption(null)}
                        >
                            QUAY LẠI
                        </button>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default RegisterPage;
