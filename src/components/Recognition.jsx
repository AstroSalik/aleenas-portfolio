import { motion } from 'framer-motion';
import { useScrollAnimation, fadeUpVariant, staggerContainer } from '../hooks/useScrollAnimation';
import { useAdmin } from '../hooks/useAdmin';

export default function Recognition() {
  const { content } = useAdmin();
  const { ref, controls } = useScrollAnimation(0.2);

  const featuredAward = content.awards.find(a => a.featured) || content.awards[0];
  const otherAwards = content.awards.filter(a => a.id !== featuredAward?.id);

  return (
    <section id="recognition" className="w-full py-24 bg-[#110609] border-t border-saffron-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="flex flex-col gap-16"
        >
          {/* Section Header - Centered for all devices */}
          <motion.div variants={fadeUpVariant} className="text-center">
            <h2 className="font-display text-4xl md:text-6xl text-saffron-text mb-4 inline-block">
              Honors &amp; Recognition
              <span className="block w-12 h-0.5 bg-saffron-primary mt-4 mx-auto" />
            </h2>
          </motion.div>

          {/* Featured Award Seal - Centered */}
          {featuredAward && (
            <motion.div variants={fadeUpVariant} className="w-full flex flex-col items-center justify-center">
              <div className="relative w-80 h-80 flex items-center justify-center mb-8">
                {/* Rotating Outer Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-saffron-primary/30 flex items-center justify-center"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full text-saffron-primary/60">
                     <path id="curve" fill="transparent" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                     <text className="font-display tracking-[0.1em] uppercase text-[9px] fill-current">
                       <textPath href="#curve" startOffset="2%" textLength="210" lengthAdjust="spacingAndGlyphs">
                         Aleena Tariq Bhat · Literary Excellence ·
                       </textPath>
                       <textPath href="#curve" startOffset="52%" textLength="210" lengthAdjust="spacingAndGlyphs">
                         Aleena Tariq Bhat · Literary Excellence ·
                       </textPath>
                     </text>
                  </svg>
                </motion.div>
                
                {/* Inner Static Seal */}
                <div className="absolute inset-4 rounded-full border border-saffron-primary/20 flex flex-col items-center justify-center p-8 text-center bg-saffron-surface/10 shadow-[0_0_50px_rgba(232,168,48,0.1)]">
                  <span className="font-mono text-xs text-saffron-primary uppercase tracking-widest mb-2">{featuredAward.year}</span>
                  <h3 className="font-display text-2xl text-saffron-text leading-tight">{featuredAward.title.split('—')[0]}</h3>
                  <span className="font-display italic text-saffron-secondary mt-2">{featuredAward.title.split('—')[1]}</span>
                </div>
              </div>

              <div className="text-center max-w-2xl">
                <p className="font-body text-saffron-text/80 text-xl leading-relaxed">
                  "{featuredAward.description}"
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
