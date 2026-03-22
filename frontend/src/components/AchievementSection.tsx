import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const achievements = [
  {
    title: "20+ Companies",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin viverra neque.",
  },
  {
    title: "500+ Students",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pharetra.",
  },
  {
    title: "100+ Offers",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum.",
  },
  {
    title: "10 Workshops",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit.",
  },
];

const AchievementsSection = () => {
  const [page, setPage] = useState(0);

  return (
    <section id="achievements" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl md:text-4xl text-foreground                                                                  "
          >
           Đợi content NNUN
          </motion.h2>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/80 transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setPage(Math.min(0, page + 1))}
              disabled={page >= 0}
              className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/80 transition-colors disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit vulputate libero, sed lacinia nisl elementum vitae. Cras finibus, sapien a vestibulum egestas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Fusce efficitur vel sem vitae semper. Maecenas feugiat tempus lacinia.
            </p>
            <button className="flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
              <ArrowRight size={16} />
              <span>View detail</span>
            </button>
          </motion.div>

          {/* Achievement cards */}
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
