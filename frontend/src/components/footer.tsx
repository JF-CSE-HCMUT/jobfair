import { motion } from "framer-motion";
import { Facebook, Github, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <img src="/logo.png" alt="CSE logo" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <p className="font-display font-bold text-lg">CSE JOB FAIR</p>
                <p className="text-primary-foreground/50 text-xs">2026 Edition</p>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Chả hiểu kiểu gì
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4 text-gold">Quick Access</h3>
            <div className="space-y-2">
              {["Home", "Sponsor", "Achievements", "Map", "3d Visiting"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4 text-gold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <MapPin size={16} />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Mail size={16} />
                <span>dtn-ktmt@hcmut.edu.vn</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Facebook size={16} />
                <span>CSE Multimedia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © 2026 CSE Job Fair. All rights reserved.
          </p>
          <div className="flex gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center cursor-pointer hover:bg-primary-foreground/20 transition-colors"
            >
              <Github size={16} className="text-primary-foreground/60" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center cursor-pointer hover:bg-primary-foreground/20 transition-colors"
            >
              <Mail size={16} className="text-primary-foreground/60" />
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

