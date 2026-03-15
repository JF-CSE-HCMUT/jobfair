import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const sponsors = [
  {
    name: "VNG Corporation",
    tier: "Diamond",
    color: "bg-green-sponsor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget fermentum ultricies.",
  },
  {
    name: "KMS Technology",
    tier: "Gold",
    color: "bg-peach-sponsor",
    description:
      "Bright Minds, Bold Solutions. Building world-class technology products and services.",
  },
  {
    name: "ISB Vietnam",
    tier: "Gold",
    color: "bg-blue-sponsor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod vitae sapien.",
  },
  {
    name: "TechCorp",
    tier: "Silver",
    color: "bg-green-sponsor",
    description:
      "Innovation meets excellence. A leading technology company driving digital transformation.",
  },
];

const AboutSponsor = () => {
  const [page, setPage] = useState(0);
  const perPage = 4;
  const totalPages = Math.ceil(sponsors.length / perPage);

  return (
    <section id="sponsors" className="py-20 px-6 bg-background my-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display font-bold text-3xl md:text-4xl text-foreground"
            >
              About Sponsor
            </motion.h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/80 transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/80 transition-colors disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left text column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in viverra neque. Morbi pharetra, mi in volutpat aliquam, sem velit consectetur elit.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Suspendisse condimentum finibus diam ut sollicitudin. Morbi hendrerit interdum nisi, eu gravida est vehicula vel.
            </p>
            <button className="flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
              <ArrowRight size={16} />
              <span>View detail</span>
            </button>
          </motion.div>

          {/* Right sponsor cards */}
          <div className="grid grid-cols-4 gap-4">
            {sponsors.slice(page * perPage, (page + 1) * perPage).map((sponsor, i) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div
                  className={`${sponsor.color} rounded-2xl aspect-square flex items-center justify-center p-6 shadow-card group-hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-1 cursor-pointer`}
                >
                  <span className="font-display font-bold text-xl text-navy text-center">
                    {sponsor.name}
                  </span>
                </div>
                <div className="mt-3 px-1">
                  <p className="text-xs text-muted-foreground line-clamp-2">{sponsor.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSponsor;
