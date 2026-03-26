import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

type NavItem = {
    label: string;
    href: string;
};

const homeItems: NavItem[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Tài trợ", href: "/#sponsors" },
    { label: "Đồng hành", href: "/#partners" },
    { label: "Hành trình", href: "/#milestones" },
    { label: "Seminars", href: "/seminars" },
    { label: "Bộ nhận diện", href: "/brand-assets" },
    { label: "Bản đồ", href: "/#venue-map" },
    { label: "Liên hệ", href: "/#contact" },
];

const registerItem: NavItem = { label: "Đăng ký", href: "/register" };

const Navbar = () => {
    const logoSrc = `${import.meta.env.BASE_URL}logo.png`;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const visibleItems = homeItems;

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="shared-navbar">
            <div className="shared-navbar__inner">
                <Link to="/" className="shared-navbar__brand" onClick={closeMenu}>
                    <img src={logoSrc} alt="CSE Job Fair" className="shared-navbar__logo" />
                    <span className="shared-navbar__title">CSE JOB FAIR 2026</span>
                </Link>

                <nav className="shared-navbar__desktop" aria-label="Điều hướng chính">
                    {visibleItems.map((item) => (
                        <Link key={item.label} to={item.href} className="shared-navbar__link" onClick={closeMenu}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <Link to={registerItem.href} className="shared-navbar__register" onClick={closeMenu}>
                    {registerItem.label}
                </Link>

                <button
                    type="button"
                    className="shared-navbar__menu-toggle"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-expanded={isMenuOpen}
                    aria-label="Mở menu"
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {isMenuOpen && (
                <nav className="shared-navbar__mobile" aria-label="Điều hướng mobile">
                    {visibleItems.map((item) => (
                        <Link key={item.label} to={item.href} className="shared-navbar__mobile-link" onClick={closeMenu}>
                            {item.label}
                        </Link>
                    ))}
                    <Link to={registerItem.href} className="shared-navbar__mobile-register" onClick={closeMenu}>
                        {registerItem.label}
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
