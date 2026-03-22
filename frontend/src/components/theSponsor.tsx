import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const theSponsor = () => {
  return (
    <section className="relative flex items-start justify-center overflow-hidden pt-0 pb-8 sm:pb-10">
      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 sm:mb-12 rounded-2xl bg-slate-100 px-6 py-0 sm:px-10 md:px-12 md:py-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-left">
              <h2 className="text-indigo-900 font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
                Chào mừng bạn đến với CSE JOB FAIR 2026
              </h2>
              <p className="text-indigo-900/90 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
                Kết nối với các công ty hàng đầu và khám phá cơ hội nghề nghiệp tại sự kiện việc làm lớn nhất khoa Khoa học và Kỹ thuật Máy tính năm 2026.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="/CSExJF.png"
                className="h-24 sm:h-32 md:h-44 lg:h-52 w-auto max-w-full object-contain"
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.div>

        {/* Sponsor tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-8 sm:space-y-10"
        >
          <div>
            <p className="text-gold/80 text-lg py-5 sm:text-xl md:text-2xl uppercase tracking-[0.14em] sm:tracking-[0.1em] mb-3 font-medium text-center">Đối tác chiến lược</p>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-8 md:gap-12 items-center">
              <img src="/VNG.png" alt="" className="h-14 sm:h-16 md:h-20 w-auto max-w-[40vw] sm:max-w-none object-contain" aria-hidden="true" />
              <img src="/NVIDIA2.png" alt="" className="h-16 sm:h-20 md:h-24 w-auto max-w-[50vw] sm:max-w-none object-contain" aria-hidden="true" /> 
              <img src="/KMS.png" alt="" className="h-14 sm:h-16 md:h-20 w-auto max-w-[45vw] sm:max-w-none object-contain" aria-hidden="true" />
            </div>                                            
          </div>
          <div>
            <p className="text-gold/80 text-lg py-5 sm:text-xl md:text-2xl uppercase tracking-[0.14em] sm:tracking-[0.1em] mb-3 font-medium text-center pt-3 sm:pt-5">Đồng hành và phát triển</p>
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-10 items-center justify-items-center">
                <img src="/FS.png" alt="" className="h-12 sm:h-14 md:h-16 w-auto max-w-[40vw] sm:max-w-none object-contain" aria-hidden="true" />
                <img src="/SACOM.png" alt="" className="h-10 sm:h-12 md:h-14 w-auto max-w-[35vw] sm:max-w-none object-contain" aria-hidden="true" />
                <img src="/Veri.png" alt="" className="h-10 sm:h-12 md:h-14 w-auto max-w-[35vw] sm:max-w-none object-contain" aria-hidden="true" />
                <img src="/ISB.png" alt="" className="h-10 sm:h-12 md:h-14 w-auto max-w-[35vw] sm:max-w-none object-contain" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-10 items-center justify-items-center">
                <img src="/Nexon.png" alt="" className="h-10 sm:h-12 md:h-14 w-auto max-w-[35vw] sm:max-w-none object-contain" aria-hidden="true" />
                <img src="/FJ.png" alt="" className="h-10 sm:h-12 md:h-14 w-auto max-w-[35vw] sm:max-w-none object-contain" aria-hidden="true" />
                <img src="/GL.png" alt="" className="h-10 sm:h-12 md:h-14 w-auto max-w-[35vw] sm:max-w-none object-contain" aria-hidden="true" />
                <img src="/BV.png" alt="" className="h-18 sm:h-22 md:h-36 w-auto max-w-[55vw] sm:max-w-none object-contain" aria-hidden="true" />
              </div>
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