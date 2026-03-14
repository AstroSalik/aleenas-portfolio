import { motion } from 'framer-motion';
import { useScrollAnimation, fadeUpVariant, staggerContainer } from '../hooks/useScrollAnimation';
import { useAdmin } from '../hooks/useAdmin';

export default function About() {
  const { content } = useAdmin();
  const { ref, controls } = useScrollAnimation(0.2);

  return (
    <section id="about" className="w-full min-h-screen py-24 bg-saffron-bg flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="flex flex-col md:flex-row gap-16 items-center"
        >
          {/* Large portrait frame - left */}
          <motion.div variants={fadeUpVariant} className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-72 h-[400px] md:w-96 md:h-[550px] overflow-hidden rounded-t-full border-2 border-saffron-primary/30 p-2 shadow-[0_0_40px_rgba(232,168,48,0.1)]">
              <div className="w-full h-full rounded-t-full relative overflow-hidden bg-saffron-surface">
                <div 
                  className="w-full h-full bg-cover bg-center mix-blend-luminosity opacity-80"
                  style={{ backgroundImage: "url('/aleena-author.jpeg')" }}
                />
                <div className="absolute inset-0 bg-saffron-primary/10 mix-blend-overlay" />
              </div>
            </div>
          </motion.div>

          {/* Bio text - right */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center">
            <motion.h2 
              variants={fadeUpVariant}
              className="font-display text-4xl md:text-6xl text-saffron-text mb-8 relative inline-block"
            >
              The Writer
              <span className="block w-12 h-0.5 bg-saffron-primary mt-4 mx-auto" />
            </motion.h2>

            <motion.div 
              variants={fadeUpVariant}
              className="font-body text-lg md:text-xl text-saffron-text/90 leading-relaxed space-y-6"
            >
              {content.about.bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div 
              variants={fadeUpVariant}
              className="mt-12 pt-8 border-t border-saffron-primary/20 flex flex-wrap justify-center gap-8 w-full"
            >
              {content.about.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-display text-3xl text-saffron-primary mb-1">
                    {stat.value}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-saffron-text/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
