import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const theSponsor = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero py-16 sm:py-20">
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gold font-display font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 tracking-wide uppercase"
        >
          Welcome to CSE JOB FAIR 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 sm:mb-8"
        >


          <img src="/CSExJF.png" className="h-28 sm:h-36 md:h-44 lg:h-52 w-auto max-w-full block mx-auto" aria-hidden="true" />
          
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gold text-base sm:text-lg md:text-xl mx-auto mb-10 sm:mb-12 leading-relaxed max-w-3xl"
        >
          Connect with top companies and discover career opportunities at the biggest CSE career event of 2026.
        </motion.p>

        {/* Sponsor tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-8 sm:space-y-10"
        >
          <div>
            <p className="text-gold/80 text-lg sm:text-xl md:text-2xl uppercase tracking-[0.14em] sm:tracking-[0.2em] mb-3 font-medium">Diamond Sponsor</p>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-8 md:gap-12 items-center">
              <img src="/VNG.png" alt="" className="h-14 sm:h-16 md:h-20 w-auto max-w-[40vw] sm:max-w-none object-contain" aria-hidden="true" />
              <img src="/NVIDIA2.png" alt="" className="h-16 sm:h-20 md:h-24 w-auto max-w-[50vw] sm:max-w-none object-contain" aria-hidden="true" /> 
              <img src="/KMS.png" alt="" className="h-14 sm:h-16 md:h-20 w-auto max-w-[45vw] sm:max-w-none object-contain" aria-hidden="true" />
            </div>                                            
          </div>
          <div>
            <p className="text-gold/80 text-lg sm:text-xl md:text-2xl uppercase tracking-[0.14em] sm:tracking-[0.2em] mb-3 font-medium pt-3 sm:pt-5">Gold Sponsor</p>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-8 md:gap-10 items-center">
                <img src="/FPT.png" alt="" className="h-10 sm:h-12 md:h-14 w-auto max-w-[35vw] sm:max-w-none object-contain" aria-hidden="true" />
                <img src="/SACOM.png" alt="" className="h-10 sm:h-12 md:h-14 w-auto max-w-[35vw] sm:max-w-none object-contain" aria-hidden="true" /> 
                <img src="/Veri.png" alt="" className="h-10 sm:h-12 md:h-14 w-auto max-w-[35vw] sm:max-w-none object-contain" aria-hidden="true" />
                <img src="/ISB.png" alt="" className="h-10 sm:h-12 md:h-14 w-auto max-w-[35vw] sm:max-w-none object-contain" aria-hidden="true" />
                <img src="/Nexon.png" alt="" className="h-10 sm:h-12 md:h-14 w-auto max-w-[35vw] sm:max-w-none object-contain" aria-hidden="true" />
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