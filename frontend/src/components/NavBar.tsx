import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Github, Search, MapPin } from "lucide-react";

const rightNavBar = [
    { label: "Support", path: "/#support" },
    { label: "Help", path: "/#help" },
];

const leftNavBar = [
    { label: "Home", path: "/" },
    { label: "Sponsor", path: "/#sponsor" },
    { label: "Achievements", path: "/#achievements" },
    { label: "Map", path: "/#day" },
    { label: "3d Visiting", path: "/#sponsors" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-7xl mx-auto px- h-10 flex items-center gap-10 justify-left">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="sm:block h-[30px] w-auto" aria-hidden="true" />
          <span className="font-display font-semibold text-foreground text-sm hidden sm:block">
            CSE JOB FAIR 2026
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 ">
            
          {leftNavBar.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`px-3 py-1.5 rounded-[10pt] text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-1 ml-auto">
            
          {rightNavBar.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >                                                   
              {item.label}
            </Link>
          ))}
          <Search size={16} className="md:flex text-blue-500" />
        </div>
        

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-card border-b border-border"
        >
          <div className="px-6 py-4 flex flex-col gap-2">
            {rightNavBar.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
