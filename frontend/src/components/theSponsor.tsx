import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const theSponsor = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gold font-display font-medium text-[30pt] mb-4 tracking-wider uppercase"
        >
          Welcome to CSE JOB FAIR 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >


          <img src="/CSExJF.png" className="h-[200pt] w-auto block mx-auto" aria-hidden="true" />
          
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gold text-[22pt]  mx-auto mb-12 leading-relaxed"
        >
          Connect with top companies and discover career opportunities at the biggest CSE career event of 2026.
        </motion.p>

        {/* Sponsor tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-6"
        >
          <div>
            <p className="text-gold/80 text-[22pt] uppercase tracking-[0.2em] mb-3 font-medium">Diamond Sponsor</p>
            <div className="flex justify-center gap-12 items-center">
              <img src="/VNG.png" alt="" className="h-[80pt] w-auto object-contain" aria-hidden="true" />
              <img src="/NVIDIA2.png" alt="" className="h-[110pt] w-auto object-contain" aria-hidden="true" /> 
              <img src="/KMS.png" alt="" className="h-[90pt] w-auto object-contain" aria-hidden="true" />
            </div>                                            
          </div>
          <div>
            <p className="text-gold/80 text-[22pt] uppercase tracking-[0.2em] mb-3 font-medium py-5">Gold Sponsor</p>
            <div className="flex justify-center gap-12 items-center  ">
                <img src="/FPT.png" alt="" className="h-[60pt] w-auto object-contain" aria-hidden="true" />
                <img src="/SACOM.png" alt="" className="h-[60pt] w-auto object-contain" aria-hidden="true" /> 
                <img src="/Veri.png" alt="" className="h-[60pt] w-auto object-contain" aria-hidden="true" />
                <img src="/ISB.png" alt="" className="h-[60pt] w-auto object-contain" aria-hidden="true" />
                <img src="/Nexon.png" alt="" className="h-[60pt] w-auto object-contain" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-primary-foreground/40 text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="text-primary-foreground/40" size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default theSponsor;